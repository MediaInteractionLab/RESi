"use strict";

const Filter = require('./Filter');

class ClampingFilter extends Filter {

    constructor(id, min, max) {
        super(id);
        this.min = min;
        this.max = max;
    }

    static getName() {
        return 'Clamping Filter';
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
            filteredData.push(Math.min(Math.max(value, this.min), this.max));
        });

        return filteredData;
    }
}

module.exports = ClampingFilter;