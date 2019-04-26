const path = require('path')

module.exports={
  //mode development: 开发环境　production：生产环境
  mode: 'development', 
  //entry 入口文件配置  
  entry: {
    index: './src/index.js'
  },
  //打包完成后文件输出位置配置
  output: {
    //filename 设置打包后文件的名字
    //如果不设置filename，则文件的名字跟入口文件路径的属性名一样
    filename: 'bundle.js',
    //path 设置打包完成后文件输出路径
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules:[
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]', //对打包后的图片命名
      //       outputPath: 'images/' //打包后图片输出的位置　dist\images
      //     }
      //   }
      // },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]', //对打包后的图片命名
            outputPath: 'images/', //打包后图片放的位置　dist\images
            limit: 20480
            //1024 == 1kb  
            //小于20kb时打包成base64编码的图片否则单独打包成图片
          }
        }
      },
      {
        test: /\.css$/,
        use:[
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
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
          'postcss-loader',
          'sass-loader'
        ]
      }

    ]
  }
}