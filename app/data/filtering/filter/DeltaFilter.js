"use strict";

const Filter = require('./Filter');

class DeltaFilter extends Filter {

    constructor(id) {
        super(id);
        this.previousData = []
    }

    static getName() {
        return 'Delta Filter';
    }
 
    filter(data) {
        const filteredData = [];

        if(this.previousData.length > 0) {
            for (var i = 0; i < data.length; i++) { 
                filteredData.push(this.previousData[i] - data[i]);
            }
        }

        this.previousData = data.slice(); // deep copy array
        return filteredData;
    }
}

module.exports = DeltaFilter;