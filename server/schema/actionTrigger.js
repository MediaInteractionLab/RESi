const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActionTriggerSchema = new Schema({
    name: String,
    request: {
        method: String,
        url: String,
        data: {},
    },
    labels: [String],
});

module.exports = ActionTriggerSchema;
