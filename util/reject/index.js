'use strict';

var filter = require('async.util.filter');

module.exports = function reject(eachfn, arr, iterator, callback) {
    filter(eachfn, arr, function(value, cb) {
        iterator(value, function(v) {
            cb(!v);
        });
    }, callback);
};
