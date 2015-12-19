'use strict';

var map = require('async.util.map');

module.exports = function range(count) {
    return map(new Array(count), function(v, i) {
        return i;
    });
};
