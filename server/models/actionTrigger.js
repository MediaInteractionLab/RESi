const mongoose = require('mongoose');
const ActionTriggerSchema = require('../schema/actionTrigger');

const ActionTrigger = mongoose.model('ActionTrigger', ActionTriggerSchema);

module.exports.create = (triggerData, callback) => {
    const trigger = new ActionTrigger(triggerData);
    trigger.save(callback);
};

module.exports.read = (id, callback) => {
    ActionTrigger.findById(id, callback);
}

module.exports.readAll = (callback) => {
    ActionTrigger.find({}, callback);
}

module.exports.update = (id, triggerData, callback) => {
    ActionTrigger.findByIdAndUpdate(id, triggerData, { new: true }, callback);
}

module.exports.delete = (id, callback) => {
    ActionTrigger.findByIdAndRemove(id, callback);
}