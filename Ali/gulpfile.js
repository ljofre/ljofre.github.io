

//automatizar tareas
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    html2jade = require('gulp-html2jade'),
    jade = require('gulp-jade'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    http = require('http'),
    st = require('st'),
    livereload = require('gulp-livereload'),
    prettify = require('gulp-html-prettify');

var options = {nspaces:2};

//tarea por defecto
gulp.task('html2jade', function(){
    gulp.src('dist/html/*.html')
        .pipe(html2jade(options))
        .pipe(gulp.dest('templates/jade'));
});

gulp.task('jade2html', function(){

    gulp.src('templates/jade/*.jade')
        .pipe(plumber())
        .pipe(jade())
        .pipe(prettify({indent_char: ' ', indent_size: 2}))
        .pipe(gulp.dest('dist/html/'))
        .pipe(livereload());

        //formatear el html luego y volver a convertir ese html en jade
})

gulp.task('watch',['server'], function(){
    livereload.listen({basePath: 'dist/html'});
    gulp.watch('templates/jade/*.jade', ['jade2html']);
});

//generar servidor estatico http
gulp.task('server', function(done){
    http.createServer(
        st({
            path: __dirname + '/dist',
            index: 'html/index.html',
            cache: false
        })
    ).listen(3000,done)
})

gulp.task('default', ['watch']);
