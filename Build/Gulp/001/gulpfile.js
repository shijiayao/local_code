const { src, dest, series, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename'); // 修改文件名
const saveLicense = require('uglify-save-license'); // 压缩时保留特殊注释信息
const replace = require('gulp-replace'); // 正则替换
const changed = require('gulp-changed'); // 对比文件变化，决定是否传递至 stream

const developer = 'shijiayao'; // 开发者
const compressed_time = timestampSerialize(); // 压缩代码时的时间

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

// 修改 developer 和 文件修改时间 信息
function replace_modified() {
  return src(['./tpl/src/**/*.*js', './tpl/src/**/*.less', './tpl/src/**/*.scss', './tpl/src/**/*.css', '!./**/*.min.*'])
    .pipe(changed('./tpl/src/', { extension: '.min.js', hasChanged: changed.compareLastModifiedTime }))
    .pipe(replace(/(@LastEditors: )(\w*)(.*)/g, `$1${developer}$3`))
    .pipe(replace(/(@LastEditTime: )([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2})/g, `$1${compressed_time}`))
    .pipe(dest('./tpl/src/'));
}

function daload() {
  return src(['./tpl/src/js/daload/**/*.*js', '!./**/*.min.*'])
    .pipe(changed('./tpl/src/js/daload/', { extension: '.min.js', hasChanged: changed.compareLastModifiedTime }))
    .pipe(replace(/(@LastEditors: )(\w*)(.*)/g, `$1${developer}$3`))
    .pipe(replace(/(@LastEditTime: )([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2})/g, `$1${compressed_time}`))
    .pipe(dest('./tpl/src/js/daload/'))
    .pipe(babel())
    .pipe(uglify(saveLicenseConfig))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./tpl/src/js/daload/'));
}

function match() {
  return src(['./tpl/src/js/match_detail/**/*.*js', '!./**/*.min.*'])
    .pipe(changed('./tpl/src/js/match_detail/', { extension: '.min.js', hasChanged: changed.compareLastModifiedTime }))
    .pipe(replace(/(@LastEditors: )(\w*)(.*)/g, `$1${developer}$3`))
    .pipe(replace(/(@LastEditTime: )([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2})/g, `$1${compressed_time}`))
    .pipe(dest('./tpl/src/js/match_detail/'))
    .pipe(babel())
    .pipe(uglify(saveLicenseConfig))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./tpl/src/js/match_detail/'));
}

function daload_old() {
  return src(['./tpl/src/js/detail/daload_detail_v4.js', '!./**/*.min.*'])
    .pipe(changed('./tpl/src/js/detail/', { extension: '.min.js', hasChanged: changed.compareLastModifiedTime }))
    .pipe(replace(/(@LastEditors: )(\w*)(.*)/g, `$1${developer}$3`))
    .pipe(replace(/(@LastEditTime: )([\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2})/g, `$1${compressed_time}`))
    .pipe(dest('./tpl/src/js/detail/'))
    .pipe(babel())
    .pipe(uglify(saveLicenseConfig))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./tpl/src/js/detail/'));
}

function detail_news() {
  return src('./tpl/src/version/v1/js/news_detail20201228.js')
    .pipe(rename({ basename: 'news_detail20191220', extname: '.js' }))
    .pipe(dest('./tpl/src/version/v1/js/'));
}

function compressed_end(cb) {
  cb();

  // gulp 任务结束后输出信息
  console.log('\n');
  console.log('============================================================');
  console.log('\n');
  console.log('\x1B[33m%s\x1B[39m \x1B[34m%s\x1B[39m', '      developer', developer);
  console.log('\x1B[33m%s\x1B[39m \x1B[34m%s\x1B[39m', 'compressed time', compressed_time);
  console.log('\n');
  console.log('============================================================');
}

// exports.replace_fn = replace_modified;
// exports.daload = daload;
// exports.daload_old = daload_old;
// exports.match = match;
// exports.compressed_end = compressed_end;

const prelogic = series(replace_modified); // 顺序执行预处理任务
const compressed_task = parallel(daload, match, daload_old, detail_news); // 最大并发性执行任务
const end_phase = series(compressed_end); // 顺序执行结束任务

exports.default = series(/* prelogic, */ compressed_task, end_phase);
