const path = require('path')

module.exports={
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
}

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
          //小于2kb时打包成base64编码的图片否则单独打包成图片
        }
      }
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      options: {
        name: '[name].[ext]', //对打包后的图片命名
        outputPath: 'images/', //打包后图片放的位置　dist\images
        limit: 2048
        //1024 == 1kb  
        //小于2kb时打包成base64编码的图片否则单独打包成图片
      }
    },
  ]
}