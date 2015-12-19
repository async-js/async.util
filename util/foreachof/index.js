'use strict';

var keys = require('async.util.keys');
var arrayEach = require('async.util.arrayeach');

module.exports = function forEachOf(object, iterator) {
    arrayEach(keys(object), function(key) {
        iterator(object[key], key);
    });
};
