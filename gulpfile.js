"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local Dev server
var open = require('gulp-open'); // Open a URL in web browser

var config = {
	port: 9001,
	devBaseUrl: 'http:localhost',
	paths: {
		html: './src/*.html',
		css: './src/*.css',
		js: './src/*.js',
		dist: './dist'
	}
}

//Start a local Dev server
gulp.task('connect', function(){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	})
});

gulp.task('open', ['connect'], function(){
	gulp.src('dist/index.html').
	pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function(){
	gulp.src(config.paths.html)
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload());
});	

gulp.task('css', function(){
	gulp.src(config.paths.css)
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload());
});

gulp.task('js', function(){
	gulp.src(config.paths.js)
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload());
});	

gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.css, ['css']);
	gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ['html', 'css', 'js', 'open', 'watch']);