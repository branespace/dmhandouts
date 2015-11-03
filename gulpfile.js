'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var lintableFiles = ['!node_modules/*/**', '**/*.js'];

gulp.task('jshint', function() {
  return gulp.src(lintableFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('jscs', function() {
  return gulp.src(lintableFiles)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('servertests', function() {
  return gulp.src('test/server/server_tests.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('lint', ['jshint', 'jscs']);
gulp.task('build');
gulp.task('tests', ['servertests']);
gulp.task('default', ['lint', 'build', 'tests']);
