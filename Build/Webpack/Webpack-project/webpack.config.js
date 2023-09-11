// 导入path模块（内置模块）
const path = require('path');
// 导入 webpack
const webpack = require('webpack');

// 导入开发插件包
// 导入 html-webpack-plugin 包
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// CleanWebpackPlugin 配置项
// 要删除的目录
let pathsToClean = ['dist'];

// 路径等其他选项
let cleanOptions = {
  root: path.join(__dirname, './www-root/'),
  exclude: ['shared.js'],
  verbose: true,
  dry: false
};

// 导出配置对象
// 说明：导出的就是 webpack 要读取的配置对象
module.exports = {
  // 入口
  entry: path.join(__dirname, './www-root/src/javascript/main.js'),

  // 出口
  output: {
    // 指定输出文件所在目录
    path: path.join(__dirname, './www-root/dist'),
    // 指定输出文件的名称
    filename: 'main.js'
  },

  // 指定webpack的模式使用 开发模式
  // mode: 'development',

  // 开启监视模式，监视文件内容的变化
  watch: true,

  // 配置webpack-dev-server
  devServer: {
    // 自动打开浏览器
    open: true,
    // 指定默认打开那个目录中的index.html页面
    // contentBase: path.join(__dirname, './src'), // 如果使用了html-webpack-plugin插件，开发模式就不需要这个路径了
    // 指定端口号
    port: 4080
    // 开启热更新
    // 第一步：配置 hot true
    // hot: true
  },

  // 配置loader，处理 非JS 文件
  module: {
    // 通过 rules 来配置处理 非JS 文件的规则
    rules: [
      // 注意：use 中配置的loader是有顺序的！ 先配置 style-loader 再配置 css-loader
      // use 执行的顺序是： 从右往左，也就是：先调用css-loader，在调用style-loader

      // css-loader 读取css文件的内容，并且根据这个css内容，来创建一个模块（node）
      // style-loader 根据模块内容，创建一个style标签，然后，插入页面中
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      // less-loader 用来将 less 转化为css文件
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },

      // sass-loader 用来将 scss / sass 转化为css文件
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },

      // { test: /\.(jpg|jpeg|png|gif)$/, use: 'file-loader' },
      // use: 'url-loader'
      // limit的单位是：字节，1024 表示：1024字节，也就是： 1kb
      // 配置该项后，只有图片尺寸小于 limit 值的，才会被解析为 base64 编码的格式
      // 否则，url-loader 会自动调用 file-loader 以 url 的方式来加载图片
      { test: /\.(jpg|jpeg|png|gif)$/, use: { loader: 'url-loader', options: { limit: 1024 * 60 } } },

      // 处理字体图标文件
      // { test: /\.(eot|svg|ttf|woff|woff2|otf)$/, use: 'file-loader' }
      { test: /\.(eot|svg|ttf|woff|woff2|otf)$/, use: 'url-loader' },

      // 使用babel解析新的JS语法：老版本 / 低版本 只能使用一个版本
      // 通过 exclude 配置项，告诉 babel 不要处理 node_modules 目录中的js文件
      // 这样，可以加快 babel 处理的速度
      // { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },

      // 使用babel解析新的JS语法：新版本 / 高版本 只能使用一个版本
      {
        test: /\.m?js$/,
        // 通过 exclude 配置项，告诉 babel 不要处理 node_modules 目录中的js文件
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    // 第二步：启用该插件

    // new webpack.HotModuleReplacementPlugin(),

    // 指定模板路径
    new HtmlWebpackPlugin({ template: path.join(__dirname, './www-root/src/index.html') }),

    // build 前清理 dist 目录
    new CleanWebpackPlugin(pathsToClean, cleanOptions),

    // 文件占比
    new BundleAnalyzerPlugin()
  ]
};
