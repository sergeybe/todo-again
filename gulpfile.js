var pkg = require('./package.json');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var rename =  require('gulp-rename');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var gutil = require('gulp-util');
var rjs = require('requirejs');

var swallowError = function(error) {
  console.log(error.toString());
  this.emit('end');
};

/* Linting */

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe(jscs());
});

/* Resources */

gulp.task('scss', function() {
  gulp.src([
    './scss/app.scss',
  ])
    .pipe(sass({
      style: 'compressed',
      errLogToConsole: true
    }).on('error', gutil.log))
    .pipe(concat('app.css'))
    .pipe(autoprefixer({
      browsers: ['> 1%'],
      cascade: false
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('./static/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(gulp.dest('./static/'));
});

/* Sources */

gulp.task('js', function(cb) {
  return rjs.optimize({
    baseUrl: './src',
    almond: true,
    out: './static/app.js',
    include: './app',
    mainConfigFile: './src/main.js',
    enforceDefine: true,
    name: '../bower_components/almond/almond',
    generateSourceMaps: true,
    preserveLicenseComments: false,
    optimize: 'uglify2'
  },
  function(buildResponse) {
    console.log('build response', buildResponse);
    cb();
  });
});

gulp.task('build', ['scss', 'js']);

/* Static server */

var liveReloadSCSS = function() {
  var server = livereload(32882);
  gulp.watch('./scss/*.scss', function(evt) {
    server.changed(evt.path);
  });
};

var liveReloadCSS = function() {
  var server = livereload(32882);
  gulp.watch('./static/app.css', function(evt) {
    server.changed(evt.path);
  });
};

var liveReloadJS = function() {
  var javascriptServer = livereload(32883);
  gulp.watch(['./src/**'], function(evt) {
    javascriptServer.changed(evt.path);
  });
};

var serveStatic = require('serve-static');
var connect = require('connect');
var serverAddress = 'http://' + pkg.gulp.server.host + ':' + pkg.gulp.server.port + '/';

gulp.task('server', function() {
  connect()
    .use(serveStatic(__dirname))
    .listen(pkg.gulp.server.port);
  gutil.log('Connect server running at ' + serverAddress);
});

gulp.task('watch', function() {
  liveReloadCSS();
  liveReloadJS();
  gulp.watch('scss/*.scss', ['scss'])
    .on('error', swallowError);
  gulp.watch('src/**/*.js', ['js'])
    .on('error', swallowError);
});

gulp.task('default', ['build', 'watch', 'server']);
