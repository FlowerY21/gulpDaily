# Gulp日常学习

https://www.cnblogs.com/wangyihong/p/9323032.html



https://www.gulpjs.com.cn/docs/getting-started/



## 特点

* 任务化
* 数据流

## 安装

* 全局安装
  * npm install --g gulp
* 作为项目的开发依赖
  * npm install --save-dev gulp

## gulp重要API

* gulp.task()——新建任务
* gulp.src()——获取文件源地址
* gulp.dest()——文件输出地址
* gulp.run()——运行任务
* gulp.watch()——监听文件修改



## gulp常用插件

* gulp-concat		合并文件（js/css）
* gulp-uglify 		压缩js文件
* gulp-rename		文件重命名
* gulp-less		编译less
* gulp-clean-css	压缩css
* gulp-livereload	实时自动编译刷新

## 流程

* 目录结构

  > 控制台输入gulp的时候首先找寻gulpfile.js文件，在找寻default任务，所以我们应该手动新建一个名为gulpfile.js的js文件，将任务写在里面 
  * dist/
  * src/
    * less/
    * sass/
    * css/
    * js/
    * images/
  * gulpfile.js

* 下载插件并注册

  * 下载插件

    * npm install 插件名 --save-dev

  * 注册插件

    ![微信截图_20190130141806](C:\Users\Administrator\Desktop\微信截图_20190130141806.png)

* 编写 gulpfile.js 文件

  ![1548667895027](C:\Users\ADMINI~1\AppData\Local\Temp\1548667895027.png)	

* 批量压缩js文件

  ![微信截图_20190130141822](C:\Users\Administrator\Desktop\微信截图_20190130141822.png)





## 遇到的坑

* 运行gulp项目报错：AssertionError: Task function must be specified。

  ​	https://blog.csdn.net/qq_31975963/article/details/83034450

  * gulp3 vs gulp4

    * Gulp3，如果有一个任务A，B和C的列表，你想在一个序列中运行（确保A在B开始之前完成，而B在C开始之前完成），代码如下：

      ```js
      gulp.task('a', function () {
        // Do something.
      });
      gulp.task('b', ['a'], function () {
        // Do some stuff.
      });
      gulp.task('c', ['b'], function () {
          // Do some more stuff.
      });
      ```

    * 不要用Gulp3的方式指定依赖任务，你需要使用gulp.series和gulp.parallel，因为gulp任务现在只有两个参数。

      gulp.series：按照顺序执行
      gulp.paralle：可以并行计算

```js
gulp.task('my-tasks', gulp.series('a', 'b', 'c', function() {
// Do something after a, b, and c are finished.
}));

gulp.task('build', gulp.parallel('styles', 'scripts', 'images', function () {
// Build the website.
}));

或者这样

gulp.task('my-tasks', gulp.series('a', gulp.parallel('styles','scripts', 'images'), 'b', 'c', function() {
// Do something after a, b, and c are finished.
}));
```







​	