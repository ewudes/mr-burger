"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var csso = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var htmlmin = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var del = require("del");
var include = require("posthtml-include");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var server = require("browser-sync").create();

gulp.task("clean", function () {
  return del("dist/**");
});

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/*.ico"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("dist"));
});

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("dist/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream());
});

gulp.task("script-min", function() {
  return gulp.src("src/js/**/*.js")
  .pipe(gulp.dest("dist/js"))
  .pipe(uglify())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("dist/js"));
});

gulp.task("sprite", function () {
  return gulp.src("src/img/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("dist/img"));
});

gulp.task("html", function () {
  return gulp.src("src/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(htmlmin({
    minifyJS: true,
    minifyURLs: true,
    collapseWhitespace: true,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true
  }))
  .pipe(sourcemap.write())
  .pipe(gulp.dest("dist"))
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("dist/img"));
});

gulp.task("webp", function () {
  return gulp.src("src/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("dist/img"));
});

gulp.task("server", function () {
  server.init({
    server: "dist/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.{sass,scss}", gulp.series("css"));
  gulp.watch("src/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("src/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "images",
  "webp",
  "css",
  "script-min",
  "sprite",
  "html"
  ));
gulp.task("start", gulp.series("build", "server"));
