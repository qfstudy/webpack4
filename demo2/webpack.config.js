const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack=require('webpack')

module.exports={
  mode: 'development', //development: 开发环境　production：生产环境
  devtool: 'cheap-module-eval-source-map',
  //开发环境推荐: cheap-module-eval-source-map
  //生产环境推荐: cheap-module-source-map
  entry: {
    main: './src/index.js'
  },
  //打包完成后文件存放位置配置
  output: {
    //name与entry对象的属性对应
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules:[
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]', //对打包后的图片命名
            outputPath: 'images/', //打包后图片放的位置　dist\images
            limit: 2048
            //1024 == 1kb  
            //小于200kb时打包成base64编码的图片否则单独打包成图片
          }
        }
      },
      {
        test: /\.css$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader' 
          //加前缀  npm i autoprefixer -D
          //在项目根目录下配置postcss.config.js文件 
        ]
      },
      {
        test: /\.scss$/,
        use:[
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              //importLoaders
              //用于配置css-loader作用于@import的资源之前有多少个loader先作用于@import的资源
              modules: true //加载css模块化打包，避免样式文件之间相互影响
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    new cleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    // open: true, //自动打开浏览器
    // port: 8080,
    hot: true,　//启用webpack的热模块替换功能
    hotOnly: true　
    //devServer.hot在没有页面刷新的情况下启用热模块替换作为构建失败时的后备
  }
}