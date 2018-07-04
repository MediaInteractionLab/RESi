"use strict";

const EventEmitter = require('events');
const SerialPort = require('serialport');

const BAUD_RATE = 115200;
const DATA_BITS = 65536;

class SerialInputReader extends EventEmitter {
    
    constructor() {
        super();
        this.productId = '2404';
        this.initializeSerialPort = this.initializeSerialPort.bind(this);
        this.handleSerialData = this.handleSerialData.bind(this);
        this.setProductId = this.setProductId.bind(this);
        this.initializeSerialPort();
    }

    setProductId(id) {
        if(this.serialPort) {
            this.serialPort.close();
            this.serialPort.on('close', () => {
                this.productId = id;
                this.portName = null;
                this.serialPort = null;
                this.initializeSerialPort();
            });
        } else {
            this.productId = id;
            this.initializeSerialPort();
        }
    }
    
    initializeSerialPort() {
        SerialPort.list().then((ports) => {
            ports.forEach((port) => {

                if(port.productId === this.productId) {

                    this.portName = port.comName;

                    this.serialPort = new SerialPort(
                        this.portName,
                        {
                            parser: SerialPort.parsers.Readline,
                            baudRate: BAUD_RATE,
                            highWaterMark: DATA_BITS,
                        }
                    );

                    this.serialPort.on('data', this.handleSerialData);
                    
                    this.serialPort.on('error', function(err) {
                        /* eslint-disable */
                        console.log('Error: ', err.message);
                        /* eslint-enable */
                    })
                }
            });
            
            // log ports when device is not found
            if(!this.portName) {
                /* eslint-disable */
                console.log('Device not found');
                console.log('Ports:', ports);
                /* eslint-enable */
            }
        }).catch((error) => {
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
        });
    }

    handleSerialData(serialData) {
        const data = {
            serialData: JSON.parse(JSON.stringify(serialData)),
        };
        this.emit('incoming-data', data);
    }
}

module.exports = SerialInputReader;
