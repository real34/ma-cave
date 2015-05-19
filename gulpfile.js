// var gulp = require('gulp'),
//     concat = require('gulp-concat'),
//     sass = require('gulp-sass'),
//     neat = require('node-neat'),
//     deploy = require('gulp-gh-pages'),
//     copy = require('gulp-copy'),
//     pkg = require('./package.json');

// var paths = {
//     styles: [
//         './node_modules/normalize.css/normalize.css',
//         './node_modules/font-awesome/css/font-awesome.css',
//         './styles/app.scss'
//     ]
// };

// gulp.task('deploy', ['styles'], function () {
//     gulp.src('./public/**/*')
//         .pipe(deploy(pkg.repository.url));
// });

// gulp.task('styles', ['fonts'], function () {
//     return gulp.src(paths.styles)
//         .pipe(sass({
//             includePaths: ['./styles'].concat(neat.includePaths)
//         }))
//         .pipe(concat('app.css'))
//         .pipe(gulp.dest('./public/design'));
// });

// gulp.task('fonts', function () {
//     return gulp.src('./node_modules/font-awesome/fonts/*')
//         .pipe(copy('./public', { prefix: 2 }));
// });

// gulp.task('watch', function () {
//     gulp.watch(paths.styles, ['styles']);
// });

// gulp.task('default', ['styles', 'watch']);
