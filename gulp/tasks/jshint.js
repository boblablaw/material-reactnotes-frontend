var gulp = require('gulp');
var shell = require('gulp-shell');
var handleErrors = require('../util/handleErrors');

gulp.task('jshint', shell.task([
  './node_modules/.bin/jsxhint --harmony'
])).on('error', handleErrors);