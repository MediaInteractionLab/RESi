const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FilterTypeSchema = new Schema({
    name: String,
    type: String,
    options: [{
        name: { type: String},
        label: { type: String},
        type: { type: String},
    }]
});

module.exports = FilterTypeSchema;