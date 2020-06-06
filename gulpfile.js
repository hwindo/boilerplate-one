const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const { parallel } = gulp;

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const presetenv = require('postcss-preset-env')
const terser = require('gulp-terser');
const mustache = require('gulp-mustache');


const path = {
    html: {
        folder: './src/template',
        src: './src/template/*.html',
        dest: './public',
        watch: './src/template/**/*.html',
        data: './src/template/data.json',
    },
    styles: {
        src: './src/*.scss',
        dest: './public/static/css',
    },
    scripts: {
        src: './src/*.js',
        dest: './public/static/js'
    },
    svg: {
        src: './src/**/*.svg'
    }
}

function styles() {
    return gulp.src(path.styles.src)
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([
            autoprefixer,
            presetenv,
            cssnano,
        ]))
        .pipe(gulp.dest(path.styles.dest))
        .pipe(browserSync.stream())
}

function reload(done) {
    browserSync.reload();
    done();
}

function buildHtml() {
    return gulp.src(path.html.src)
        .pipe(mustache( path.html.data, {
            extension: '.html'
        }, {}))
        .pipe(gulp.dest(path.html.dest))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: './public',
        // proxy: 'localhost:1234',
    });
    gulp.watch('./public/**/*.html', reload);
    gulp.watch(path.styles.src, styles);
    gulp.watch(path.html.watch, buildHtml)
}

gulp.task('sass', styles);
gulp.task('default', watch);

exports.build = parallel(styles, buildHtml);