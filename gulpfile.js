'use strict';

var gulp = require('gulp');
var path = require('path');
var fs = require('fs-extra');
var pkg = require('./package.json');
var jsonFuture = require('json-future');
var template = require('lodash.template');

var moduleDeps = JSON.parse(template(fs.readFileSync('./dependencies.json').toString())({
    version: pkg.version}
    ));

var MODULES_PATH = './util/';

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            var isDirectory = fs.statSync(path.join(dir, file)).isDirectory();
            return file !== 'node_modules' && isDirectory;
        });
}

function generatePackage(name) {

    function generateKeywords(name) {
        var keywords = [
            'async.util'
        ];

        keywords.push(name);
        return keywords;
    }

    function generateDefaultFields(name) {
        var ORIGINAL_FIELDS = [
            'author',
            'version',
            'repository',
            'license'
        ];

        var structure = {
            name: 'async.util.' + name,
            description: 'async ' + name + 'helper method as module.',
            main: './index.js',
            repository: "async-js/async.util." + name
        };

        ORIGINAL_FIELDS.forEach(function(field) {
            structure[field] = pkg[field];
        });

        if (Object.keys(moduleDeps[name]).length > 0)
            structure.dependencies = moduleDeps[name];

        return structure;
    }

    var modulePackage = generateDefaultFields(name);
    modulePackage.keywords = generateKeywords(name);
    return modulePackage;
}

function generateReadme(name, dist) {
    var filepath = path.resolve('module_template.md');
    var tpl = fs.readFileSync(filepath).toString();
    tpl = template(tpl)({name: name});
    fs.writeFileSync(dist, tpl);
}

function copyMetaFiles(dist) {
    var files = ['.editorconfig', '.jscsrc', '.jshintrc', '.gitignore'];

    files.forEach(function(file) {
        var metafile = path.resolve(file);
        var distFile = path.resolve(dist, file);
        fs.copySync(metafile, distFile);
    });
}

gulp.task('package', function() {
    return getFolders(MODULES_PATH).map(function(module) {
        var dist = path.resolve(MODULES_PATH, module);
        jsonFuture.save(path.resolve(dist, 'package.json'), generatePackage(module));
        generateReadme(module, path.resolve(dist, 'README.md'));
        copyMetaFiles(dist);
    });
});
