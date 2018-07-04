const mongoose = require('mongoose');
const GestureSchema = require('../schema/gesture');

const Gesture = mongoose.model('Gesture', GestureSchema);

module.exports.create = (gestureData, callback) => {
    const gesture = new Gesture(gestureData);
    gesture.save(callback);
};

module.exports.read = (id, callback) => {
    Gesture.findById(id, callback);
}

module.exports.readAll = (callback) => {
    Gesture.find({}, callback);
}

module.exports.update = (id, gestureData, callback) => {
    Gesture.findByIdAndUpdate(id, gestureData, callback);
}

module.exports.delete = (id, callback) => {
    Gesture.findByIdAndRemove(id, callback);
}
