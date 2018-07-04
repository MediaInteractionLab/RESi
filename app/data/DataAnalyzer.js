"use strict";

const EventEmitter = require('events');

const NumberOfHeaderBytes = 6;

class DataAnalyzer extends EventEmitter {
    
    constructor() {
        super();
        this.dataArray = [];
        this.rows = 0;
        this.cols = 0;
        this.headerBytesRead = 0;
        this.currentHeader = [];
        this.index = 0;
        this.initialized = false;
        this.analyze = this.analyze.bind(this);
        this.handleBufferMessageStart = this.handleBufferMessageStart.bind(this);
        this.handleBufferMessageIntermediate = this.handleBufferMessageIntermediate.bind(this);
        this.handleBufferMessage = this.handleBufferMessage.bind(this);
        this.initialize = this.initialize.bind(this);
        this.copyHeader = this.copyHeader.bind(this);
        this.headerComplete = this.headerComplete.bind(this);
        this.calcDataLength = this.calcDataLength.bind(this);
    }

    // 1st byte: starting byte
    // 2nd byte: number of rows
    // 3rd byte: number of cols
    // 4th byte: encoding
    // 5th & 6th byte: bytecount
    // from 7th byte sensor data
    handleBufferMessageStart(data) {

        // no header read yet (beginning)
        if(this.headerBytesRead === 0) {
           
            // check if header starts correctly
            if(data[0] === 223) {
                
                // check if complete header is sent
                if(data.length >= NumberOfHeaderBytes) {
                    this.currentHeader = data.splice(0, NumberOfHeaderBytes); 
                    this.calcDataLength();
                    this.headerBytesRead = NumberOfHeaderBytes;
                    this.handleBufferMessage(data);

                // only partial header is sent
                } else {
                    this.copyHeader(data);
                }
            } else {
                /* eslint-disable */
                console.log('Message start but no start header detected!');
                /* eslint-enable */

                // RESET
                this.dataArray = [];
                this.rows = 0;
                this.cols = 0;
                this.headerBytesRead = 0;
                this.currentHeader = [];
                this.index = 0;
                this.initialized = false;
            }

        // header was already partially read
        } else {
            const headerRest = NumberOfHeaderBytes - this.currentHeader.length;
            const restData = data.slice(headerRest, data.length);
            
            this.copyHeader(data);

            if(this.headerComplete()) {
                this.calcDataLength();
    
                if(restData.length > 0) {
                    this.handleBufferMessage(restData);
                }
            }
        }
    }
    
    handleBufferMessageIntermediate(data) {
        const oldData1 = this.dataArray.slice(0, this.index);
        const newData = data;
        this.index = this.index + newData.length;
        const oldData2 = this.dataArray.slice(this.index, this.dataArray.length);
        this.dataArray = [...oldData1, ...newData, ...oldData2];
        
        if(this.index === this.dataLength) { // last part of data
            this.headerBytesRead = 0;
            this.currentHeader = [];
            this.index = 0;
            this.emit('data-array', this.dataArray, this.rows, this.cols);
        }
    }
    
    handleBufferMessage(data) {
        // check if matrix start
        if (this.headerBytesRead < NumberOfHeaderBytes) {
            this.handleBufferMessageStart(data);
        } else {
            const missingRestData = this.dataLength - this.index;
            if (data.length <= missingRestData) {
                this.handleBufferMessageIntermediate(data);
            } else {
                const part1 = data.slice(0, missingRestData);
                const part2 = data.slice(missingRestData, data.length);
                this.handleBufferMessageIntermediate(part1);
                this.handleBufferMessage(part2);
            }
        }
    }
    
    analyze(dataObject) {
        let data = dataObject.serialData.data;
        
        if (!this.initialized) {
            this.initialize(data);
        } else {
            this.handleBufferMessage(data);
        }
    }

    initialize(data) {
        // on starting up, wait for a byte with value 223 (DF)
        let index = null;

        for(let i = 0; i < data.length && (index === null); i++) {
            if(data[i] === 223) {
                index = i;
            }
        }

        // if header start byte was found initialize DataAnalyzer
        if(index !== null) {
            data = data.slice(index, data.length);

            this.copyHeader(data);

            if(this.headerComplete()) {
                this.calcDataLength();
            }
            
            this.initialized = true;

            if(data.length > NumberOfHeaderBytes) {
                this.handleBufferMessage(data.slice(NumberOfHeaderBytes, data.length));
            }
        }
    }

    // copy header to instance variable
    copyHeader(data) {
        for(let i = 0; i < data.length && this.currentHeader.length < NumberOfHeaderBytes; i++) {
            this.currentHeader.push(data[i]);
            this.headerBytesRead += 1;
        }
    }

    headerComplete() {
        return this.currentHeader.length === NumberOfHeaderBytes;
    }

    calcDataLength() {
        this.rows = this.currentHeader[1];
        this.cols = this.currentHeader[2];
        this.dataLength = this.rows * this.cols;
        this.currentHeader = [];
    }
}

module.exports = DataAnalyzer;
