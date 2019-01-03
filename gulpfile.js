var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    wait = require('gulp-wait'),
    clean = require('gulp-clean'),
    browsersync = require('browser-sync').create(),
    php = require('gulp-connect-php'),
    svgSprite = require('gulp-svg-sprites'),
    runSequence = require('run-sequence'),
    cleanCSS = require('gulp-clean-css'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename');
 

// Delete the DIST directory
gulp.task('clean:dist', function () {
    return gulp.src([
        './dist/index.html',
        './dist/contact.php',
        './dist/assets/css/main.css',
        './dist/assets/fonts/font-awesome.min.css',
        './dist/assets/img/*.{png,jpg}',
        './dist/assets/img/svg/symbols.svg',
        './dist/assets/img/skills/symbols.svg',
        './dist/assets/js/**/*.js',
        './dist/assets/php/**/*.*',
        './dist/**/*.json',
        './dist/favicon.ico'
    ])
        .pipe(clean());
});

//Copy files to DIST directory
gulp.task('copy', function () {
    return gulp.src([
        './src/index.html',
        './src/assets/css/main.css',
        './src/assets/fonts/font-awesome.min.css',
        './src/assets/img/*.{png,jpg}',
        './src/assets/img/svg/symbols.svg',
        './src/assets/img/skills/symbols.svg',
        './src/assets/img/works/*.*',
        './src/assets/js/**/*.js',
        './src/assets/php/**/*.*',
        './src/*.json',
        './src/favicon.ico'
    ],
        { base: './src/' })
        .pipe(gulp.dest('./dist/'));
});


gulp.task('styles', function () {
    gulp.src('./src/assets/css/main.sass')
        .pipe(wait(500))
        .pipe(sass({
            precision: 10,
            indentedSyntax: true
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(browsersync.stream());
});

// Run PHP files
gulp.task('php', function() {
    php.server({
        base: 'src',
        port: 8010,
        keepalive: true
    });
});

gulp.task('browsersync',['php'], function() {
    browsersync.init({
        proxy: '127.0.0.1:8010',
        port: 8080,
        injectChanges: false,
        open: true,
        notify: true   
    });

    gulp.watch('src/index.php').on('change', browsersync.reload);
    gulp.watch('src/assets/css/**/*.sass', ['styles']);
    gulp.watch('src/index.html').on('change', browsersync.reload);
    gulp.watch('src/**/*.php').on('change', browsersync.reload);
    gulp.watch('src/assets/js/**/*.js').on('change', browsersync.reload);
});


// Delete symbols.svg
gulp.task('clean:symbols', function () {
    return gulp.src([
            './src/assets/img/svg/symbols.svg',
            './src/assets/img/skills/symbols.svg'
        ])
        .pipe(clean());
});

gulp.task('sprites', function () {
    return gulp.src([
        'src/assets/img/svg/*.svg',
        'src/assets/img/skills/*.svg'
    ])

        .pipe(svgSprite({
            mode: 'symbols',
            preview: false
        }))
        .pipe(gulp.dest('src/assets/img'));
});

gulp.task('default', function (done) {
    runSequence('styles', 'clean:symbols', 'sprites', 'browsersync');
});


gulp.task('dist', function (done) {
    runSequence('clean:dist', 'copy');
});