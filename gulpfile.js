var gulp = require('gulp'),
    less = require('gulp-less'),
    gls = require('gulp-live-server'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    minifyCss = require('gulp-minify-css'),
    fileinclude  = require('gulp-file-include'),
    babel = require("gulp-babel");
// jshint = require('gulp-jshint');

var buildLess = function (rootPath, dev) {
    if (dev) {
        gulp.src(['./src/style/**/*.less'])
            .pipe(less())
            .pipe(minifyCss())
            .pipe(gulp.dest(rootPath + '/style'));
    }
};
var buildIncluedFile = function (rootPath, dev) {
    if (dev) {
        gulp.src(['views/**/*.html','!views/include/**.html'])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(rootPath + '/views'));
    }
};
var copyFile = function (rootPath, dev) {

    if (dev) {
        gulp.src([
            './src/**/*.*',
            '!./src/libs/**/*.*',
            '!./src/js/**/*.*',
            '!./src/style/**/*'
        ])
            .pipe(gulp.dest(rootPath+''));

        gulp.src([
            './src/js/*',
        ])
            // .pipe(babel())
            .pipe(gulp.dest(rootPath+'/js'));

        gulp.src([
            './src/libs/**/*'
        ])
            .pipe(gulp.dest(rootPath+'/libs'));

    }else{
        /*gulp.src([
            './src/!*.js'
        ])
            .pipe(babel())
            .pipe(gulp.dest(rootPath));*/
        gulp.src([
            './src/libs/**/*.*'
        ])
            .pipe(gulp.dest(rootPath+'/libs'));

        gulp.src([
            './src/imgs/**/*.*'
        ])
            .pipe(gulp.dest(rootPath+'/imgs'));

    }
};

var js = function (rootPath, dev) {
    if (dev) {
        gulp.src('./src/**/*')
            // .pipe(babel())
            .pipe(jshint())
            .pipe(jshint.reporter('default',{verbose:true}))
            .pipe(gulp.dest(rootPath));
    } else {
        /*
        gulp.src(['./src/!**!/!*.js','!./src/libs/!**!/!*.js','!./src/app.js','!./src/constants.js','!./src/route.js','!./src/directives/asyncTree/asyncTree.directive.js']).pipe(concat('main.js')).pipe(uglify()).pipe(gulp.dest('./build/js'));
        */
        gulp.src(['./src/js/*.js']).pipe(babel()).pipe(uglify()).pipe(gulp.dest('./build/js'));
        // gulp.src(['./src/js/*.js']).pipe(babel()).pipe(uglify()).pipe(gulp.dest('./build/js'));
    }
};


var buildHtml = function (rootPath, dev){
    if(dev) {

    }else{
        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true//压缩HTML
        };
        gulp.src('./src/views/**/*.html')
            .pipe(htmlmin(options))
            .pipe(gulp.dest(rootPath+'/views/'));
    }
};

// gulp.task('buildHtml',buildHtml('./build',false));

gulp.task('default', function () {

    var rootPath = './build';
    var server = gls.static(rootPath, 5000);

    // js(rootPath, false);
    buildLess(rootPath, true);
    // htmlmin(rootPath,false);
    copyFile(rootPath, true);



    gulp.watch(['./src/**/*.*'], function (file) {

        // js(rootPath, false);
        buildLess(rootPath, true);
        buildIncluedFile(rootPath, true);
        // htmlmin(rootPath,false);
        copyFile(rootPath, true);
        console.log(new Date());
        server.notify.apply(server, [file]);

    });
    server.start();
});

gulp.task('build', function () {

    var rootPath = './build';
    var server = gls.static(rootPath, 5000);

    js(rootPath, false);
    buildLess(rootPath, true);
    buildIncluedFile(rootPath, true);
    buildHtml(rootPath,false);
    copyFile(rootPath, false);
    gulp.watch(['./src/**/*'], function (file) {

        buildLess(rootPath, true);
        buildIncluedFile(rootPath, true);
        buildHtml(rootPath,false);
        copyFile(rootPath, false);
        server.notify.apply(server, [file]);

    });
    server.start();
});

