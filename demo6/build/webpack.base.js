const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 2048
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    new cleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      //chunks: all, async, initial.
      //async 只对异步分割有效
      // initial　同步
      //all 要配置cacheGroups
      chunks: 'all',
      // 引入的包或是库大于30kb才对代码进行分割
      minSize: 30000,

      maxSize: 0,　//没多大意义
      minChunks: 1, //当一个模块至少引入多少次时才会进行代码分割
      maxAsyncRequests: 5,　//同时加载的模块数最多是5个
      maxInitialRequests: 3,
      automaticNameDelimiter: '~', //打包后的文件名字之间的连接符
      name: true,
      cacheGroups: {　//缓存组
        // vendors: false,
        vendors: {　
          //同步　检查是否在node_modules里面
          test: /[\\/]node_modules[\\/]/,
          priority: -10,　//优先级
          name: 'vendors'
        },
        // default: false
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,　//如果模块已经打包过了就引用之前打包好的模块
          // filename: 'common.js'
        }
      }
    }
  }
}