'use strict';

var eachOfSeries = require('async.eachofseries');

module.exports = function doSeries(fn) {
    return function (obj, iterator, cb) {
        return fn(eachOfSeries, obj, iterator, cb);
    };
};
