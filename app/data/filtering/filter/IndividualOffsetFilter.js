"use strict";

const Filter = require('./Filter');

class IndividualOffsetFilter extends Filter {

    constructor(id, initializationSteps = 1) {
        super(id);
        this.initialized = false;
        this.offsetValues = null;
        this.initializationStep = 0;
        this.initializationSteps = initializationSteps;
    }

    static getName() {
        return 'Individual Offset Filter';
    }

    initialize(data) {
        this.initializationStep += 1;

        if(this.offsetValues === null) {
            this.offsetValues = [...data];
        } else {
            data.forEach((value, index) => {
                this.offsetValues[index] = Math.max(value, this.offsetValues[index]);
            });
        }
        
        if(this.initializationStep == this.initializationSteps) {
            this.initialized = true;
        }
    }
 
    filter(data) {
        if(!this.initialized) {
            this.initialize(data);
        }

        const filteredData = [];

        data.forEach((value, index) => {
            filteredData.push(value - this.offsetValues[index]);
        });

        return filteredData;
    }

    reset() {
        this.initialized = false;
        this.offsetValues = null;
        this.initializationStep = 0;
    }
}

module.exports = IndividualOffsetFilter;