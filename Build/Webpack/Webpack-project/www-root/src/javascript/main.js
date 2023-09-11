// 样式文件
import '../css/index.scss';

// 插件
import $ from 'jquery/dist/jquery.min.js';

// 页面逻辑
$(function() {
  setTimeout(() => {
    $('body').css('background-color', 'red');
  }, 5000);
  console.log(666);
});
