const { src, dest, watch, series, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename'); // 修改文件名
const saveLicense = require('uglify-save-license'); // 压缩时保留特殊注释信息
const replace = require('gulp-replace'); // 正则替换
const changed = require('gulp-changed'); // 对比文件变化，决定是否传递至 stream
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const compressed_time = timestampSerialize(); // 打包代码时的时间

// 将当前时间序列化重新输出
function timestampSerialize() {
  const CURRENT_TIME = new Date();

  let year = CURRENT_TIME.getFullYear();
  let month = CURRENT_TIME.getMonth() + 1;
  let day = CURRENT_TIME.getDate();
  let hour = CURRENT_TIME.getHours();
  let minute = CURRENT_TIME.getMinutes();
  let second = CURRENT_TIME.getSeconds();

  let dateArr = [year, month, day].map((element, index) => (element >= 10 ? element : `0${element}`));
  let timeArr = [hour, minute, second].map((element, index) => (element >= 10 ? element : `0${element}`));

  return `${dateArr.join('-')} ${timeArr.join(':')}`; // 2020-06-10 14:54:30
}

// 保留 License 注释信息
const saveLicenseConfig = {
  output: {
    comments: saveLicense
  }
};

// 修改 版本时间戳 和 文件修改时间 信息 JS
function replace_modified_JS() {
  return src(['./src/**/*.js', '!./src/common/js/**/*'])
    .pipe(changed('dfzx', { extension: '.min.js', hasChanged: changed.compareLastModifiedTime }))
    .pipe(replace(/(let FILE_VERSION = `_timestamp_=\$\{)([\d]{14})(\}`;)/g, `$1${compressed_time.replace(/-|:|\s/gi, '')}$3`))
    .pipe(replace(/(@LastEditTime: )([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2})/g, `$1${compressed_time}`))
    .pipe(dest('./src/'));
}

// 修改 版本时间戳 和 文件修改时间 信息 SCSS
function replace_modified_SCSS() {
  return src(['./src/**/*.scss'])
    .pipe(changed('dfzx', { extension: '.min.css', hasChanged: changed.compareLastModifiedTime }))
    .pipe(replace(/(@LastEditTime: )([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2})/g, `$1${compressed_time}`))
    .pipe(dest('./src/'));
}

// 复制 公共 资源
function common() {
  return src(['./src/common/**/*.*', '!./src/common/**/*.less']).pipe(dest('./dfzx/common/'));
}

// 爱虾搜 HTML
function aixiasouHTML() {
  return src(['./src/axsplayer/**/*.html']).pipe(dest('./dfzx/axsplayer/'));
}

// 爱虾搜 JS
function aixiasouJS() {
  return src(['./src/axsplayer/**/*.*js'])
    .pipe(babel())
    .pipe(uglify(saveLicenseConfig))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./dfzx/axsplayer/'));
}

// 爱虾搜 CSS
function aixiasouCSS() {
  return src(['./src/axsplayer/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('./dfzx/axsplayer/'));
}

function compressed_end(cb) {
  cb();

  // gulp 任务结束后输出信息
  console.log('\n');
  console.log('============================================================');
  console.log('\n');
  console.log('\x1B[33m%s\x1B[39m \x1B[34m%s\x1B[39m', 'compressed time', compressed_time);
  console.log('\n');
  console.log('============================================================');
}

const prelogic = series(replace_modified_JS, replace_modified_SCSS); // 顺序执行预处理任务
const aixiasou_task = parallel(common, aixiasouHTML, aixiasouJS, aixiasouCSS); // 最大并发性执行任务
const end_phase = series(compressed_end); // 顺序执行结束任务

exports.aixiasou = series(prelogic, aixiasou_task, end_phase);

exports.aixiasou_watch = () => {
  watch(['./src/'], { delay: 200 }, aixiasou_task);
};

// exports.default = series(prelogic, aixiasou_task, end_phase);
