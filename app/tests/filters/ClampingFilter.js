const assert = require('assert');
const ClampingFilter = require('../../data/filtering/filter/ClampingFilter');

describe('ClampingFilter', function() {
    describe('#filter()', function() {
        
        const filter = new ClampingFilter('testid', 0, 10);
        const testData = [1, -2, 30, 4, -5, 6, -70, 80, -9];

        it('test basic clamping', function() {
            const data = filter.filter(testData);

            const expectedValues = [1, 0, 10, 4, 0, 6, 0, 10, 0];
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
    
            const expectedValues = [-2, -2, -2, -2, -5, -2, -70, -2, -9];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });

    });
});