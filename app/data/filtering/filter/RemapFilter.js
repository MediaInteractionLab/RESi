"use strict";

const Filter = require('./Filter');

class RemapFilter extends Filter {

    constructor(id, origMin, origMax, filteredMin, filteredMax) {
        super(id);
        this.origMin = new Number(origMin);
        this.origMax = new Number(origMax);
        this.filteredMin = new Number(filteredMin);
        this.filteredMax = new Number(filteredMax);
    }

    static getName() {
        return 'Remap Filter';
    }

    filter(data) {
        const filteredData = [];

        const origDiff = this.origMax - this.origMin;
        const filteredDiff = this.filteredMax - this.filteredMin;

        data.forEach((value) => {
            if (value < this.origMin) value = this.origMin;
            else if (value > this.origMax) value = this.origMax;
            if(value >= this.origMin && value <= this.origMax) {
                const normalized = ((value - this.origMin) / origDiff).toFixed(3);
                const final = Math.round((normalized * filteredDiff).toFixed(3)) + this.filteredMin;
                filteredData.push(final);
            }
        });

        return filteredData;
    }
}

module.exports = RemapFilter;