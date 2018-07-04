"use strict";

const AdaptiveOffsetFilter = require('./AdaptiveOffsetFilter');

class SlidingWindowFilter extends AdaptiveOffsetFilter {

    constructor(id, frames = 5) {
        super(id, frames);
    }

    static getName() {
        return 'Sliding Window Filter';
    }
 
    filter(data) {
        const filteredData = [];

        // initialize arrays
        if(!this.initialized) this.initialize(data);

        // update averaged values given last n frames
        this.updateAverages(data);

        // set current value to averaged value from last n frames
        data.forEach((value, index) => {
            filteredData.push(this.averagedValues[index]);
        });


        return filteredData;
    }
}

module.exports = SlidingWindowFilter;