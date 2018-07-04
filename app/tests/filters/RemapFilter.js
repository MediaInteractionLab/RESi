const assert = require('assert');
const RemapFilter = require('../../data/filtering/filter/RemapFilter');

describe('RemapFilter', function() {
    describe('#filter()', function() {
        
        const filter = new RemapFilter('testid', 1, 10, 2, 20);
        const testData = [1, -2, 3, 4, -5, 6, 70, 8, -9];

        it('test basic filtering with values outside bounds', function() {
            const data = filter.filter(testData);

            const expectedValues = [2, 2, 6, 8, 2, 12, 20, 16, 2];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
        
    });
});