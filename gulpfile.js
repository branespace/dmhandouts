'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var Karma = require('karma').Server;

var lintableFiles = ['!node_modules/*/**', '!**/*bundle.js', '**/*.js'];
var staticFiles = ['app/**/*.html',
                   'app/**/*.svg',
                   'app/**/*.jpg',
                   'app/**/*.png'
                  ];

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

gulp.task('staticfiles', function() {
  return gulp.src(staticFiles)
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', function() {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('webpack:pro', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('webpack:test', function() {
  return gulp.src('./test/client/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('./test/client'));
});

gulp.task('karmatests', ['webpack:test'], function(done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('watch', function() {
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/**/*.js', ['webpack:pro']);
  gulp.watch(staticFiles, ['staticfiles']);
});

gulp.task('lint', ['jshint', 'jscs']);
gulp.task('build:pro', ['staticfiles', 'sass', 'webpack:pro']);
gulp.task('tests', ['servertests', 'karmatests']);
gulp.task('default', ['lint', 'build:pro', 'tests']);
