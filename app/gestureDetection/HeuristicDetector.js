"use strict";

const touchRecognition = require('./heuristics/touchRecognition');

class HeuristicDetector {

    constructor(filterResetCallback) {
        this.heuristics = [ touchRecognition ];
        this.filterResetCallback = filterResetCallback;
        this.analyze = this.analyze.bind(this);
    }

    reset() {
        this.heuristics.forEach((heuristic) => {
            heuristic.reset()
        })
    }

    analyze(data, rows, cols) {
        var result = undefined
        this.heuristics.forEach((heuristic) => {
            var funcResult = heuristic.analyze(data, rows, cols, this.filterResetCallback)
            if(funcResult !== undefined) {
                result = {
                    name: funcResult.name,
                    gesture: funcResult,
                    type: 'heuristic',
                };
            }
        });
        if(result !== undefined) return result
    }
}

module.exports = HeuristicDetector;
