var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/monthly-trends', function(req, res) {
    res.render('monthly-trends');
});

router.get('/weekly-trends', function(req, res) {
    res.render('weekly-trends');
});

router.get('/daily-trends', function(req, res) {
    res.render('daily-trends');
});

module.exports = router;
