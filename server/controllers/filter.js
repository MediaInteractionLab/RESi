const express = require('express');
const FilterType = require('../models/filterType');
const Filter = require('../models/filter');
const filterComposite = require('../../app/index').filterComposite;

const router = express.Router();

const handleError = (res, err) => {
    /* eslint-disable */
    console.log('Error', err);
    /* eslint-enable */
    res.json({ success: false });
};

// ----- FILTER TYPES -----
router.get('/types', function(req, res) {
    FilterType.readAll((err, data) => {
        if (err) handleError(res, err);
        res.json(data);
    });
});

// ----- RESET -----
router.put('/reset', function(req, res) {
    filterComposite.reset();
    res.json({ success: true });
});

// ----- CREATE -----
router.post('/', function(req, res) {
    const filter = {
        typeId: req.body.typeId,
        order: req.body.order,
        options: req.body.options,
    };
    Filter.create(filter, (err, data) => {
        if (err) handleError(res, err);
        const options = req.body.options;
        options.id = data._id;
        filterComposite.appendFilter(req.body.type, options);
        res.json(data);
    });
});

// ----- READ -------
router.get('/', function(req, res) {
    Filter.readAll((err, data) => {
        if (err) handleError(res, err);
        res.json(data);
    });
});
router.get('/:id', function(req, res) {
    Filter.read(req.params.id, (err, data) => {
        if (err) handleError(res, err);
        res.json(data);
    });
});

// ----- REORDER -----
router.put('/reorder', function(req, res) {
    const startIndex = req.body.startIndex;
    const endIndex = req.body.endIndex;

    Filter.reorder(startIndex, endIndex, (err) => {
        if (err) handleError(res, err);
        filterComposite.moveFilter(startIndex, endIndex);
        res.json({ success: true });
    });
});

// ----- UPDATE -----
router.put('/:id', function(req, res) {
    const id = req.params.id;
    const { options, order, typeId } = req.body;
    const filter = { _id: id };
    if (options) { filter.options = options; }
    if (order) { filter.order = order; }
    if (typeId) { filter.typeId = typeId; }

    Filter.update(id, filter, (err) => {
        if (err) handleError(res, err);
        res.json({ success: true });
    });

    // note: changes to filter pipeline only after server restart!
});

// ----- DELETE -----
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Filter.delete(id, (err, data) => {
        if (err) handleError(res, err);
        filterComposite.removeFilter(id);
        res.json(data);
    });
});

module.exports = router;
