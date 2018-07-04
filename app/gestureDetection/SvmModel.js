"use strict";

const fs = require('fs');
const path = require('path');
const SVM = require('libsvm-js/asm');
const DataTransformHelper = require('../util/DataTransformHelper');
const settings = require('../parameters');
const CSVDataHelper = require('../util/CSVDataHelper');
const Gesture = require('../../server/models/gesture');

class SvmModel {
    
    constructor() {
        this.trained = false;

        const ModelFilePath = path.join(settings.svmModelFile.path, settings.svmModelFile.name);
        if(fs.existsSync(ModelFilePath)) {
            this.loadModel();
        } else {
            this.createSvmModel();
        }

        this.updateGestures();

        this.createSvmModel = this.createSvmModel.bind(this);
        this.updateGestures = this.updateGestures.bind(this);
        this.saveModel = this.saveModel.bind(this);
        this.loadModel = this.loadModel.bind(this);
        this.train = this.train.bind(this);
        this.analyze = this.analyze.bind(this);
    }

    createSvmModel() {
        this.trained = false;
        this.svm = new SVM({
            kernel: SVM.KERNEL_TYPES.LINEAR, // type of kernel to use
            type: SVM.SVM_TYPES.C_SVC,       // type of SVM to run
            gamma: 1,                        // RBF kernel gamma parameter
            cost: 1,                         // C_SVC cost parameter
            probabilityEstimates: true,
        });
    }

    updateGestures() {
        this.initialized = false;
        Gesture.readAll((err, data) => {
            if (err) console.log('Error', err);
            this.gestures = data;
            this.initialized = true;
        });
    }

    saveModel() {
        const ModelFilePath = path.join(settings.svmModelFile.path, settings.svmModelFile.name);
        fs.writeFileSync(ModelFilePath, this.svm.serializeModel());
    }
    
    loadModel() {
        const ModelFilePath = path.join(settings.svmModelFile.path, settings.svmModelFile.name);
        const serializedModel = fs.readFileSync(ModelFilePath, { encoding: 'utf8' });
        this.svm = SVM.load(serializedModel);
        this.trained = true;

        const csvFilePath = path.join(settings.csvFile.path, settings.csvFile.name);
        const readData = CSVDataHelper.readCSV(csvFilePath);
        const dataArray = CSVDataHelper.csv2json(readData);
        const featureLabelArray = DataTransformHelper.transformDataArrayToFeatureLabelArrays(dataArray);
        this.labelNames = featureLabelArray.labelNames;
    }

    train(successCallback, errorCallback) {
        this.createSvmModel();
        const csvFilePath = path.join(settings.csvFile.path, settings.csvFile.name);
        if (fs.existsSync(csvFilePath)) {
            const readData = CSVDataHelper.readCSV(csvFilePath);
            const dataArray = CSVDataHelper.csv2json(readData);
            const featureLabelArray = DataTransformHelper.transformDataArrayToFeatureLabelArrays(dataArray);
            const features = featureLabelArray.features;
            const labels = featureLabelArray.labels;
            this.labelNames = featureLabelArray.labelNames;
    
            this.svm.train(features, labels);  // train the model
            this.trained = true;
            this.saveModel();

            // update gestures
            const updateArray = [];
            this.gestures.forEach((gesture, index) => {
                if (this.labelNames.indexOf(gesture.label) >= 0) {
                    Gesture.update(gesture._id, { trained: true }, () => {
                        updateArray.push(index);

                        // all gestures updated
                        if(updateArray.length === this.labelNames.length) {
                            this.updateGestures();
                            this.trained = true;
                            successCallback();
                        }
                    });
                }
            });
        } else {
            console.log('Error: csv file not found');
            errorCallback();
        }
    }
    
    analyze(data) {
        if(this.trained && this.initialized) {
            const predictionResult = this.svm.predictOneProbability(data);
            const predictedLabel = predictionResult.prediction
            var predictedProbabiltiy = 0;
            predictionResult.estimates.forEach((labelClass) => {
                if(labelClass.label === predictionResult.prediction) predictedProbabiltiy = labelClass.probability;
            });
            
            const label = this.labelNames[predictedLabel];
            const gesture = this.gestures.filter(gesture => gesture.label === label);
            if(gesture && gesture.length === 1) {
                return {
                    name: gesture[0].name,
                    label: gesture[0].label,
                    probability: predictedProbabiltiy,
                    type: 'gesture',
                };
            }
        }
    }
}

const svmModelInstance = new SvmModel();
module.exports = svmModelInstance;
