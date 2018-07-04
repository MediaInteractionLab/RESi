"use strict";

const SerialInputReader = require('./data/SerialInputReader');
const DataAnalyzer = require('./data/DataAnalyzer');
const DataCapturer = require('./data/DataCapturer');
const HeuristicDetector = require('./gestureDetection/HeuristicDetector');
const SvmModel = require('./gestureDetection/SvmModel');
const FilterComposite = require('./data/filtering/FilterComposite');
const ActionDispatcher = require('./actionDispatcher');


// --------------------------
// ----- INITIALIZATION -----
// --------------------------

const filterComposite = new FilterComposite();
const heuristicDetector = new HeuristicDetector(filterComposite.reset);
const actionDispatcher = new ActionDispatcher();
const dataAnalyzer = new DataAnalyzer();
const inputReader = new SerialInputReader();

module.exports = {
    heuristicDetector,
    filterComposite,
    actionDispatcher,
    inputReader,
};


// ------------------------------------------------------------------
// ----- Initialize Filter Composite with Filters from Database -----
// ------------------------------------------------------------------

require('../server/util/DataBaseConnection');
const FilterModel = require('../server/models/filter');
const FilterTypeModel = require('../server/models/filterType');

FilterTypeModel.readAll((err, typeData) => {
    FilterModel.readAll((err, filterData) => {
        if(filterData && typeData) {
            filterData.forEach((filter) => {
                const type = typeData.find(t => t._id.toString() === filter.typeId.toString()).type;
                const options = filter.options || {};
                options.id = filter._id;
                filterComposite.appendFilter(type, options);
            });
        }
    });
});


// ---------------------------------------------------------------------------------
// ----- Initialize ActionDispatcher with triggers and Variables from Database -----
// ---------------------------------------------------------------------------------

const ActionTriggerModel = require('../server/models/actionTrigger');
const TriggerVariableModel = require('../server/models/triggerVariables');

ActionTriggerModel.readAll((err, triggerData) => {
    if(triggerData) {
        triggerData.forEach((trigger) => {
            actionDispatcher.addTrigger(trigger);
        });
    }
    /* eslint-disable */
    console.log('Triggers initialized');
    /* eslint-enable */
});

TriggerVariableModel.readAll((err, variableData) => {
    if(variableData && variableData.length > 0) {
        actionDispatcher.setTriggerVariables(variableData[0]);
    }
    /* eslint-disable */
    console.log('TriggerVariables initialized');
    /* eslint-enable */
});



// ------------------------------------
// ----- broadcast to data socket -----
// ------------------------------------

const dataSocket = require('../server/').dataSocket;

inputReader.on('incoming-data', (data) => {
    dataAnalyzer.analyze(data);
});

let lastSvmGesture = undefined;
let resetCounter = 0;
const blobTracking = false;

dataAnalyzer.on('data-array', (data, rows, cols) => {
    const filteredData = filterComposite.filter(data, rows, cols);
    let features;

    if (blobTracking) {
        features = DataCapturer.getFeatures(filteredData, rows, cols);
        DataCapturer.data(features);
    } else {
        DataCapturer.data(data);
    }

    dataSocket.broadcast({
        type: 'raw',
        timestamp: new Date(),
        data: { rows: rows, cols: cols, matrix: filteredData },
        rows,
        cols,
    });

    // perform svm classification
    let svmResult;
    if (blobTracking) {
        svmResult = SvmModel.analyze(features);
    } else {
        svmResult = SvmModel.analyze(data);
    }
    if(svmResult !== undefined && !DataCapturer.isCapturing && (!blobTracking || (features[8] > 12 && features[2] > 30 && resetCounter <= 0))) {
        if(lastSvmGesture !== undefined && lastSvmGesture.label && svmResult.label && svmResult.label !== 'no_gesture') {
            svmResult.name = svmResult.name + ' (' + svmResult.probability.toFixed(2) + ')';
            dataSocket.broadcast(svmResult);
            actionDispatcher.trigger(svmResult);
        }
        lastSvmGesture = svmResult;
    }
    
    // perform heuristics
    const heuristicResult = heuristicDetector.analyze(filteredData, rows, cols);
    if(heuristicResult !== undefined) {
        dataSocket.broadcast(heuristicResult);
        actionDispatcher.trigger(heuristicResult);
    }
});
