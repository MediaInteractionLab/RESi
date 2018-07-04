const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TriggerVariablaSchema = new Schema({
    variables: {}
});

module.exports = TriggerVariablaSchema;
