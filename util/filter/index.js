'use strict';

var map = require('async.util.map');

module.exports = function filter(eachfn, arr, iterator, cb) {
    var results = [];
    eachfn(arr, function(x, index, cb) {
        iterator(x, function(v) {
            if (v) {
                results.push({
                    index: index,
                    value: x
                });
            }
            cb();
        });
    }, function() {
        cb(map(results.sort(function(a, b) {
            return a.index - b.index;
        }), function(x) {
            return x.value;
        }));
    });
};
