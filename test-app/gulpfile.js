'use strict';

var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var http = require("http");
var replace = require('gulp-replace');

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
var errorHandler = function (title) {
    'use strict';

    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};

gulp.task('styles', function () {
    return buildStyles();
});

var buildStyles = function () {
    var sassOptions = {
        style: 'expanded',
        includePaths: ['node_modules/']
    };

    return gulp.src([
            path.join(__dirname, '/src/app/style.scss')
        ])
        .pipe(sourcemaps.init())
        .pipe(replace('~ionic-sdk/release/fonts', 'fonts'))
        .pipe(replace('~', 'node_modules/'))
        .pipe(sass(sassOptions)).on('error', errorHandler('Sass'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(__dirname, '/www/')));
};

gulp.task('styles:reload', ['styles'], function(done) {
    http.get({
        hostname: 'localhost',
        port: 8080,
        path: '/__browser_sync__?method=reload&args=style.css',
        agent: false  // create a new agent just for this one request
    }, function (res) {
        done();
    });
});

gulp.task('copy:fonts', function() {
    return gulp.src('node_modules/ionic-sdk/release/fonts/*')
        .pipe(gulp.dest('www/fonts'));
});

gulp.task('copy:assets', function() {
    return gulp.src('src/app/asset*/**/*')
        .pipe(gulp.dest('www'));
});

gulp.task('watch', ['styles', 'copy:assets', 'copy:fonts'], function () {

    gulp.watch([
        path.join(__dirname, '/src/app/**/*.scss')
    ], function (event) {
        gulp.start('styles:reload');
    });
});
