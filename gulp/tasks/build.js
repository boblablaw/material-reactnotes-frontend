var gulp = require('gulp');

gulp.task('build', ['browserify', 'markup', 'mediumEditor', 'fontIcons', 'css']);
