// 引入城市站点
const station_name = require('./station_name.js');

// 处理城市信息
var station_name_arr = station_name.split('@').map(element => element.split('|'));

module.exports = { station_name: station_name_arr };
