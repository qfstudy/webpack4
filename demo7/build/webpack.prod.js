const merge = require('webpack-merge')
const baseConfig=require('./webpack.base')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig={
  mode: 'production', 
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },
  optimization: {
    minimizer: [new optimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    })
  ]
}

module.exports=merge(baseConfig,prodConfig)