var gulp       = require('gulp'),
	sass       = require('gulp-sass'),
	cssnano    = require('gulp-cssnano'),
	concat     = require('gulp-concat'),
	prefix     = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify     = require('gulp-uglify'),
	imagemin   = require('gulp-imagemin'),
    cache      = require('gulp-cache');

var browserSync = require('browser-sync').create(),
	reload      = browserSync.reload;


var browserSyncOptions = {
    proxy: "http://localhost:8888/html5/",
    /* "localhost/blank_wp/" */
    notify: false
};

var browserSyncWatchFiles = [
	'./styles/css/*.css',
	'./js/dist/*.min.js',
	'./templates/*.php',
	'./*.php'
];

gulp.task('default', ['sass','scripts','browser-sync','watch']);

gulp.task('sass', function() {
	return gulp.src('styles/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
			errLogToConsole: true
		}))
		.pipe(prefix())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('styles/css'))
		.pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
	return gulp.src('js/src/**/*.js')
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/dist'));
});

gulp.task('browser-sync', function() {
	browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});

gulp.task('watch', function() {
	gulp.watch('styles/sass/**/*.scss', ['sass']);
	gulp.watch('js/src/**/*.js', ['scripts']);
});

gulp.task('images', function(){
  return gulp.src('img/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});
