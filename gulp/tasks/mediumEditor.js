var gulp = require('gulp');
var config = require('../config').mediumEditor;

gulp.task('mediumEditor', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
