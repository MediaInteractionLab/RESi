const assert = require('assert');
const DataAnalyzer = require('../../data/DataAnalyzer');

describe('DataAnalyzer', function() {
    describe('#analyze()', function() {

        const analyzer = new DataAnalyzer();

        it('test first part of buffer message', function() {
            const testData = {
                serialData: {
                    data: [223, 4, 4, 0, 0, 4, 1, 1, 1],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 6);
            assert.equal(analyzer.index, 3);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([1, 1, 1]));
        });

        it('test intermediate part of buffer message', function() {
            const testData = {
                serialData: {
                    data: [2, 3, 4, 5, 6, 7, 8, 9],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 6);
            assert.equal(analyzer.index, 11);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
        });

        it('test last part of buffer message', function() {
            const testData = {
                serialData: {
                    data: [1, 2, 3, 4, 5],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 0);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5]));
        });

        it('test too long first part of buffer message', function() {
            const testData = {
                serialData: {
                    data: [223, 4, 4, 0, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 223, 4, 4, 0, 0, 4, 2, 2, 3, 4, 5],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 6);
            assert.equal(analyzer.index, 5);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([2, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]));
        });

        it('test too long intermediate buffer message', function() {
            const testData = {
                serialData: {
                    data: [4, 4, 0, 0, 4, 1, 1, 1, 1, 1, 2, 223, 4, 4, 0, 0, 4, 2, 2, 3, 4, 5],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 6);
            assert.equal(analyzer.index, 5);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([2, 2, 3, 4, 5, 4, 4, 0, 0, 4, 1, 1, 1, 1, 1, 2]));
        });

        it('test only header sent', function() {
            let testData = {
                serialData: {
                    data: [4, 4, 0, 0, 4, 1, 1, 1, 1, 1, 1, 223, 4, 4, 0, 0, 4],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 6);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([2, 2, 3, 4, 5, 4, 4, 0, 0, 4, 1, 1, 1, 1, 1, 1]));
            
            testData = {
                serialData: {
                    data: [4, 4, 0, 0, 4, 1, 1, 1, 1, 1, 1, 223, 4, 4, 0, 0],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 0);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 0, 0, 4, 1, 1, 1, 1, 1, 1, 223, 4, 4, 0, 0]));
            
            testData = {
                serialData: {
                    data: [223, 4, 4, 0, 0, 4],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 6);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 0, 0, 4, 1, 1, 1, 1, 1, 1, 223, 4, 4, 0, 0]));

            testData = {
                serialData: {
                    data: [4, 4, 0, 0, 5, 1, 1, 200, 90, 1, 1, 223, 4],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 6);
            assert.equal(analyzer.index, 13);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 0, 0, 5, 1, 1, 200, 90, 1, 1, 223, 4, 4, 0, 0]));
        });

        it('test only partial header sent (length 5)', function() {
            const testData = {
                serialData: {
                    data: [0, 0, 0, 223, 3, 3, 0, 0],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 5);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 0, 0, 5, 1, 1, 200, 90, 1, 1, 223, 4, 0, 0, 0]));
        });
        
        it('test only partial header sent (length 4)', function() {
            const testData = {
                serialData: {
                    data: [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 223, 4, 4, 0],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 3);
            assert.equal(analyzer.cols, 3);
            assert.equal(analyzer.headerBytesRead, 4);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 9);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 223, 4, 0, 0, 0]));
        });

        it('test only partial header sent (length 3)', function() {
            const testData = {
                serialData: {
                    data: [0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 223, 3, 3],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 3);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]));
        });

        it('test only partial header sent (length 2)', function() {
            const testData = {
                serialData: {
                    data: [0, 0, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 223, 4],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 3);
            assert.equal(analyzer.cols, 3);
            assert.equal(analyzer.headerBytesRead, 2);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 9);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1]));
        });

        it('test only partial header sent (length 1)', function() {
            const testData = {
                serialData: {
                    data: [4, 0, 0, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 223],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 1);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]));
        });

        it('test only partial header sent (rest)', function() {
            const testData = {
                serialData: {
                    data: [3, 3, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 3);
            assert.equal(analyzer.cols, 3);
            assert.equal(analyzer.headerBytesRead, 0);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 9);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3]));
        });

        it('test only partial header sent (byte by byte)', function() {
            let testData = {
                serialData: {
                    data: [223],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 3);
            assert.equal(analyzer.cols, 3);
            assert.equal(analyzer.headerBytesRead, 1);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 9);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3]));
            
            testData = {
                serialData: {
                    data: [4],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 3);
            assert.equal(analyzer.cols, 3);
            assert.equal(analyzer.headerBytesRead, 2);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 9);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3]));
            
            testData = {
                serialData: {
                    data: [4],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 3);
            assert.equal(analyzer.cols, 3);
            assert.equal(analyzer.headerBytesRead, 3);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 9);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3]));
            
            testData = {
                serialData: {
                    data: [0],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 3);
            assert.equal(analyzer.cols, 3);
            assert.equal(analyzer.headerBytesRead, 4);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 9);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3]));
            
            testData = {
                serialData: {
                    data: [0],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 3);
            assert.equal(analyzer.cols, 3);
            assert.equal(analyzer.headerBytesRead, 5);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 9);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3]));
            
            testData = {
                serialData: {
                    data: [4],
                },
            };
            analyzer.analyze(testData);
            assert.equal(analyzer.initialized, true);
            assert.equal(analyzer.rows, 4);
            assert.equal(analyzer.cols, 4);
            assert.equal(analyzer.headerBytesRead, 6);
            assert.equal(analyzer.index, 0);
            assert.equal(analyzer.dataLength, 16);
            assert.equal(JSON.stringify(analyzer.dataArray), JSON.stringify([4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3]));
        });

    });
});