'use strict';

var restParam = require('async.util.restparam');
var arrayEach = require('async.util.arrayeach');

module.exports = function consoleFn(name) {
    return restParam(function(fn, args) {
        fn.apply(null, args.concat([restParam(function(err, args) {
            if (typeof console === 'object') {
                if (err) {
                    if (console.error) {
                        console.error(err);
                    }
                } else if (console[name]) {
                    arrayEach(args, function(x) {
                        console[name](x);
                    });
                }
            }
        })]));
    });
};
