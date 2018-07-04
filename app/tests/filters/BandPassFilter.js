const assert = require('assert');
const BandPassFilter = require('../../data/filtering/filter/BandPassFilter');

describe('BandPassFilter', function() {
    describe('#filter()', function() {
        
        const filter = new BandPassFilter('testid', 2, 10);
        const testData = [1, -2, 30, 4, -5, 6, -70, 80, -9];

        it('test basic clipping', function() {
            const data = filter.filter(testData);

            const expectedValues = [0, 0, 0, 4, 0, 6, 0, 0, 0];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
        
        it('test changing bounds', function() {
            filter.setUpperBound(-2);
            filter.setLowerBound(-100);
            const data = filter.filter(testData);

            assert.equal(filter.min, -100);
            assert.equal(filter.max, -2);
    
            const expectedValues = [0, -2, 0, 0, -5, 0, -70, 0, -9];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });

    });
});