var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config').scss;

gulp.task('scss', function () {
  return gulp.src(config.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.dest));
});
