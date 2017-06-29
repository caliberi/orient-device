'use strict';

var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var gutil = require('gulp-util');

gulp.task('webpack', function() {
  return gulp.src('src/orient.js')
  .pipe(gulpWebpack( webpackConfig ))
  .pipe(gulp.dest('dist/'));
});

gulp.task('webpack:build', function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('default', ['webpack']);

gulp.task('build', ['webpack:build']);

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['webpack']);
});