var gulp = require('gulp')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var less = require('gulp-less')
var cssClean = require('gulp-clean-css')
var htmlMin = require('gulp-htmlmin')
var livereload = require('gulp-livereload')


// 压缩js文件
gulp.task('js',function () {
  return gulp.src('src/js/*.js')    //文件路径(……js/**/*.js),找到目标源文件，将数据读取到gulp内存中
    .pipe(concat('build.js'))       //临时合并文件
    .pipe(gulp.dest('dist/js/'))    //临时输出文件到本地
    .pipe(uglify())                 //压缩js文件
    .pipe(rename({suffix:'.min'}))  //重命名，设置后缀名
    .pipe(gulp.dest('dist/js/'))    //输出压缩文件
    .pipe(livereload())             //实时刷新
})

// 编译less文件
gulp.task('less',function () {
  return gulp.src('src/less/*.less')
    .pipe(less())                     //编译less文件为css
    .pipe(gulp.dest('src/css/'))      //将编译好的css文件输出到css文件夹
    .pipe(livereload())             //实时刷新

})

// 压缩css文件
gulp.task('css',function () {
  return gulp.src('src/css/*.css')
    .pipe(concat('style.css'))
    .pipe(cssClean({compatiblity:'ie8'}))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload())             //实时刷新
})

// 压缩html文件
gulp.task('html',function () {
  return gulp.src('index.html')
    .pipe(htmlMin({collapseWhitespace:true}))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload())             //实时刷新
})

gulp.task('default',gulp.series('js','less','css','html'))

// 注册监视任务
gulp.task('watch',gulp.series('default'),function () {
  // 开启监听
  livereload.listen();
  // 确认监听的目标以及绑定相应的任务
  gulp.watch('src/js/*.js',['js']);
  gulp.watch(['src/css/*.css','src/less/*.less'],['css'])

})

