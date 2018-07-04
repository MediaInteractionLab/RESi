"use strict";

const Filter = require('./filter/Filter');
const FilterFactory = require('./FilterFactory');

class FilterComposite extends Filter {

    constructor() {
        super('Filter Manager');
        this.filterChain = [];
        this.filterFactory = new FilterFactory();
        this.reset = this.reset.bind(this);
        this.appendFilter = this.appendFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.moveFilter = this.moveFilter.bind(this);
        this.filter = this.filter.bind(this);
    }

    appendFilter(filter, options = {}) {
        if(typeof filter === 'string') {
            const filterInstance = this.filterFactory.getFilter(filter, options);
            this.filterChain.push(filterInstance);
        } else if(filter instanceof Filter) {
            this.filterChain.push(filter);
        }
    }

    removeFilter(filterId) {
        this.filterChain = this.filterChain.filter((filter) => {
            return (filter.getId() != filterId);
        });
    }

    moveFilter(startIndex, endIndex) {
        var element = this.filterChain[startIndex];
        this.filterChain.splice(startIndex, 1);
        this.filterChain.splice(endIndex, 0, element);
    }

    filter(data, rows, cols) {
        let resultData = [...data];
        this.filterChain.forEach((filter) => {
            resultData = filter.filter(resultData, rows, cols);
        });
        return resultData;
    }

    reset() {
        this.filterChain.forEach((filter) => {
            filter.reset();
        });
    }
}

module.exports = FilterComposite;