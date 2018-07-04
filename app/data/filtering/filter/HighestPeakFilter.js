"use strict";

const Filter = require('./Filter');

const defaultValue = 0;

class HighestPeakFilter extends Filter {

    constructor(id) {
        super(id);
    }

    static getName() {
        return 'Highest Peak Filter';
    }
 
    filter(data) {
        const filteredData = [];

        // search for highest value
        var highestPeak = 0
        data.forEach((value) => {
            if(value > highestPeak) highestPeak = value
        });

        // eliminate all sensor values below highest peak
        data.forEach((value) => {
            let filteredValue = (value === highestPeak) ? value : defaultValue;
            filteredData.push(filteredValue);
        });

        return filteredData;
    }
}

module.exports = HighestPeakFilter;