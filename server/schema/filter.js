const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FilterSchema = new Schema({
    typeId: Schema.Types.ObjectId,
    options: {},
    order: Number,
});

module.exports = FilterSchema;