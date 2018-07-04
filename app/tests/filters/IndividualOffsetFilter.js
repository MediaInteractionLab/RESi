const assert = require('assert');
const IndividualOffsetFilter = require('../../data/filtering/filter/IndividualOffsetFilter');

describe('IndividualOffsetFilter', function() {
    describe('#filter()', function() {
        
        const filter = new IndividualOffsetFilter('testid');

        it('test initialization', function() {
            const testData = [223, 4, 4, 0, 0, 4, 1, 1, 1];
            assert.equal(filter.initialized, false);
            const data = filter.filter(testData);
            assert.equal(filter.initialized, true);

            const expectedValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });

        it('test filtering with positive values', function() {
            assert.equal(filter.initialized, true);
            const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const data = filter.filter(testData);

            const expectedValues = [-222, -2, -1, 4, 5, 2, 6, 7, 8];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
        
        it('test filtering with zeros', function() {
            assert.equal(filter.initialized, true);
            const testData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            const data = filter.filter(testData);
    
            const expectedValues = [-223, -4, -4, 0, 0, -4, -1, -1, -1];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
        
        it('test filtering with negative values', function() {
            assert.equal(filter.initialized, true);
            const testData = [-1, -2, -3, -4, -5, -6, -7, -8, -9];
            const data = filter.filter(testData);
    
            const expectedValues = [-224, -6, -7, -4, -5, -10, -8, -9, -10];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
        
        it('test with multiple initialization steps', function() {
            const filter5 = new IndividualOffsetFilter('testid', 3);

            // initialization 1
            assert.equal(filter5.initialized, false);
            let testData = [1, -2, 0, 0, 0, 1, 0, 0, 2];
            let data = filter5.filter(testData);
    
            let filterValues = [1, -2, 0, 0, 0, 1, 0, 0, 2];
            filter5.offsetValues.forEach((value, index) => {
                assert.equal(value, filterValues[index]);
            });
            let expectedValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });

            // initialization 2
            assert.equal(filter5.initialized, false);
            testData = [0, -1, 1, 0, 0, 0, 0, 0, 1];
            data = filter5.filter(testData);
    
            filterValues = [1, -1, 1, 0, 0, 1, 0, 0, 2];
            filter5.offsetValues.forEach((value, index) => {
                assert.equal(value, filterValues[index]);
            });
            expectedValues = [-1, 0, 0, 0, 0, -1, 0, 0, -1];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });

            // initialization 3
            assert.equal(filter5.initialized, false);
            testData = [0, 0, 0, 0, 0, 0, 0, 1, 0];
            data = filter5.filter(testData);
            
            assert.equal(filter5.initialized, true);
            filterValues = [1, 0, 1, 0, 0, 1, 0, 1, 2];
            filter5.offsetValues.forEach((value, index) => {
                assert.equal(value, filterValues[index]);
            });
            expectedValues = [-1, 0, -1, 0, 0, -1, 0, 0, -2];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });

    });
});