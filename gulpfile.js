var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
let cleanCSS = require('gulp-clean-css');
var includer = require('gulp-htmlincluder')
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('concat', function () {
  gulp.src('dev/css/*.css')
    .pipe(concatCss("styles.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('dev/**/*.html')
    	.pipe(includer())
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('default', function() {
	gulp.start('connect', 'html', 'concat');

	gulp.watch(['dev/**/*.html'], function(event) {
		gulp.start('html');
	});
	gulp.watch(['dev/css/**/*.css'], function(event) {
		gulp.start('concat');
	});
});