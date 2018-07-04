const assert = require('assert');
const RotationFilter = require('../../data/filtering/filter/RotationFilter');

describe('RotationFilter', function() {

    const filter = new RotationFilter('testid', 3, 3);
    const filterAsync = new RotationFilter('testid', 4, 3);
    
    describe('#arrayToMatrix()', function() {
        it('test array to matrix convert with symmetrix matrix', function() {
            const testData = [1, -2, 3, -4, 0, 6, -7, 8, -9];
            const data = filter.arrayToMatrix(testData, 3, 3);

            assert.equal(data[0][0], 1);
            assert.equal(data[0][1], -4);
            assert.equal(data[0][2], -7);

            assert.equal(data[1][0], -2);
            assert.equal(data[1][1], 0);
            assert.equal(data[1][2], 8);

            assert.equal(data[2][0], 3);
            assert.equal(data[2][1], 6);
            assert.equal(data[2][2], -9);
        });
        it('test array to matrix convert with asymmetrix matrix', function() {
            const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            const data = filterAsync.arrayToMatrix(testData, 3, 4);

            assert.equal(data[0][0], 1);
            assert.equal(data[0][1], 5);
            assert.equal(data[0][2], 9);

            assert.equal(data[1][0], 2);
            assert.equal(data[1][1], 6);
            assert.equal(data[1][2], 10);

            assert.equal(data[2][0], 3);
            assert.equal(data[2][1], 7);
            assert.equal(data[2][2], 11);

            assert.equal(data[3][0], 4);
            assert.equal(data[3][1], 8);
            assert.equal(data[3][2], 12);
        });
    });

    describe('#rotate()', function() {
        it('test rotation of symmetrix matrix', function() {
            const testData = [
                [1, -4, -7],
                [-2, 0, 8],
                [3, 6, -9],
            ];

            const data = filter.rotate(testData, 3, 3);

            assert.equal(data[0][0], -7);
            assert.equal(data[0][1], 8);
            assert.equal(data[0][2], -9);

            assert.equal(data[1][0], -4);
            assert.equal(data[1][1], 0);
            assert.equal(data[1][2], 6);

            assert.equal(data[2][0], 1);
            assert.equal(data[2][1], -2);
            assert.equal(data[2][2], 3);            
        });
        it('test rotation of asymmetrix matrix', function() {
            const testData = [
                [1, 5, 9],
                [2, 6, 10],
                [3, 7, 11],
                [4, 8, 12],
            ];

            const data = filterAsync.rotate(testData, 3, 4);

            assert.equal(data[0][0], 9);
            assert.equal(data[0][1], 10);
            assert.equal(data[0][2], 11);
            assert.equal(data[0][3], 12);

            assert.equal(data[1][0], 5);
            assert.equal(data[1][1], 6);
            assert.equal(data[1][2], 7);
            assert.equal(data[1][3], 8);

            assert.equal(data[2][0], 1);
            assert.equal(data[2][1], 2);
            assert.equal(data[2][2], 3);   
            assert.equal(data[2][3], 4);   
        });
    });

    describe('#matrixToArray()', function() {
        it('test matrix to array conversion with symmetric matrix', function() {
            const testData = [
                [1, -4, -7],
                [-2, 0, 8],
                [3, 6, -9],
            ];

            const data = filter.matrixToArray(testData);

            const expectedValues = [1, -2, 3, -4, 0, 6, -7, 8, -9];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
        it('test matrix to array conversion with symmetric matrix', function() {
            const testData = [
                [9, 10, 11, 12],
                [5, 6, 7, 8],
                [1, 2, 3, 4],
            ];

            const data = filterAsync.matrixToArray(testData);

            const expectedValues = [9, 5, 1, 10, 6, 2, 11, 7, 3, 12, 8, 4];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
    });

    describe('#filter()', function() {
        it('test filtering with rotation', function() {
            const testData = [1, -2, 3, -4, 0, 6, -7, 8, -9];
            const data = filter.filter(testData);

            const expectedValues = [-7, -4, 1, 8, 0, -2, -9, 6, 3];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
        it('test filtering with rotation and asymmetric matrix', function() {
            const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            const data = filterAsync.filter(testData);

            const expectedValues = [9, 5, 1, 10, 6, 2, 11, 7, 3, 12, 8, 4];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
    });

});
