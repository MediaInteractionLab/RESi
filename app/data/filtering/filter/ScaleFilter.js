"use strict";

const Filter = require('./Filter');

class ScaleFilter extends Filter {

    constructor(id, scale) {
        super(id);
        this.scale = scale;
    }

    setScale(scale) {
        this.scale = scale;
    }

    static getName() {
        return 'Scale Filter';
    }
 
    filter(data) {
        const filteredData = [];

        data.forEach((value) => {
            filteredData.push(value * this.scale);
        });

        return filteredData;
    }
}

module.exports = ScaleFilter;