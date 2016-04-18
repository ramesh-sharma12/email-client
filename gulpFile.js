var gulp = require('gulp'),
    less = require('gulp-less'),
     inject = require('gulp-inject'),
     watch = require('gulp-watch'),
    del = require('del'),
    path = require('path'),
     join = path.join,
     server = require('gulp-express'),
    runSequence = require('run-sequence'),
    connect = require('gulp-connect'),
    webpack = require('webpack'),
    gulpWebpack = require('webpack-stream');

// Configuration.
var APP_BASE = '/';
var dir = {
        dest: {
            all: 'build',
            libs: 'build/libs',
            css: 'build/contents/css',
            contents: 'build/contents/'
        },
        src : {
          all:'./app/**/**.*',
          html : './app/src/**/*.html',
          contents : './app/contents/**/*.*',
          scripts:'./app/src/**/*.ts',
          less:'./app/**/*.less'
        }
      };

var util = {
   transformPath: function (env)
    {
        var v = '?v=1.0.0';
        return function (filepath)
        {
            var filename = filepath.replace('/' + dir.dest.all, '') + v;
            arguments[0] = join(APP_BASE, filename);
            return inject.transform.apply(inject.transform, arguments);
        };
    }
};

gulp.task('clean', function (done)
{
    del(dir.dest.all, done);
});

gulp.task('connect', function() {
  connect.server({
    root: ['./build'],
    port: 3001,
    livereload: true
  });
});

gulp.task('less', function (done)
{
    return gulp.src('app/src/**/*.less')
        .pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')]
    }))    
    .pipe(gulp.dest(dir.dest.css))
    .pipe(connect.reload(), done );
});

gulp.task('js', function(done) {
	return gulp.src('app/src/boot.ts')
    .pipe(gulpWebpack(require('./webpack.config.js')))   
    .pipe(gulp.dest(dir.dest.all))
    .pipe(connect.reload(), done );
});

gulp.task('libs', function () {
    var target = gulp.src('./app/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(['./build/libs/**/*.css', 
      './build/contents/css/*.css' , 
      'build/src/libs/**/*.js'], { read: false });

    return target.pipe(inject(sources, { transform: util.transformPath() }))
      .pipe(gulp.dest(dir.dest.all));
});

gulp.task('index', ['copy','js','less'],function (done) {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([
    './build/libs/bootstrap/*.css',
    './build/libs/ng2-bootstrap/*.css',
    './build/libs/ckeditor/contents.css',
   './build/contents/css/**/*.css', 
    'build/src/libs/ckeditor/ckeditor.js',
    'build/src/libs/ng2-ckeditor/ckeditor.js'
    ], { read: false });
 
  return target.pipe(inject(sources, { transform: util.transformPath() }))
    .pipe(gulp.dest(dir.dest.all))
    .pipe(connect.reload(), done );
});

gulp.task('bower-copy', function (done) {
    gulp.src('./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js').pipe(gulp.dest(dir.dest.libs + '/angular-bootstrap'));
    gulp.src('./bower_components/angular-bootstrap/ui-bootstrap-csp.css').pipe(gulp.dest(dir.dest.libs + '/angular-bootstrap'));
    gulp.src('./bower_components/angular-ui-grid/*.*').pipe(gulp.dest(dir.dest.libs + '/angular-ui-grid'));

    return gulp.src('./bower_components/angular-ui-tree/dist/*.*')
        .pipe(gulp.dest(dir.dest.libs + '/angular-ui-tree'), done);

});

gulp.task('node-copy', function (done) {
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css').pipe(gulp.dest(dir.dest.libs + '/bootstrap'));
    gulp.src('./node_modules/bootstrap/dist/fonts/*.*').pipe(gulp.dest(dir.dest.libs + '/fonts'));
    gulp.src('./node_modules/bootstrap/dist/fonts/*.*').pipe(gulp.dest(dir.dest.contents + '/fonts')); 
    gulp.src('./node_modules/ckeditor/**/*.*').pipe(gulp.dest(dir.dest.libs + '/ckeditor/')); 
    gulp.src('./node_modules/ckeditor/**/*.*').pipe(gulp.dest(dir.dest.libs + '/ng2-ckeditor/'));  
    gulp.src('./node_modules/ng2-ckeditor/lib/*.*').pipe(gulp.dest(dir.dest.libs + '/ng2-ckeditor/'));

   return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css.map')
   .pipe(gulp.dest(dir.dest.libs + '/bootstrap'), done);

});

gulp.task('copy', function (done) {
       return gulp.src([dir.src.html, dir.src.contents], {
      base: './app'
    })
    .pipe(gulp.dest(dir.dest.all))
    .pipe(connect.reload(), done );
});

gulp.task('watch', function (){
    watch(['!./app/src/**/**.ts', dir.src.all], function(){
      runSequence('copy');
    });

    watch(dir.src.scripts, function(){
      runSequence('js');
    });

    watch(dir.src.less, function(){
        runSequence('less');
    });
});

gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['./dist/boot.js']);

    watch(['!./app/src/**/**.ts', dir.src.all], function(){
      runSequence('copy');
    });

    watch(dir.src.scripts, function(){
      runSequence('js');
    });

    watch(dir.src.less, function(){
        runSequence('less');
    });     
});

gulp.task('build', ['index']);

gulp.task('build-all', ['node-copy', 'index'])
;
gulp.task('default', ['build', 'connect'], function() { 
    gulp.watch(['!./app/src/**/**.ts', dir.src.all], ['copy']);
    gulp.watch(dir.src.scripts, ['js']);
    gulp.watch(dir.src.less, ['less']);
});
