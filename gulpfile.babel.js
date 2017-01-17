'use strict';
// 引入 gulp及组件

var gulp = require('gulp'), //基础库
    htmlmin = require('gulp-htmlmin'), //HTML压缩
    imagemin = require('gulp-imagemin'), //图片压缩
    pngquant = require('imagemin-pngquant'), //图片深度压缩
    cache = require('gulp-cache'), //图片压缩缓存
    spriter = require('gulp-css-spriter'), //图片雪碧图
    minifycss = require('gulp-minify-css'), //css压缩
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'), //自动填补css3前缀
    // jshint = require('gulp-jshint'), //js检查
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    rimraf = require('rimraf'), //清空文件夹
    connect = require('gulp-connect'), //自动刷新浏览器
    plumber = require('gulp-plumber'), // plumber 给pipe打补丁
    sourcemaps = require('gulp-sourcemaps'), // gulp sourcemaps
    postcss = require('gulp-postcss'),
    watch = require('gulp-watch'), // 使用gulp-watch 监测文件新增与删除
    babel = require('gulp-babel'), // 使用gulp-babel ES6转化工具;
    posthtml = require('gulp-posthtml'),
    path = require('path'),
    fs = require('fs'), //加载Node的fs模块
    fileinclude = require('gulp-file-include'),
    posthtml = require('gulp-posthtml'),
    cached = require('gulp-cached'),
    remember = require('gulp-remember'),
    bsc = require('browser-sync'),
    ejs = require('gulp-ejs');

var htmlSrc = 'src/*.html',
    htmlDst = 'assets/',
    ejsSrc = 'src/*.ejs',
    ejsDst = 'assets/',
    libSrc = 'src/dist/js/lib/**/*',
    libDst = 'assets/dist/js/lib',
    fontSrc = 'src/dist/css/font/**/*',
    fontDst = 'assets/dist/css/font',
    cssSrc = 'src/dist/css/**/*.css',
    cssDst = 'assets/dist/css',
    imgSrc = 'src/dist/img/**/*.+(jpeg|jpg|png)',
    imgDst = 'assets/dist/img',
    jsSrc = ['src/dist/js/**/*.js', '!src/dist/js/lib/**/*'],
    jsDst = 'assets/dist/js';

function getClass(module, c) {
    const moduleFileName = path.resolve('./css-module', `${ module }.json`);
    const classNames = fs.readFileSync(moduleFileName).toString();
    return JSON.parse(classNames)[c];
}

// HTML处理
gulp.task('html', ['css'], function() {
    gulp.src(htmlSrc)
        //.pipe(cached('html'))
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(posthtml([require('posthtml-css-modules')('./css-module/')]))
        //.pipe(remember('html'))
        .pipe(gulp.dest(htmlDst));
});

gulp.task('ejs', function() {
    gulp.src(ejsSrc)
        //.pipe(cached('html'))
        .pipe(plumber())
        .pipe(ejs({ c: getClass }, { ext: '.html' }))
        .pipe(gulp.dest(ejsDst));
});

gulp.task('lib', function() {
    gulp.src(libSrc)
        //.pipe(cached('lib'))
        //.pipe(remember('lib'))
        .pipe(gulp.dest(libDst));
});

gulp.task('font', function() {
    gulp.src(fontSrc)
        .pipe(gulp.dest(fontDst));
});

gulp.task('css', function() {
    gulp.src(cssSrc)
        //.pipe(cached('css'))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('precss'),
        ]))
        .pipe(postcss([
            require('postcss-display-inline-block'),
        ]))
        .pipe(postcss([
            require('autoprefixer'),
        ]))
        .pipe(postcss([
            require('postcss-easysprites')({
                imagePath: '../img',
                spritePath: './assets/dist/img'
            })
        ]))
        // .pipe(postcss([
        //     require('postcss-modules')({
        //         generateScopedName: '[name]_[local]_[hash:base64:5]',
        //         getJSON: function(cssFileName, json) {
        //             var cssName = path.basename(cssFileName, '.css');
        //             var jsonFileName = path.resolve('./css-module/' + cssName + '.json');
        //             fs.writeFileSync(jsonFileName, JSON.stringify(json));
        //         }
        //     }),
        // ]))
        //.pipe(remember('css'))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cssDst));
});

// 图片处理(未开启)
gulp.task('images', function() {

    gulp.src(imgSrc)
        //.pipe(cached('images'))
        // .pipe(imagemin({
        //  optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        //  progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        //  interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        //  multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        //  svgoPlugins: [{
        //      removeViewBox: false
        //  }], //不要移除svg的viewbox属性
        //  use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        // }))
        //.pipe(remember('images'))
        .pipe(gulp.dest(imgDst));
});


// js处理
gulp.task('js', function() {
    gulp.src(jsSrc)
        //.pipe(cached('js'))
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@',
            basepath: '@file'
        }))
        // .pipe(babel({
        //     compact: false,
        //     presets: ['es2015']
        // }))
        //.pipe(remember('js'))
        .pipe(gulp.dest(jsDst));
});

// 清空图片、样式、js
gulp.task('clean', function(cb) {
    rimraf('assets/', cb);
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function() {
    gulp.start('lib', 'font', 'js', 'images', 'css', 'html', 'ejs');
});

//使用connect启动一个Web服务器
gulp.task('connect', function() {
    // 从这个项目的根目录启动服务器
    var bs = bsc.create();
    bs.init({
        reloadDelay: 2000,
        server: {
            baseDir: 'assets', //本地服务器目录
            directory: true
        },
        port: 8000
    });
    gulp.watch([htmlSrc,
        ejsSrc,
        libSrc,
        cssSrc,
        imgSrc,
        jsSrc
    ]).on("change", bs.reload);
});


// 监听任务 运行语句 gulp watch
gulp.task('watch', ['default', 'connect'], function() {
    // 监听css
    gulp.watch(cssSrc, ['css']);
    // 监听html
    gulp.watch(htmlSrc, ['html']);
    // 监听ejs
    // gulp.watch(ejsSrc, ['ejs']);
    // 监听images(暂未开启)
    gulp.watch(imgSrc, ['images']);
    // 监听js
    gulp.watch(jsSrc, ['js']);
    // 监听lib
    gulp.watch(libSrc, ['lib']);
});
