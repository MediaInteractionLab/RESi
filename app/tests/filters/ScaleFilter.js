const assert = require('assert');
const ScaleFilter = require('../../data/filtering/filter/ScaleFilter');

describe('ScaleFilter', function() {
    describe('#filter()', function() {
        
        const filter = new ScaleFilter('testid', 2);
        const testData = [1, -2, 0, 4, -5, 6, -7, 8, -9];

        it('test filtering with positive scale', function() {
            const data = filter.filter(testData);

            const expectedValues = [2, -4, 0, 8, -10, 12, -14, 16, -18];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
        
        it('test filtering with zero scale', function() {
            filter.setScale(0);
            const data = filter.filter(testData);
    
            const expectedValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
        
        it('test filtering with negative scale', function() {
            filter.setScale(-3);
            const data = filter.filter(testData);
    
            const expectedValues = [-3, 6, 0, -12, 15, -18, 21, -24, 27];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });

    });
});