/**
 * @监控
 * gulp
 *
 * @活动相关
 * previewAct  发布本地预览活动文件
 * publicAct   发布生产环境活动文件
 *
 * @除了活动外的发布
 * publicStatic  发布测试环境
 * publicMisc    发布生产环境
 *
 */
/* ===============================================
 comment plugin
 ===============================================*/
//util plugin
var fs = require("fs");
var path = require("path");

var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var newer = require('gulp-newer');

//plugins
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var compass = require('gulp-compass'); //编译scss文件插件
var sass = require("gulp-sass");
var tmodJS = require('gulp-tmod'); //静态模版预编译插件

var transport = require('gulp-seajs-transport');

var seabuild = require('gulp-sea-build');
var apidoc = require("gulp-apidoc");

var fileInclude = require('gulp-file-include');

var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var jsontomap = require("gulp-json-to-map");

var clean = require("gulp-clean");

/* ===============================================
 PATHCONFIG config
 ===============================================*/
var config = require("./config.json");

var PATHCONFIG = {
    "cdn": config.protocal + config.host + ":" + config.port,
    "releaseCDN": config.protocal + config.releaseHost + ":" + config.port
};

/* ==============================================
 *                  min image
 *  =============================================*/
gulp.task('minImage', function() {
    return gulp.src([config.src + '/images/**/*', '/' + config.src + '/images/icons'])
        .pipe(newer(config.public + 'dist'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.public + '/images'));
});

/* ===============================================
           预编译html文档
 ===============================================*/

// 发布到本地开发环境，编译改动过的
gulp.task('htmlLocal', function() {
    return gulp.src([config.src + '/html/**/*.html', '!' + config.src + '/html/layout/*.html'])
        .pipe(newer(config.public + '/html'))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: config.src + '/html/layout',
            context: {
                miscPath: PATHCONFIG.cdn
            }
        }))
        .pipe(gulp.dest(config.public + '/html'))
});
// 发布到本地开发环境，全部编译
gulp.task('htmlLocalAll', function() {
    return gulp.src([config.src + '/html/**/*.html', '!' + config.src + '/html/layout/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: config.src + '/html/layout',
            context: {
                miscPath: PATHCONFIG.cdn
            }
        }))
        .pipe(gulp.dest(config.public + '/html'))
});


/* ===============================================
 uglify all js for fold "js"
 ===============================================*/
//uglify page fold, jshint before minJS
gulp.task("minJS", function() {
    return gulp.src([config.src + "/js/*.js"])
        .pipe(newer(config.public + "js"))
        .pipe(uglify())
        .pipe(gulp.dest(config.public + '/js'));
});

//uglify util fold
gulp.task("concatCoreLocal", function() {
    return gulp.src(config.coreList)
        .pipe(concat("base.js"))
        .pipe(uglify())
        .pipe(gulp.dest(config.public + "/js"));
});

/* ===============================================
 活动相关自动构建
 ===============================================*/
var actDestPATHCONFIG = config.public + "/active";

//备份活动
gulp.task("bakAct", function() {
    return gulp.src(config.src + "/active/act/**/**/*")
        .pipe(gulp.dest(config.src + "/active/back"));
});

// copy html
gulp.task("copyActHtml", function(){
    gulp.src(config.src + "/active/act/**/**/*.html")
        .pipe(newer(actDestPATHCONFIG))
        .pipe(gulp.dest(actDestPATHCONFIG));
});
//压缩js
gulp.task("minActJS", function() {
    gulp.src(config.src + "/active/act/**/**/*.js")
        .pipe(newer(actDestPATHCONFIG))
        .pipe(uglify())
        .pipe(gulp.dest(actDestPATHCONFIG));

    gulp.src(config.src + "/active/js/*.js")
        .pipe(newer(config.public + "/active/js"))
        .pipe(uglify())
        .pipe(gulp.dest(config.public + "/active/js"));
});
//压缩css
gulp.task("minActCSS", function() {
    return gulp.src(config.src + "/active/act/**/**/*.css")
        .pipe(newer(actDestPATHCONFIG))
        .pipe(minifyCss())
        .pipe(gulp.dest(actDestPATHCONFIG));
});
//压缩图片
gulp.task("minActImg", function() {
    return gulp.src(config.src + "/active/act/**/**/*.{jpg,png,gif}")
        .pipe(newer(actDestPATHCONFIG))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(actDestPATHCONFIG));
});

//编译活动css--发布时使用
gulp.task('compassActive', function() {
    return gulp.src(config.src + '/sass/active/active.scss') //sass文件源文件,路径必须与下面的sass设置的目录
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest(config.public + '/active/css'));
});

//不打包copy模块--预览时使用
gulp.task("actPreviewModule", function() {
    return gulp.src(config.src + "/lib/active/*.js", { base: config.src + "/" })
        .pipe(newer(config.public))
        .pipe(transport())
        .pipe(gulp.dest(config.public));
});

/**  ====================================================
 *              css 文件预编译，使用sass语法
 *   ====================================================*/
// 编译普通页面sass
gulp.task('compassLocal', function() {
    return gulp.src(config.src + '/sass/page/*.scss')
        .pipe(newer(config.public + "/css"))
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest(config.public + "/css"));
});

/**  ====================================================
 *                  seajs 模块打包
 *   ====================================================*/
// package seajs for misc,static,backend
gulp.task("seaPackageLocal", ['lintModuleJS'], function() {
    gulp.src(config.seaPaths)
        .pipe(newer(config.public + "/lib"))
        .pipe(seabuild({
            base: config.src
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.public + "/lib"));

});


gulp.task("seaPackageLocalAll", ['lintModuleJS'], function() {
    gulp.src(config.seaPaths)
        .pipe(seabuild({
            base: config.src
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.public + "/lib"));

});

/**  ====================================================
 *          代码基本的语法检测
 *   ====================================================*/
// 检测页面逻辑js
gulp.task('lintPageJS', function() {
    return gulp.src(config.src + '/js/page/*.js')
        .pipe(newer(config.public + "js/page"))
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }));
});

// 检测模块js语法
gulp.task('lintModuleJS', function() {
    return gulp.src(config.src + '/lib/page/*.js')
        .pipe(newer(config.public + "lib/page"))
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }));
});

/**  ====================================================
 *              生成api接口文档
 *   ====================================================*/
gulp.task("apiDoc", function(done) {
    apidoc({
        src: config.src + "/apidoc/src",
        dest: config.src + "/apidoc",
        debug: true,
        includeFilters: [".*\\.js$"]
    }, done);
});
/**  ====================================================
 *              监控scss文件变化
 *   ====================================================*/
gulp.task("watchSass", function() {
    gulp.watch([config.src + '/sass/page/*.scss', 
                config.src + '/sass/layout/*.scss', 
                config.src + '/sass/components/*.scss'], 
        function(event) {

        var filePath = path.relative(config.src, event.path);

        console.log("file:" + filePath + " " + event.type);
        if (filePath.indexOf("page") > -1) {
            gulp.src(config.src + "/" + filePath)
                .pipe(newer(config.public + "/css"))
                .pipe(sass())
                .pipe(minifyCss())
                .pipe(gulp.dest(config.public + "/css"));
        } else {
            gulp.start("compassLocal");
        }

    });
});
/**  ====================================================
 *              监控静态模板文档变化
 *   ====================================================*/
gulp.task("watchTemplate", function() {
    gulp.watch(config.src + "/template/**/*", function(event) {

        var changArr = path.dirname(event.path).split(path.sep);
        var dirname = changArr[changArr.length - 1];

        console.log(event.path, event.type, dirname);

        // 目录不存在/为空则不打包，防止出错
        if (dirname) {
            gulp.src([config.src + "/template/" + dirname + "/*.html"])
                .pipe(tmodJS({
                    "templateBase": config.src + "/template/" + dirname,
                    "combo": true,
                    "cache": false,
                    "runtime": "temp" + dirname + ".js",
                    "syntax": "native"
                }))
                .pipe(uglify({
                    output: {
                        beautify: true
                    }
                }))
                .pipe(gulp.dest(config.src + "/lib/template"));
        } else {
            console.log("目录不存在，请新建目录后重启gulp！");
        }
    });
});

/**  ====================================================
 *                文档监视器
 *   ====================================================*/
gulp.task('default', ["watchTemplate","watchSass"], function() {

    //监控sass目录
    // gulp.watch([config.src + '/sass/page/**/**/*.scss', config.src + '/sass/layout/*.scss', config.src + '/sass/components/*.scss'], ['compassLocal']);

    //监控活动主样式active.scss
    gulp.watch(config.src + "/sass/active/*.scss", ['compassActive']);

    //监控html文件变化
    gulp.watch([config.src + '/html/**/**/*.html', "!" + config.src + '/html/layout/*.html'], ['htmlLocal']);

    //监控html下的layout目录
    gulp.watch(config.src + '/html/layout/*.html', ['htmlLocalAll']);

    //监控模块目录
    gulp.watch([config.src + '/lib/**/**/**/*.js'], ['seaPackageLocal']);

    //js目录
    gulp.watch(config.src + '/js/*.js', ['minJS']);

    //监控js/util目录
    gulp.watch(config.src + "/js/util/*.js", ['concatCoreLocal']);

    //监控活动目录
    gulp.watch([config.src + '/active/**/**/**/*'], ['previewAct']);

    //监控图片变化
    gulp.watch([config.src + '/images/**/*'], ['minImage']);

    //监控apidoc/src文件夹
    gulp.watch([config.src + '/apidoc/src/*.js'], ['apiDoc']);
});

/**  ====================================================
 *   发布相关
 *   @string  previewAct  发布活动到本地开发环境进行预览
 *   @string  publicAct   发布生产环境的活动文件
 *   @string  public      发布除了活动外的文件到本地开发环境
 *   @string  publicMisc  发布生产环境文件（除了活动）
 *   ====================================================*/

// 预览活动
gulp.task("previewAct", ['minActJS', 'minActCSS', 'minActImg', 'copyActHtml'], function() {
    console.log("starting preview active ...");
});

// 发布活动
gulp.task("publicAct", ['minActJS', 'minActCSS', 'minActImg', 'copyActHtml', 'compassActive'], function() {
    console.log("starting public active ...");
});

// 发布测试环境,不包括活动
gulp.task("public", ['concatCoreLocal', 'htmlLocalAll', "seaPackageLocalAll"], function() {
    console.log("public for local done...")
});

// 发布生产环境,不包括活动
gulp.task("deploy", ["htmlAll"], function() {
    console.log("public for misc done...")
});



/**
 *  生产环境自动构建相关
 */


// 发布到生产环境，带版本控制，全部一次性打包
gulp.task('htmlAll', ["coverJS"], function() {
    return gulp.src([config.src + '/html/**/*.html', '!' + config.src + '/html/layout/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: config.src + '/html/layout',
            context: {
                miscPath: PATHCONFIG.releaseCDN
            }
        }))
        .pipe(revReplace({
            manifest: gulp.src(config.staticLink.path)
        }))
        .pipe(gulp.dest(config.release + "/html"));
});

// 处理页面js,合并映射表,更新static-map.json
gulp.task("coverJS", ["minHtml5", "concatCore", "compass", "seaPackage"], function() {
    return gulp.src([config.src + "/js/*.js", "!" + config.src + "/js/html5.js"])
        .pipe(jsontomap({
            file: config.src + "/map/module-map.json",
            base: config.src + "/"
        }))
        .pipe(rev())
        .pipe(gulp.dest(config.release + "/js"))
        .pipe(rev.manifest(config.staticLink))
        .pipe(gulp.dest(config.mapDest));
});

// 特殊处理html5.js文件因为这个是引用在最顶部的
gulp.task("minHtml5", function() {
    return gulp.src([config.src + "/js/html5.js", config.src + "/js/util.js"])
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rev())
        .pipe(gulp.dest(config.release + "/js"))
        .pipe(rev.manifest(config.staticLink))
        .pipe(gulp.dest(config.mapDest));
});
// 压缩核心库base.js
gulp.task("concatCore", function() {
    return gulp.src(config.coreList)
        .pipe(concat("base.js"))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(config.release + "/js"))
        .pipe(rev.manifest(config.staticLink))
        .pipe(gulp.dest(config.mapDest));
});

// 生成生产环境带版本号的文件
gulp.task('compass', function() {
    return gulp.src(config.src + '/sass/page/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest(config.release + "/css"))
        .pipe(rev.manifest(config.staticLink))
        .pipe(gulp.dest(config.mapDest));
});

// 打包模块
gulp.task("seaPackage", function() {
    return gulp.src(config.seaPaths)
        .pipe(seabuild({
            base: config.src
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(config.release + "/lib"))
        .pipe(rev.manifest(config.moduleLink))
        .pipe(gulp.dest(config.mapDest));

});
