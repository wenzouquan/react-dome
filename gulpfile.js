var gulp = require('gulp');
var rename = require('gulp-rename');
var del = require('del');
var changed = require('gulp-changed');
var remember = require('gulp-remember');
var eslint = require('gulp-eslint');
var gutil = require("gulp-util");
var express = require('express');
const debug = require('debug')('app:server');
const path = require('path');
var app = express();
// var webpack = require("gulp-webpack");

/**
 * 并非所有的任务都是基于流，例如删除文件
 * 一个 gulpfile 只是一个 Node 程序，在 gulpfile 中可以使用任何 npm 中的模块或者其他 Node.js 程序
 */
function clean() {
  // del 也可以和 `gulp.src` 一样可以基于模式匹配的文件路径定义方式 
  return del(["./dist/**"]);
}


/**
 * 监控文件，当文件改变过后做对应的任务
 * @return {[type]} [description]
 */
function watch() {
  gulp.watch(["./src/modules/**/*.js", "./src/*.js"], gulp.series(gulp.task('eslint')));
  //生成./src/main.js
  gulp.watch(["/src/modules/*/*.js"], gulp.series(gulp.task('makeEntry')));

}

gulp.task('eslint', () => {
  return gulp.src(["./src/**/*.js"])
    .pipe(changed('eslint')) //// 和 newer 类似，过滤出改变了的 scripts
    .pipe(remember('eslint')) //// 找出所有的 scripts

  .pipe(eslint({
      configFile: '.eslintrc'
    }))
    .pipe(eslint.format());

});


//生成入口main.js文件 ，载入组件
gulp.task('makeEntry', (done) => {
  require("./src/devTool/cmd/makeEntry.js");
  done();
});


/**
 * [webpack 相关的依赖]
 * @type {[type]}
 */
var webpack = require("webpack");
var webpackConfDev = require("./webpack.config");

//express , web服务器
gulp.task('express', function(done) {
  var compiler = webpack(webpackConfDev);
  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfDev.output.publicPath,
    contentBase: "./src",
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: true,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use('*', function(req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
          return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
      })
      // res.send('Birds home page');
  })
  console.log('Server is now running at http://localhost:3001/')
  app.listen(3001);
  debug(`Server is now running at http://localhost:3001.`);
});

/*
 * 使用 CommonJS `exports` 模块的方式定义任务
 */
exports.clean = clean;
exports.watch = watch;

/*
 * 确定任务是以并行还是串行的方式定义任务 series 串行 parallel 并行
 */

var dev = gulp.parallel(gulp.series(clean, gulp.task('eslint'), gulp.task('express')), watch);


/*
 * 定义默认任务，默认任务可以直接通过 gulp 的方式调用
 */
gulp.task('default', dev);