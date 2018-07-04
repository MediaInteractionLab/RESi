const express = require('express');

const router = express.Router();


// -------------------------------
// ---------- Get Ports ----------
// -------------------------------

router.get('/dimensions', function(req, res) {
    res.json({ cols: 6, rows: 6 });
});

module.exports = router;
