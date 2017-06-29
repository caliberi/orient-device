'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack', function() {
  return gulp.src('src/orient.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['webpack']);

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['webpack']);
});