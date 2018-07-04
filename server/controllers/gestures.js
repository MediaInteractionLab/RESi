const express = require('express');
const Gesture = require('../models/gesture');
const SvmModel = require('../../app/gestureDetection/SvmModel');
const DataCapturer = require('../../app/data/DataCapturer');

const router = express.Router();

const handleError = (res, err) => {
    /* eslint-disable */
    console.log('Error', err);
    /* eslint-enable */
    res.json({ success: false });
};

// ----- TRAIN -----
router.post('/train', function(req, res) {
    SvmModel.train(
        () => {
            res.json({ success: true });
        },
        () => {
            res.json({ success: false });
        }
    );
});

// ----- CREATE -----
router.post('/', function(req, res) {
    const gesture = {
        name: req.body.name,
        label: req.body.label,
    };
    Gesture.create(gesture, (err, data) => {
        if (err) handleError(res, err);
        SvmModel.updateGestures();
        res.json(data);
    });
});

// ----- READ -------
router.get('/:id', function(req, res) {
    const id = req.params.id;
    Gesture.read(id, (err, data) => {
        if (err) handleError(res, err);
        res.json(data);
    });
});
router.get('/', function(req, res) {
    Gesture.readAll((err, data) => {
        if (err) handleError(res, err);
        res.json(data);
    });
});

// ----- UPDATE -----
router.put('/:id', function(req, res) {
    const id = req.params.id;
    const { label, name, trained } = req.body;
    const gesture = { _id: id };

    if (label) { gesture.label = label; }
    if (name) { gesture.name = name; }
    if (trained) { gesture.trained = trained; }

    Gesture.update(id, gesture, (err) => {
        if (err) handleError(res, err);
        SvmModel.updateGestures();
        res.json({ success: true });
    });
});
    
// ----- DELETE -----
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Gesture.delete(id, (err, data) => {
        if (err) handleError(res, err);
        SvmModel.updateGestures();
        DataCapturer.deleteGesture(data.label);
        res.json(data);
    });
});

module.exports = router;
