'use strict';
var express = require('express');
var app = express();
var fs = require('fs');

app.get('/api/charts', function(req, res) {
    var charts = JSON.parse(fs.readFileSync(__dirname + '/charts.json', 'utf8'));
    res.json(charts);
});

app.get('/api/charts/:id', function(req, res) {
    var charts = JSON.parse(fs.readFileSync(__dirname + '/charts.json', 'utf8'));
    // it'd better to use array.prototype.find polyfill. maybe.
    var filtered = charts.filter(function(chart) {
        return chart.id === req.params.id;
    });
    // I believe that id is unique
    res.json(filtered[0]);
});


module.exports = app;
