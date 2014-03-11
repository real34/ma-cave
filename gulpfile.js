var gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat'),
    livereload = require('gulp-livereload');

gulp.task('styles', function () {
    return gulp.src('./styles/app.scss')
        .pipe(sass({
            includePaths: ['./styles'].concat(neat.includePaths)
        }))
        .pipe(gulp.dest('./public/design'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    gulp.watch('styles/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'watch']);