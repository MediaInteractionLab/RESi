const assert = require('assert');
const FilterComposite = require('../../data/filtering/FilterComposite');
const ScaleFilter = require('../../data/filtering/filter/ScaleFilter');
const ClampingFilter = require('../../data/filtering/filter/ClampingFilter');
const BandPassFilter = require('../../data/filtering/filter/BandPassFilter');
const IndividualOffsetFilter = require('../../data/filtering/filter/IndividualOffsetFilter');
const RotationFilter = require('../../data/filtering/filter/RotationFilter');

describe('FilterComposite', function() {

    const filterComposite = new FilterComposite('testid');
    const clampingFilterFilter = new ClampingFilter('testidSPECIAL', 0, 10);

    describe('#appendFilter()', function() {
        it('test appending of different filters', function() {
            assert.equal(filterComposite.filterChain.length, 0);

            const scaleFilter = new ScaleFilter('testid', 2);
            filterComposite.appendFilter(scaleFilter);
            assert.equal(filterComposite.filterChain.length, 1);
            
            filterComposite.appendFilter(clampingFilterFilter);
            assert.equal(filterComposite.filterChain.length, 2);
            
            const bandPassFilter = new BandPassFilter('testid', -5, 30);
            filterComposite.appendFilter(bandPassFilter);
            assert.equal(filterComposite.filterChain.length, 3);

            assert.equal(filterComposite.filterChain[0] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[1] instanceof ClampingFilter, true);
            assert.equal(filterComposite.filterChain[2] instanceof BandPassFilter, true);
        });
    });

    describe('#appendFilter()', function() {
        it('test appending of different filters via filter factory', function() {

            const filterCompositeViaFactory = new FilterComposite('testid');

            assert.equal(filterCompositeViaFactory.filterChain.length, 0);

            filterCompositeViaFactory.appendFilter('Scale Filter', { scale: 2 });
            assert.equal(filterCompositeViaFactory.filterChain.length, 1);
            
            filterCompositeViaFactory.appendFilter('Clamping Filter', { min: 0, max: 10 });
            assert.equal(filterCompositeViaFactory.filterChain.length, 2);
            
            filterCompositeViaFactory.appendFilter('Band-Pass Filter', { min: -5, max: 30 });
            assert.equal(filterCompositeViaFactory.filterChain.length, 3);

            filterCompositeViaFactory.appendFilter('Individual Offset Filter', { initializationStep: 5 });
            assert.equal(filterCompositeViaFactory.filterChain.length, 4);

            filterCompositeViaFactory.appendFilter('Rotation Filter', { width: 32, height: 32 });
            assert.equal(filterCompositeViaFactory.filterChain.length, 5);

            filterCompositeViaFactory.appendFilter('Not Existing Filter', { min: -5, max: 30 });
            assert.equal(filterCompositeViaFactory.filterChain.length, 6);

            assert.equal(filterCompositeViaFactory.filterChain[0] instanceof ScaleFilter, true);
            assert.equal(filterCompositeViaFactory.filterChain[1] instanceof ClampingFilter, true);
            assert.equal(filterCompositeViaFactory.filterChain[2] instanceof BandPassFilter, true);
            assert.equal(filterCompositeViaFactory.filterChain[3] instanceof IndividualOffsetFilter, true);
            assert.equal(filterCompositeViaFactory.filterChain[4] instanceof RotationFilter, true);
            assert.equal(filterCompositeViaFactory.filterChain[5], null);
        });
    });

    describe('#removeFilter()', function() {
        it('test removing filter by ID', function() {
            filterComposite.removeFilter(clampingFilterFilter.getId());
            assert.equal(filterComposite.filterChain.length, 2);
            assert.equal(filterComposite.filterChain[0] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[1] instanceof BandPassFilter, true);
        });
    });

    describe('#filter()', function() {
        it('test basic filtering with filter chain', function() {
            const testData = [1, -2, 30, 4, -5, 6, -70, 80, -9];
            const data = filterComposite.filter(testData);
            
            const expectedValues = [2, -4, 0, 8, 0, 12, 0, 0, 0];
            data.forEach((value, index) => {
                assert.equal(value, expectedValues[index]);
            });
        });
    });
    
    describe('#moveFilter()', function() {
        it('test moving filters', function() {
            const scaleFilter = new ScaleFilter(2);
            filterComposite.appendFilter(scaleFilter);
            
            const bandPassFilter = new ClampingFilter('testid', -5, 30);
            filterComposite.appendFilter(bandPassFilter);

            assert.equal(filterComposite.filterChain.length, 4);
            assert.equal(filterComposite.filterChain[0] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[1] instanceof BandPassFilter, true);
            assert.equal(filterComposite.filterChain[2] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[3] instanceof ClampingFilter, true);

            filterComposite.moveFilter(3, 0);

            assert.equal(filterComposite.filterChain.length, 4);
            assert.equal(filterComposite.filterChain[0] instanceof ClampingFilter, true);
            assert.equal(filterComposite.filterChain[1] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[2] instanceof BandPassFilter, true);
            assert.equal(filterComposite.filterChain[3] instanceof ScaleFilter, true);

            filterComposite.moveFilter(3, 0);

            assert.equal(filterComposite.filterChain.length, 4);
            assert.equal(filterComposite.filterChain[0] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[1] instanceof ClampingFilter, true);
            assert.equal(filterComposite.filterChain[2] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[3] instanceof BandPassFilter, true);

            filterComposite.moveFilter(0, 2);

            assert.equal(filterComposite.filterChain.length, 4);
            assert.equal(filterComposite.filterChain[0] instanceof ClampingFilter, true);
            assert.equal(filterComposite.filterChain[1] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[2] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[3] instanceof BandPassFilter, true);

            filterComposite.moveFilter(0, 3);

            assert.equal(filterComposite.filterChain.length, 4);
            assert.equal(filterComposite.filterChain[0] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[1] instanceof ScaleFilter, true);
            assert.equal(filterComposite.filterChain[2] instanceof BandPassFilter, true);
            assert.equal(filterComposite.filterChain[3] instanceof ClampingFilter, true);
        });
    });
});