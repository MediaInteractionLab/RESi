"use strict";

const Filter = require('./Filter');

const defaultValue = 0;

class BandPassFilter extends Filter {

    constructor(id, min, max) {
        super(id);
        this.min = min;
        this.max = max;
    }

    static getName() {
        return 'Band-Pass Filter';
    }

    setLowerBound(min) {
        this.min = min;
    }

    setUpperBound(max) {
        this.max = max;
    }
 
    filter(data) {
        const filteredData = [];

        data.forEach((value) => {
            let filteredValue = (value >= this.min && value <= this.max) ? value : defaultValue;
            filteredData.push(filteredValue);
        });

        return filteredData;
    }
}

module.exports = BandPassFilter;