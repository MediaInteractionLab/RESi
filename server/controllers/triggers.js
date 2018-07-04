const express = require('express');
const ActionTrigger = require('../models/actionTrigger');
const actionDispatcher = require('../../app/index').actionDispatcher;

const router = express.Router();

const handleError = (res, err) => {
    /* eslint-disable */
    console.log('Error', err);
    /* eslint-enable */
    res.json({ success: false });
};

// ----- CREATE -----
router.post('/', function(req, res) {

    const { name, method, url, data } = req.body;
    const trigger = {
        name,
        request: {
            method, 
            url,
            data,
        },
        labels: [],
    };

    ActionTrigger.create(trigger, (err, data) => {
        if (err) handleError(res, err);
        actionDispatcher.addTrigger(data);
        res.json(data);
    });
});

// ----- READ -------
router.get('/:id', function(req, res) {
    const id = req.params.id;
    ActionTrigger.read(id, (err, data) => {
        if (err) handleError(res, err);
        res.json(data);
    });
});
router.get('/', function(req, res) {
    ActionTrigger.readAll((err, data) => {
        if (err) handleError(res, err);
        res.json(data);
    });
});

// ----- UPDATE -----
router.put('/:id', function(req, res) {
    const id = req.params.id;

    const { name, method, url, data, labels } = req.body;
    const trigger = { _id: id };
    if (name) { trigger.name = name; }
    if (method || url || data) {
        trigger.request = {};
        if (method) { trigger.request.method = method; }
        if (url) { trigger.request.url = url; }
        if (data) { trigger.request.data = data; }
    }
    if (labels) { trigger.labels = labels; }

    ActionTrigger.update(id, trigger, (err, data) => {
        if (err) handleError(res, err);
        actionDispatcher.updateTrigger(data);
        res.json(data);
    });
});
    
// ----- DELETE -----
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    ActionTrigger.delete(id, (err, data) => {
        if (err) handleError(res, err);
        actionDispatcher.removeTrigger(id);
        res.json(data);
    });
});

module.exports = router;
