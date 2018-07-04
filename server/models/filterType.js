const mongoose = require('mongoose');
const FilterTypeSchema = require('../schema/filterType');

const FilterType = mongoose.model('FilterType', FilterTypeSchema);

module.exports.readAll = (callback) => {
    FilterType.find({}, callback);
}
