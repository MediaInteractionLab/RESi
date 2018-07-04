const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GestureSchema = new Schema({
    name: String,
    label: String,
    trained: Boolean,
});

module.exports = GestureSchema;