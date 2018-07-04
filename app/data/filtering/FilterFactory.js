"use strict";

const BandPassFilter = require('./filter/BandPassFilter');
const ClampingFilter = require('./filter/ClampingFilter');
const IndividualOffsetFilter = require('./filter/IndividualOffsetFilter');
const AdaptiveOffsetFilter = require('./filter/AdaptiveOffsetFilter');
const RotationFilter = require('./filter/RotationFilter');
const ScaleFilter = require('./filter/ScaleFilter');
const DeltaFilter = require('./filter/DeltaFilter');
const RemapFilter = require('./filter/RemapFilter');
const HighestPeakFilter = require('./filter/HighestPeakFilter');
const SlidingWindowFilter = require('./filter/SlidingWindowFilter');

class FilterFactory {

    getFilter(type, options = {}) {

        switch(type.toLowerCase()) {

        case BandPassFilter.getName().toLowerCase(): {
            return new BandPassFilter(options.id, options.min, options.max);
        }

        case ClampingFilter.getName().toLowerCase(): {
            return new ClampingFilter(options.id, options.min, options.max);
        }

        case IndividualOffsetFilter.getName().toLowerCase(): {
            return new IndividualOffsetFilter(options.id, options.initializationSteps);
        }

        case AdaptiveOffsetFilter.getName().toLowerCase(): {
            return new AdaptiveOffsetFilter(options.id, options.initializationSteps);
        }

        case RotationFilter.getName().toLowerCase(): {
            return new RotationFilter(options.id, options.width, options.height);
        }

        case ScaleFilter.getName().toLowerCase(): {
            return new ScaleFilter(options.id, options.scale);
        }

        case DeltaFilter.getName().toLowerCase(): {
            return new DeltaFilter(options.id);
        }

        case RemapFilter.getName().toLowerCase(): {
            return new RemapFilter(options.id, options.origMin, options.origMax, options.filteredMin, options.filteredMax);
        }

        case HighestPeakFilter.getName().toLowerCase(): {
            return new HighestPeakFilter(options.id);
        }

        case SlidingWindowFilter.getName().toLowerCase(): {
            return new SlidingWindowFilter(options.id, options.frames);
        }

        default: {
            return null;
        }

        }
    }
}

module.exports = FilterFactory; 
 