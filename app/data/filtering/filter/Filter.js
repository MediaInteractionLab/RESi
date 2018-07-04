"use strict";

class Filter {
    
    constructor(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    /**
     * Implementation required
     */
    static getName() {
        throw new Error('getName() method not implemented');
    }
 
    /**
     * Implementation required
     */
    filter(data, rows, cols) {
        throw new Error('filter() method not implemented');
    }

    reset() {
    }
}

module.exports = Filter;