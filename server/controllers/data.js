const express = require('express');
const SerialPort = require('serialport');
const Gesture = require('../models/gesture');
const DataCapturer = require('../../app/data/DataCapturer');
const { inputReader } = require('../../app/index');

const router = express.Router();


// -------------------------------
// ---------- Get Ports ----------
// -------------------------------

router.get('/ports', function(req, res) {
    const promise = SerialPort.list();
    promise.then((ports) => {
        res.json({ ports });
    });
});

// ------------------------------------
// ---------- Data Capturing ----------
// ------------------------------------

router.post('/capture/start/:gestureId', function(req, res) {
    const id = req.params.gestureId;

    Gesture.read(id, (err, data) => {
        if (err) {
            /* eslint-disable */
            console.log('Error', err);
            /* eslint-enable */
            res.json({ success: false });
        }
        const label = data.label;
        DataCapturer.start(label);
        res.json({ success: true });
    });
});

router.post('/capture/stop', function(req, res) {
    DataCapturer.stop();
    res.json({ success: true });
});

router.post('/capture/:gestureId', function(req, res) {
    const id = req.params.gestureId;

    Gesture.read(id, (err, data) => {
        if (err) {
            /* eslint-disable */
            console.log('Error', err);
            /* eslint-enable */
            res.json({ success: false });
        }
        const label = data.label;
        DataCapturer.captureSingleFrame(label);
        res.json({ success: true });
    });
});

router.post('/device/:productId', function(req, res) {
    const id = req.params.productId;
    inputReader.setProductId(id);
    res.json({ success: true });
});

module.exports = router;
