/// <binding BeforeBuild='min' Clean='clean' ProjectOpened='copyNpmDependenciesOnly' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    less = require('gulp-less'),
    path = require('path'),
    watch = require('gulp-watch'),
    gnf = require("gulp-npm-files");

var webroot = "./wwwroot/";
var nodeRoot = "./node_modules/";


var paths = {
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css",

    lessFiles: webroot + "app/**/*.less"
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["compile-less", "min:js", "min:css"]);

gulp.task('copyNpmDependenciesOnly', function () {
    gulp.src(gnf(), { base: './' }).pipe(gulp.dest(webroot+"/lib"));
});

gulp.task('compile-less', function () {
    return gulp.src(paths.lessFiles)
      .pipe(less())
      .pipe(gulp.dest(webroot+'app/.'));
});

gulp.task('watch-less', function () {
    return gulp.watch(paths.lessFiles, ['compile-less']);
});