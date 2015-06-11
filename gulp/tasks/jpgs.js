var gulp = require('gulp');
var config = require('../config').jpgs;

gulp.task('jpgs', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});