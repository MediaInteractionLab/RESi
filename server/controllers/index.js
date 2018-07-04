const express = require('express');
const path = require('path');
const gestureController = require('./gestures');
const dataController = require('./data');
const filterController = require('./filter');
const triggerController = require('./triggers');
const settingsController = require('./settings');

const PUBLIC_DIR = __dirname + '/../public';
const router = express.Router();

router.use('/gesture', gestureController);
router.use('/data', dataController);
router.use('/filter', filterController);
router.use('/trigger', triggerController);
router.use('/settings', settingsController);

// default route: send index.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

module.exports = router;
