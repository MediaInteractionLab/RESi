const mongoose = require('mongoose');
const FilterSchema = require('../schema/filter');

const Filter = mongoose.model('Filter', FilterSchema);

module.exports.create = (filterData, callback) => {
    const filter = new Filter(filterData);
    filter.save(callback);
};

module.exports.readAll = (callback) => {
    Filter.find({}, callback).sort({ order: 1 });
}

module.exports.read = (id, callback) => {
    Filter.findById(id, callback);
}

module.exports.update = (id, filterData, callback) => {
    Filter.findByIdAndUpdate(id, filterData, { new: true }, callback);
}

module.exports.delete = (id, callback) => {
    Filter.findByIdAndRemove(id, callback);
}

module.exports.reorder = (startIndex, endIndex, callback) => {
    Filter.find({}, (err, data) => {
        let filters = data;
        const [removed] = filters.splice(startIndex, 1);
        filters.splice(endIndex, 0, removed);

        filters.forEach((filter, index) => {
            Filter.findByIdAndUpdate(filter._id, { order: index }, {}, (err, data) => {
                // if (err) return res.send(500, { error: err });
                if (err) console.log(err);
            });
        });
    }).sort({ order: 1 });
    callback();
}