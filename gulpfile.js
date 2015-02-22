var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    neat = require('node-neat'),
    deploy = require('gulp-gh-pages'),
    pkg = require('./package.json');

var paths = {
    styles: [
        './node_modules/normalize.css/normalize.css',
        './styles/app.scss'
    ]
};

gulp.task('deploy', ['styles'], function () {
    gulp.src('./public/**/*')
        .pipe(deploy(pkg.repository.url));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass({
            includePaths: ['./styles'].concat(neat.includePaths)
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/design'));
});

gulp.task('watch', function () {
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['styles', 'watch']);
