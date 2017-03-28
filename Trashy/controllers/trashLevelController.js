var trashLevel = require('../models/trashLevel');

exports.index = function(req, res, next) {
    trashLevel.find(function(err, data) {
        if (err) return next(err);
        res.json(data);
    });    
};

// list all data points
exports.level_list = function(req, res, next) {
    res.send('Not implemented: level_list');
};

// create a data point from post
exports.level_create = function(req, res, next) {
    trashLevel.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

