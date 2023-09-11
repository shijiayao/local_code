// 引入内置模块
const path = require('path');
const fs = require('fs');

// 引入插件
const axios = require('axios');
const puppeteer = require('puppeteer');

// 引入数据
const DATA = require('./data/data_out.js');

/**
 * 站点信息缩写接口 => https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.9114
 * 查询始发站到终点站的车次 => https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=2019-10-29&leftTicketDTO.from_station=SHH&leftTicketDTO.to_station=BBH&purpose_codes=ADULT
 */

class JourneyFN {
  constructor(journeyInfo) {
    this.data = {
      originator: '', // 始发站
      originatorPinYin: '', // 始发站拼音
      originatorCode: '', // 始发站代号
      terminal: '', // 终点站
      terminalPinYin: '', // 终点站拼音
      terminalCode: '', // 终点站代号
      date: '', // 日期
      trainArr: [] // 车次列表 { trainNumber: 'G1818', Via: [] }
    };

    this.data.originator = journeyInfo.始发站;
    this.data.terminal = journeyInfo.终点站;
    this.data.date = journeyInfo.日期;

    // 初始化
    this.init();
  }

  async init() {
    let _this = this;

    _this.queryStationName();
    // await _this.queryTrainNumberList();

    let num = 3;
    if (num < 5) {
      _this.puppeteerIndexFN();
    } else {
      _this.puppeteerQueryFN();
    }

    console.log(this);
  }

  // 查询城市站点
  queryStationName() {
    let _this = this;

    _this.data.originatorPinYin = DATA.station_name.filter(element => _this.data.originator === element[1])[0][3];
    _this.data.originatorCode = DATA.station_name.filter(element => _this.data.originator === element[1])[0][2];
    _this.data.terminalPinYin = DATA.station_name.filter(element => _this.data.terminal === element[1])[0][3];
    _this.data.terminalCode = DATA.station_name.filter(element => _this.data.terminal === element[1])[0][2];
  }

  // 查询车次列表
  queryTrainNumberList() {
    let _this = this;

    let params = {
      'leftTicketDTO.train_date': _this.data.date, // 查询的时间
      'leftTicketDTO.from_station': _this.data.originatorCode, // 查询的始发站代号
      'leftTicketDTO.to_station': _this.data.terminalCode, // 查询的终点站代号
      purpose_codes: 'ADULT'
    };

    return axios({
      method: 'get',
      url: 'https://kyfw.12306.cn/otn/leftTicket/query',
      params,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
        Cookie: ''
      }
      // responseType: 'stream'
    })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  puppeteerIndexFN() {
    let _this = this;

    (async () => {
      const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: { width: 1920, height: 937 } });
      const page = await browser.newPage();

      await page.goto('https://www.12306.cn/index/');

      await page.waitFor('#fromStationText');
      await page.waitFor(1000);
      await page.click('#fromStationText');
      await page.keyboard.type(_this.data.originatorPinYin, { delay: 100 });
      await page.keyboard.down('Enter');
      await page.keyboard.type(_this.data.terminalPinYin, { delay: 100 });
      await page.keyboard.down('Enter');
      await page.evaluate(classThis => {
        $('#train_date').val(classThis.data.date);
      }, _this);
      await page.click('#isHighDan');
      await page.waitFor(1000);

      //在点击按钮之前，事先定义一个promise，用于返回新tab的page对象
      const page2Promise = new Promise(res => browser.on('targetcreated', target => res(target.page())));

      await page.click('#search_one');

      let page2 = await page2Promise;
      // 订阅 reponse 事件，参数是一个 reponse 实体
      page2.on('response', response => {
        if (response.url().indexOf('otn/leftTicket/query') > -1) {
          response
            .text()
            .then(async body => {
              let tempArr = JSON.parse(body).data.result;

              _this.data.trainArr = tempArr
                .map((element, index) => element.split('|'))
                .filter((element, index) => /G|D/.test(element[3]))
                .map((element, index) => {
                  return { 车次: element[3], 余票信息: element, 经过站点: [] };
                });

              for (let index = 0; index < _this.data.trainArr.length; index++) {
                // await page.waitFor(1000);
                // await page.click('#');
              }

              console.log(_this.data);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });

      await page2.waitFor('#fromStationText');
    })();
  }

  async puppeteerQueryFN() {
    let _this = this;

    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'], defaultViewport: { width: 1920, height: 937 } });
    const page = await browser.newPage();

    await page.goto('https://kyfw.12306.cn/otn/leftTicket/init');

    await page.waitFor('#fromStationText');
    await page.waitFor(1000);
    await page.click('#fromStationText');
    await page.keyboard.type(_this.data.originatorPinYin, { delay: 100 });
    await page.keyboard.down('Enter');
    await page.click('#toStationText');
    await page.keyboard.type(_this.data.terminalPinYin, { delay: 100 });
    await page.keyboard.down('Enter');
    await page.evaluate(classThis => {
      $('#_ul_station_train_code li')
        .eq(0)
        .find('input')
        .trigger('click');

      $('#_ul_station_train_code li')
        .eq(1)
        .find('input')
        .trigger('click');

      $('#train_date').val(classThis.data.date);
    }, _this);
    await page.waitFor(1000);
    await page.click('#query_ticket');
  }

  // 生成随机数，范围 x - y
  randomNumber(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
  }

  sleepFN(time = 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}

new JourneyFN({ 始发站: '上海', 终点站: '蚌埠', 日期: '2020-01-21' });
