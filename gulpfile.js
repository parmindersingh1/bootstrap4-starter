var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass =  require('gulp-sass')

gulp.task('compile-sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())// injection to browser
})

gulp.task('move-js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 
    'node_modules/tether/dist/js/tether.min.js', 
    'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())// injection to browser
})

// run sass when server runs
// run server
// watch for any changes in src/scss folder and reload the browser
// watch for html changes
gulp.task('launch-server', gulp.series(['compile-sass'], function(){
    browserSync.init({
        server: './src'
    })
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],gulp.parallel(
    ['compile-sass']))
    gulp.watch('src/*.html').on('change', browserSync.reload)
}))

// run gulp
//launch server and browser
// execute js task
gulp.task('default', gulp.parallel('move-js', 'launch-server'))