"use strict";

const axios = require('axios');
const TriggerVariables = require('../../server/models/triggerVariables');

class ActionDispatcher {
    
    constructor() {
        this.triggers = [];
        this.triggerVariables = {};

        this.addTrigger = this.addTrigger.bind(this);
        this.removeTrigger = this.removeTrigger.bind(this);
        this.trigger = this.trigger.bind(this);
    }

    setTriggerVariables(triggerVariables) {
        this.triggerVariables = JSON.parse(JSON.stringify(triggerVariables));
    }

    updateTriggerVariables(triggerVariables) {
        this.triggerVariables = triggerVariables;
        TriggerVariables.update(this.triggerVariables._id, triggerVariables, () => {});
    }

    addTrigger(trigger) {
        this.triggers.push(trigger);
    }

    updateTrigger(trigger) {
        const triggerIndex = this.triggers.findIndex((t) => (String(t._id) === String(trigger._id)));
        
        if(triggerIndex >= 0) {
            this.triggers[triggerIndex] = trigger;
        }
    }
    
    removeTrigger(triggerId) {
        this.triggers = this.triggers.filter((trigger) => (String(trigger._id) !== String(triggerId)));
    }

    // update param with database array placeholder e.g. %colors[%colorletiable%++]%
    updatetriggerVariableArrayPlaceholder(data, key, value) {
        /* eslint-disable */
        let regexp = /\%(.*)\[(.*)(\+{2}|-{2})\]\%/;
        /* eslint-enable */
        let found = value.match(regexp);
        if(found && found.length === 4) {
            let values = this.triggerVariables.variables[found[1]].replace('[', '').replace(']', '').split(',');
            let index = this.triggerVariables.variables[found[2]];
            const increase = found[3];
            //console.log('array:', found[1], 'index:', found[2], 'values:', values)
            
            // update index
            if(increase === '++') index = (index + 1) % values.length;
            else {
                index = index - 1;
                if (index < 0) index = values.length - 1;
            }
            this.triggerVariables.variables[found[2]] = index;
            this.updateTriggerVariables(this.triggerVariables);

            // update param
            const param = values[index];
            if(param) {
                data[key] = param;
            }
            return true;
        }
        return false;
    }

    // update param with database letiable placeholder %...%
    updatetriggerVariablePlaceholder(data, key, value) {
        /* eslint-disable */
        const regexp = /\%(.*)\%/;
        /* eslint-enable */
        const found = value.match(regexp);
        if(found) {
            const placeholder = found[1];
            const param = this.triggerVariables[placeholder];
            if(param) {
                data[key] = param;
            }
            return true;
        }
        return false;
    }

    // update param with field placeholder $...$
    updateTriggerFieldPlaceholder(data, key, value, obj) {
        /* eslint-disable */
        const regexp = /\$(.*)\$/;
        /* eslint-enable */
        const found = value.match(regexp);
        if(found) {
            const placeholder = found[1];
            const param = obj[placeholder];
            if(param) {
                data[key] = param;
            }
            return true;
        }
        return false;
    }

    trigger(gesture) {
        const triggers = this.triggers.filter((trigger) => {
            let found = false;
            trigger.labels.forEach((label) => {
                if(gesture.name.includes(label)) {
                    found = true;
                    return;
                }
            })
            return found;
        });

        if(triggers) {
            triggers.forEach(trigger => {

                const triggerToSend = JSON.parse(JSON.stringify(trigger));
                const { request: { data } } = triggerToSend;

                if(data) {
                    // update placeholders
                    Object.entries(data).forEach((entry) => {
                        const key = entry[0];
                        const value = entry[1];
                        if(typeof value === 'string') {
                            let result = this.updatetriggerVariableArrayPlaceholder(data, key, value); 
                            if(!result) result = this.updatetriggerVariablePlaceholder(data, key, value);
                            if(!result) this.updateTriggerFieldPlaceholder(data, key, value, gesture.gesture);
                        }
                    });
                }
                axios(triggerToSend.request);
            });
        }
    }    
}

module.exports = ActionDispatcher;
