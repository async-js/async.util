'use strict';

var eachOfLimit = require('async.util.eachoflimit');

module.exports = function doParallelLimit(fn) {
    return function(obj, limit, iterator, cb) {
        return fn(eachOfLimit(limit), obj, iterator, cb);
    };
};
