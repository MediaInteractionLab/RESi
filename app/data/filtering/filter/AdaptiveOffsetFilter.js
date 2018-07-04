"use strict";

const Filter = require('./Filter');

class AdaptiveOffsetFilter extends Filter {

    constructor(id, frames = 1) {
        super(id);
        this.initialized = false;
        this.dataHistory = null;
        this.averagedValues = null;
        this.frames = frames;
    }

    static getName() {
        return 'Adaptive Offset Filter';
    }

    initialize(data) {
        if(!this.initialized) {
            // prepare data history array to store n frames, 
            // as well as an array for the finally averaged values
            this.dataHistory = [];
            this.averagedValues = [];
            data.forEach((value, index) => {
                this.averagedValues[index] = 0;
                this.dataHistory[index] = [];
            });
        }
        this.initialized = true;
    }

    updateAverages(data) {
        // store current values into the data history
        data.forEach((value, index) => {
            if (this.dataHistory[index].length >= this.frames)
                this.dataHistory[index].pop();
            this.dataHistory[index].splice(0, 0, +value); // insert at 0, ensure that it's a number
        });

        // update averaged values given the current values in data history
        data.forEach((value, index) => {
            let sum = 0;
            this.dataHistory[index].forEach((value, index) => {
                sum = +sum + value; // + ensures that sum is a number
            });
            this.averagedValues[index] = Math.round(sum / this.dataHistory[index].length);
        });
    }
 
    filter(data) {
        const filteredData = [];

        // initialize arrays
        if(!this.initialized) this.initialize(data);

        // offset current values
        data.forEach((value, index) => {
            filteredData.push(value - this.averagedValues[index]);
        });

        // update averaged values given last n frames
        this.updateAverages(data);

        return filteredData;
    }

    reset() {
        this.initialized = false;
        this.averagedValues = null;
        this.initializationStep = 0;
    }
}

module.exports = AdaptiveOffsetFilter;