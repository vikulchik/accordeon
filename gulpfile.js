'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('gulp-jade'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    plumber = require('gulp-plumber');


/* --------- paths --------- */
var paths = {
    scss: {
        location: [
            'bower_components/normalize-scss/sass/_normalize.scss',
            'bower_components/normalize-scss/sass/_normalize.scss',
            'dev/scss/main.scss'
        ],
        destination: 'prod/css'
    },

    js: {
        location: [
            'bower_components/jquery/dist/jquery.js',
            'dev/js/modules/init.js'
        ],
        destination: 'prod/js'
    }
};


/* ----- jade ----- */
gulp.task('jade-compile', function() {
    gulp.src(['dev/jade/_pages/*jade'])
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('prod/'))
});


/* ------ sass ------ */
gulp.task('sass-compile', function() {
    gulp.src(paths.scss.location)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(['> 5%', 'last 5 versions', 'IE 9']))
        .pipe(rename("main.min.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scss.destination));
});


/* -------- concat js -------- */
gulp.task('concat-js', function() {
    return gulp.src(paths.js.location)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.destination));
});


/* -------- auto sprites  -------- */
gulp.task('sprite', function() {
    var spriteData = gulp.src('dev/img/icons/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            imgPath: '../img/sprite.png',
            cssName: 'sprite.scss'
        }));
    spriteData.img.pipe(gulp.dest('dev/img/'));
    spriteData.css.pipe(gulp.dest('dev/scss/'));
});


/* -------- images minification  -------- */
gulp.task('img-min', function() {
    return gulp.src('dev/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('prod/img'));
});


/* -------- gulp server  -------- */
gulp.task('server', function() {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'prod'
        }
    });
});


/* -------- gulp watching  -------- */
gulp.task('watch', function() {
    gulp.watch('dev/jade/**/*.jade', ['jade-compile']);
    gulp.watch('dev/scss/**/*.scss', ['sass-compile']);
    gulp.watch('dev/img/**/*', ['img-min']);
    gulp.watch('dev/js/modules/*.js', ['concat-js']);
    gulp.watch([
        'prod/**/*.html',
        'prod/js/**/*.js',
        'prod/css/**/*.css'
    ]).on('change', browserSync.reload);
});


gulp.task('default', [
    'jade-compile',
    'sass-compile',
    'concat-js',
    'server',
    'watch'
]);




