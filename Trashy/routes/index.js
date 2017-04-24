var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/trends', function(req, res) {
    res.render('trends');
});

module.exports = router;
