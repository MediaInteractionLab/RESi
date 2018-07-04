const mongoose = require('mongoose');
const TriggerVariableSchema = require('../schema/triggerVariables');

const TriggerVariable = mongoose.model('TriggerVariable', TriggerVariableSchema);

module.exports.create = (variable, callback) => {
    const triggerVariable = new TriggerVariable(variable);
    triggerVariable.save(callback);
};

module.exports.read = (id, callback) => {
    TriggerVariable.findById(id, callback);
}

module.exports.readAll = (callback) => {
    TriggerVariable.find({}, callback);
}

module.exports.update = (id, variableData, callback) => {
    TriggerVariable.findByIdAndUpdate(id, variableData, callback);
}

module.exports.delete = (id, callback) => {
    TriggerVariable.findByIdAndRemove(id, callback);
}