const 
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del')

    gulp.task('images', function () {
        return gulp.src('./src/images/**/*.*')
          .pipe(gulp.dest('./dist/images'))
    })

    gulp.task('fonts', function() {
        return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts'))
    });

    gulp.task('sass', function () {
        return gulp.src('./src/sass/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(autoprefixer())
          .pipe(sourcemaps.init())
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('./dist/css'))
          .pipe(browserSync.stream())
    })

    gulp.task('css', function () {
        return gulp.src('./src/css/**/*.css')
          .pipe(autoprefixer())
          .pipe(sourcemaps.init())
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('./dist/css'))
          .pipe(browserSync.stream())
    })

    gulp.task('html', function () {
        return gulp.src('./src/html/**/*.html')
        //   .pipe(htmlmin({ collapseWhitespace: true }))
          .pipe(gulp.dest('./dist'))
          .pipe(browserSync.stream())
    })

    gulp.task('js', function () {
        return gulp.src('./src/js/**/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('./dist/js'))
          .pipe(browserSync.stream())
    })
    
    gulp.task('watch', function() {

        browserSync.init({
            server: "./dist"
        })

        gulp.watch('./src/sass/**/*.scss', gulp.series('sass'))
        gulp.watch("./src/html/**/*.html", gulp.series('html'))
        gulp.watch("./src/css/**/*.css", gulp.series('css'))
        gulp.watch("./src/js/**/*.js", gulp.series('js'))
    })

    gulp.task('clean', done => {
        del.sync('./dist')
        done()
    })

    gulp.task('build', gulp.series('clean', 'js', 'html', 'images', 'fonts', 'css', 'sass'), done => {
        done()
    })