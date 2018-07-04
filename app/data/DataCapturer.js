"use strict";

const path = require('path');
const fs = require('fs');
const CSVDataHelper = require('../util/CSVDataHelper');
const settings = require('../parameters');
const blobDetector = require('../util/blobdetector');

class DataCapturer {
    
    constructor() {
        this.isCapturing = false;
        this.isCapturingSingleFrame = false;
        this.gesture = '';
        
        this.initializeDataArray = this.initializeDataArray.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.data = this.data.bind(this);
        this.writeDataToFile = this.writeDataToFile.bind(this);
        this.deleteGesture = this.deleteGesture.bind(this);

        this.initializeDataArray();
    }

    initializeDataArray() {
        const csvFilePath = path.join(settings.csvFile.path, settings.csvFile.name);
        if (fs.existsSync(csvFilePath)) {
            const readData = CSVDataHelper.readCSV(csvFilePath);
            this.dataArray = CSVDataHelper.csv2json(readData);
        } else {
            this.dataArray = [];
        }
    }

    deleteGesture(label) {
        if(!this.isCapturing) {
            this.dataArray = this.dataArray.filter(gesture => gesture.label !== label);
            this.writeDataToFile();
        } else {
            /* eslint-disable */
            console.log('Error: cannot delete gesture while capturing data');
            /* eslint-enable */
        }
    }

    start(gestureName) {
        this.isCapturing = true;
        this.gesture = gestureName;
    }
    
    stop() {
        if(this.isCapturing) {
            this.isCapturing = false;
            this.writeDataToFile();
        }
    }

    captureSingleFrame(gestureName) {
        this.isCapturing = true;
        this.isCapturingSingleFrame = true;
        this.gesture = gestureName;
    }

    data(data) {
        if(this.isCapturing) {
            this.dataArray.push(
                {
                    label: this.gesture,
                    data: [...data],
                }
            );
    
            if (this.isCapturingSingleFrame) {
                this.stop();
                this.isCapturingSingleFrame = false;
            }
        }
    }

    writeDataToFile() {
        const csvData = CSVDataHelper.json2csv(this.dataArray);
        const filePath = path.join(settings.csvFile.path, settings.csvFile.name);
        CSVDataHelper.writeCSV(filePath, csvData);
    }

    getFeatures(data, rows, cols) {
        var blobs = blobDetector.detect(data, rows, cols, 20, 5);
        blobs.sort(function(a,b) { return b.sensorCount - a.sensorCount; });
        if(blobs[0] === undefined) blobs[0] = blobDetector.createBlob(0,0,0,0,0,0,0,0,[],0);

        let features = [];
        features.push(blobs[0].center.x);
        features.push(blobs[0].center.y);
        features.push(blobs[0].averageValue);
        features.push(blobs[0].maxValue);
        features.push(blobs[0].boundingBox.left);
        features.push(blobs[0].boundingBox.right);
        features.push(blobs[0].boundingBox.top);
        features.push(blobs[0].boundingBox.bottom);
        features.push(blobs[0].sensorCount);
        features.push(blobs.length);
        return features.concat(blobs[0].histogram);
    }
}

const DataCapturerInstace = new DataCapturer();
module.exports = DataCapturerInstace;
