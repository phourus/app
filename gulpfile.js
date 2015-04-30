'use strict';

var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

//process.env.NODE_ENV = 'production';

gulp.task('javascript', function() {

  var bundler = browserify({
    entries: ['./src/browser.js'],
    debug: true
  })
  .transform(babelify)
  //.exclude('react')
  //.exclude('socket.io-client');

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      //.pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
      //.pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/'))
  };

  return bundle();
});

gulp.task('css', function () {
  gulp.src('./src/less/style.less')
    .pipe(less())
    //.pipe(cssmin())
    .pipe(gulp.dest('./build/'))
});

gulp.task('copy', function () {
   gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./build'))
   gulp.src('./assets/**/*')
    .pipe(gulp.dest('./build/assets'))
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['javascript']);
    gulp.watch('./src/less/**/*.less', ['css']);
    gulp.watch('./src/html/*.html', ['copy']);
    gulp.watch('./assets/**/*', ['copy']);
});

gulp.task('default', ['watch', 'javascript', 'css', 'copy']);
//gulp.task('watch', ['watch']);
//gulp.task('preprocess', ['jshint', 'csslint']);
