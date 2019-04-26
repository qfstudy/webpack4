一、webpack4--基本配置
---

这一部分通过webpack的基本配置，使用loader对图片和样式进行打包，从而了解webpack4简单的用方法，保证自己能够配置正确，提升学习动力。

### 1.初始化配置
```
mkdir webpack4
cd webpack4
mkdir demo1
cd demo1
npm init -y 或 npm init
```
#### 目录结构
```
webpack4
├── webpack4/demo1
│   └── webpack4/demo1/package.json
└── webpack4/README.md

```
- 安装webpack
`npm install webpack --save-dev`

- 安装指定版本webapck
`npm install --save-dev webpack@<version>`

- webpack 4+ 版本，还需要安装webpack-cli
`npm install webpack-cli --save-dev`

- `npx webpack -v`：查看webpack版本
- `npx webpack-cli -v`：查看webpack-cli版本

> 推荐本地安装webpack和webpack-cli
> 写这篇博客的时候webpack最新版本为：4.30.0，也是这篇学习webpack4使用的版本

在demo1目录下新建src目录，在src目录下新建index.js
```
mkdir src 
cd src
touch index.js
```
demo1目录结构
```
demo1
├── demo1/package.json
├── demo1/package-lock.json
└── demo1/src
    └── demo1/src/index.js

```
在index.js中加写代码，例如：
```
//index.js

let demo='webpack4'
console.log(demo)
```

webpack4可以零配置打包，webpack4会默认对src目录下的index.js文件打包。
现在运行`npx webapck`，可以在demo1目录下看到dist目录，dist目录下有一个main.js文件，这就是打包后的文件，打开查找可以看到 `console.log(demo)`，说明index.js被打包到main.js中。

###  2.webpack4的简单配置

在`demo1`目录下新建`webpack`配置文件`webpack.config.js`

##### 配置`webpack`--webpack.config.js
```
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
  }
}
```

运行`npx webpack`命令
`npx webpack`等价于`npx webpack --config webpack.config.js`

当`webapck`配置文件命名为`webpack.config.js`时可以省略`--config *.js`，直接执行`npx webpack`即可，否则执行`npx webpack --config 配置文件名`。

看到dist目录下有`bundle.js`，说明webpack配置正确。

在`package.json`中配置'script'
```
"scripts": {
    "build": "webpack"
  }
```
添加`"build": "webpack"`，运行`npm run build`效果等价于执行`npx webpack`命令。

#### 配置webpack.config.js的modoule对象

##### loader的用法

##### `file-loader`的使用

> 安装`file-loader`
`npm i file-loader --save-dev`

#### webpack.config.js
```
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
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', //对打包后的图片命名
            outputPath: 'images/' //打包后图片输出的位置　dist\images
          }
        }
      }
    ]
  }
}
```
在src目录下新建images文件夹，存放图片

#### 修改index.js
```
//index.js

//import导入图片
import image from './images/11.png'

let img=new Image()
img.src=image
document.body.append(img)
```
运行`npm run build`后的目录结构如下
```
demo1
├── demo1/dist
│   ├── demo1/dist/bundle.js
│   ├── demo1/dist/images
│   │   └── demo1/dist/images/11.png
│   └── demo1/dist/index.html
├── demo1/package.json
├── demo1/package-lock.json
├── demo1/src
│   ├── demo1/src/images
│   │   └── demo1/src/images/11.png
│   └── demo1/src/index.js
└── demo1/webpack.config.js

```

在dist目录下出现了images目录和图片，创建index.html，引入js文件，在浏览器中打开就可以看到图片。

##### `url-loader`的使用

>`url-loader`安装
`npm i url-loader -D`

`url-loader`的作用跟'file-loader'的作用很类似

#### webpack.config.js
```
  module: {
    rules:[
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
      }
    ]
  }
}
```
`limit`属性：当图片大小大于属性值时打包成图片输出到images目录下，否则打包成base64编码的图片注入bundle.js中

因为base64编码的图片导致打包文件变大，所以图片比较小时打包成base64编码的图片，图片比较大时单独打包成一张图片。

#### 对`css`和`scss`的打包

>安装相应的loader
`npm i css-loader style-loader -D`
`npm i node-sass sass-loader -D`
`npm i postcss-loader -D`
`npm i autoprefixer -D`

`postcss-loader`和`autoprefixer`配合使用可以在打包过程中自动添加前缀

在demo1根目录下新建`postcss.config.js`，配置如下

```
//postcss.config.js
module.exports={
  plugins: [
    require('autoprefixer')
  ]
}
```

#### 在webpack.config.js文件的`module.rules'数组中添加配置

```
module:{
  rules:[
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
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
  ]
}
```
在`demo1`的`src`下新建`css`文件夹，在`css`文件夹下新建`style.css`和`index.scss`文件。

**index.scss**
```
body{
  border: 1px solid red;
  width: 300px;
  height: 300px;
  img{
    width: 100px;
    height: 100px;
    border-radius: 10%;
    transform: translate(100px,100px);
  }
}
```
**style.css**
```
body{
  border-radius: 10%;
}
```
**index.js**
```
//index.js

import image from './images/11.png'
import './style.css'
import './index.scss'

let img=new Image()
img.src=image
document.body.append(img)
```
运行`npm run build`，在dist目录下新建index.html，引入js文件，在浏览器中打开就可以看到效果，说明打包成功。

#### css模块化
css模块化，避免页面样式之间相互影响
在`webpack.config.js`中的`css-loader`添加`modules: true`
```
//webpack.config.js

module:{
  rules: [
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
```
**修改index.js**
`.img`是类名需要在样式文件中提前写好样式
```
//index.js

import image from './images/11.png'
import style from './css/style.css'
// import style from './css/index.scss'

let img=new Image()
img.src=image

//style.img .img是scss文件中写好的类名
img.classList.add(style.img)

document.body.append(img)
```
**index.scss**
```
body{
  border: 1px solid red;
  width: 300px;
  height: 300px;
  img{
    width: 100px;
    height: 100px;
    border-radius: 10%;
    transform: translate(100px,100px);
  }
  .img{
    border: 10px solid royalblue;
  }
}
```
**style.css**
```
body{
  border-radius: 10%;
}
body .img{
  border: 10px solid yellow;
}
```
结果

![](https://upload-images.jianshu.io/upload_images/9437556-8969b7a3247e4b84.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到添加了一个class，类名是一串比较复杂的字符串，从而避免这个样式对别的元素产生影响。

---

二、进一步配置webpack4，使自己在学习webpack4的时候更方便
---

这一部分主要是学会使用`html-webpack-plugin`和`clean-webpack-plugin`插件，主要是学会配置`devServer`以及使用webpack的热模块替换功能。

首先，在`webpack4`目录下新建`demo2`文件夹将`demo1`目录下的所有东西复制到`demo2`中

在上一部分我们都是手动在dist目录下创建index.html引入js文件查看打包结果，这样会很麻烦。我们可以使用`html-webpack-plugin`来自动生产index.html，并且能够自动引入打包好的文件，直接打开生产的html就可以看到打包结构。

#### １．`html-webpack-plugin`的使用
>安装
`npm i html-webpack-plugin -D`

在`webpack.config.js`中配置plugins配置项
```
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

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
  module: { },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    })
  ]
}
```
在demo2目录下新建index.html作为模板

**index.html**
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>模板</title>
</head>
<body>
  <div id="root"></div>
<script type="text/javascript" src="bundle.js"></script></body>
</html>
```
运行`npm run build`，可以看到dist目录下自动生产index.html，并且还自动引入js文件

#### 2．`clean-webpack-plugin`的使用
每次打包生成的dist目录，如果改一次代码，都得要删除一次dist目录，这样很麻烦，可以通过`clean-webpack-plugin`在每次打包的前自动清空dist目录。

>安装
`npm i clean-webpack-plugin -D`

**在`webpack.config.js`的`plugins`中配置如下**
```
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

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
  module: { },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    }),
   new cleanWebpackPlugin()
  ]
}
```
运行`npm run build`，可以自己测试，每次打包前都会把dist目录下的文件删掉。

#### ３．`entry`和`output`多入口配置

```
module.exports={
  //mode development: 开发环境　production：生产环境
  mode: 'development', 
  //entry 入口文件配置  
  entry: {
    index: './src/index.js',
    main: './src/index.js'
  },
  //打包完成后文件输出位置配置
  output: {
    //filename 设置打包后文件的名字
    //如果不设置filename，则文件的名字跟入口文件路径的属性名一样
    // 占位符
    filename: '[name].js',
    //path 设置打包完成后文件输出路径
    path: path.resolve(__dirname,'dist')
  },
}
```
当有多入口的时候，需要修改`filename`的属性值为'[name].js'

运行`npm run build`，就会在dist目录下生产`index.js`和`main.js`

#### ４．配置`devtool`
devtool决定源代码与打包后的代码之间的映射关系，方便对代码进行调试。

开发环境推荐: cheap-module-eval-source-map
生产环境推荐: cheap-module-source-map

devtool具体内容请查阅：[文档：devtool](https://webpack.js.org/configuration/devtool/#root)
```
module.exports={
  devtool: 'cheap-module-eval-source-map',
  //开发环境推荐: cheap-module-eval-source-map
  //生产环境推荐: cheap-module-source-map
}
```

#### ５．配置`devServer`

[文档：devServer](https://webpack.js.org/configuration/dev-server/#root)

>安装`webpack-dev-server`
`npm i webpack-dev-server -D`

##### 在webpack.config.js中添加以下内容

```
module.exports={
  devServer: {
    contentBase: './dist',
    // open: true, //自动打开浏览器
    // port: 8080, //默认8080
  }
}
```
**修改`package.json`的`script`**，添加 `"start": "webpack-dev-server"`
```
 "scripts": {
    "start": "webpack-dev-server"
  },
```
执行`npm run start`后打开浏览器就可以看到效果，当我们修改代码的时候页面就会重新刷新。

有时我们希望页面只更新我们修改的那一部分就可以了，而并不是刷新页面，所以需要启用webpack的热模块替换功能。

####　６．启用webpack的热模块替换功能

##### 首先修改index.js
```
import './css/style.css'

var btn = document.createElement('button')
btn.innerHTML='新增'
document.body.appendChild(btn)

btn.onclick=function(){
  var div=document.createElement('div')
  div.innerHTML='items'
  document.body.appendChild(div)
}
```
##### 修改style.css，删掉index.scss
```
//style.css
body{
  background: yellow;
}
div:nth-of-type(odd){
  background: chartreuse;
  font-size: 18px;
}
```

##### 在webpack.config.js中
引入webpack：`const webpack=require('webpack')`
添加内容如下：
```
const webpack=require('webpack')
module.exports={
  plugins: [
    new webpack.HotModuleReplacementPlugin() //启用HMR
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
```
`hot:true`启用`HotModuleReplacementPlugin`（HMR）

执行`npm run start`，在浏览器打开以后，修改div的背景颜色，只有改变的地方才发生变化，但是页面并没有刷新。

在demo2的src目录下新建number.js

##### number.js
```
var number=function(){
  var div=document.createElement('div')
  div.setAttribute("id","number")
  div.innerHTML=103
  document.body.appendChild(div)
}

export default number
```
修改index.js
```
import number from './number'
number()
```
运行`npm run start`，在浏览器中打开看结果，然后在number.js中修改内容，但是页面并没有显示修改后的内容

这是因为在引入js文件的时候，热模块替换的实现方式有点区别。

js要达到热模块替换的效果，得要if(module.hot){}这一部分代码，否则就算改了代码，页面不刷新，修改的地方在页面上页面变化。

css样式因为css-loader已经实现if(module.hot){}这一部分，所以不需要单独实现这一部分。

再次修改index.js
```
import number from './number'
number()

if(module.hot){
  module.hot.accept('./number.js',function(){
    number()
    document.body.removeChild(document.getElementById('number'))
  })
}
```

运行`npm run start`，在浏览器中打开看结果，然后在number.js中修改内容，发现页面显示修改后的内容

---

三、使用Babel处理js文件
---

[Babel](https://babeljs.io/)是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

Babel总共分为三个阶段：解析（parse），转换（transform），生成（generate）。

Babel本身不具有任何转化功能，它把转化的功能都分解到一个个`plugin`里面。因此当我们不配置任何插件时，经过`Babel`输出的代码和输入是相同的。

Babel插件的使用

1. 将插件的名字增加到配置文件中:项目根目录下创建`.babelrc`配置文件或是`webapck.config.js`中配置，一般都是在`.babelrc`中配置。

2. 使用 npm install xxx 进行安装

Babel的配置文件是`.babelrc`，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。

该文件用来设置转码规则和插件，基本格式如下。

```
{
  "presets": [],
  "plugins": []
}

```

---

Babel简单介绍
---

**preset**

preset（预设）就是一系列插件的集合
`@babel/preset-env`包含所有ES6转译为ES5的插件集合

**core-js** 

转换一些内置类(Promise, Symbols等等)和静态方法(Array.from等)。

**@babel/core**

是作为Babel的核心存在，Babel的核心api都在这个模块里面。

**babel-loader**

`babel-loader`在webpack中使用，是webpack和Babel之间的通讯桥梁

**@babel/polyfill介绍**

`@babel/preset-env`默认只转译`js`语法，而不转译新的`API`，比如`Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise`等全局对象，以及一些定义在全局对象上的方法(比如`Object.assign`)都不会转译。这时就必须使用`@babel/polyfill`(内部集成了`core-js`和`regenerator`)。

使用时，在所有代码运行之前增加`import "@babel/polyfill"`

或者是在`webpack.config.js`入口配置

```
module.exports = {
  entry: ["@babel/polyfill", "./app/js"],
}
```

因此必须把`@babel/polyfill`作为`dependencies`而不是`devDependencies`

**@babel/polyfill主要有两个缺点：**

1.使用`@babel/polyfill`需要做些额外配置，实现打包的时候按需引入，否则会把`@babel/polyfill`全部注入代码中会导致打出来的包非常大。

2.`@babel/polyfill`会污染全局变量。

`Babel7`的一个重大变化就是`npm package` 名称的变化，把所有`babel-*`重命名为`@babel/*`，例如：
- `babel-polyfill`重命名为`@babel/polyfill`
- `babel-preset-env`重命名为`@babel/preset-env`

---

Babel在webpack中的用法
---

首先实现对ES6语法的转译

**安装`babel-loader、 @babel/core、@babel/preset-env`**

- `npm i babel-loader -D`
- `npm i @babel/core -D`
- `npm i @babel/preset-env -D`

**`babel-loader@8`需要安装`@babel/core7.x`版本。**

**在webpack.config.js配置**

```
module.exports={
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',         
          options:{
            presets: [
              ["@babel/preset-env",{
                //targets：表示编译出的代码想要支持的浏览器版本
                targets: {
                  chrome: "67"                 
                }
              }]
            ]
          }
        }
      }
    ]
  }
}
```

执行`npm run build`或`npx webpack`就可以看到dist目录下的打包文件，但是只是将ES6的语法进行转译，并没有对ES6新API进行转译，所以我们需要配置`@babel/polyfill`解决这个问题。

>安装`@babel/polyfill`
`npm i @babel/polyfill --save`

在`index.js`中引入`@babel/polyfill`

**index.js**

```
//index.js

import '@babel/polyfill'

let arr=[
  new Promise(()=>{}),
  new Promise(()=>{}),
  2
]

arr.map((item)=>{
  console.log(item)
})
```

引入`@babel/polyfill`前，main.js的大小为29.5KB

![](https://upload-images.jianshu.io/upload_images/9437556-59a80e3e89f8d777.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

引入`@babel/polyfill`后，main.js的大小为1MB

![](https://upload-images.jianshu.io/upload_images/9437556-8b0ae648e4d1c039.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**注意：以上对比都是在没有`targets`这个选项的情况下，因为有些浏览器几乎都支持ES6，在这种情况下，`@babel/preset-env`将不会对代码进行处理。**

这是因为把`@babel/polyfill`对所有API的实现都注入到打包文件中，但是里面很多的API我们在代码中并没有用到，所以需要修改配置，按需引入对应的API。

**修改webpack.config.js配置**

添加`"useBuiltIns": "usage"`以后，需要安装`core-js@2`，并且添加`"corejs": 2`配置项，这时配置选项比较多，需要在项目根目录下新建`.babelrc`文件，在这个文件中配置。

`.babelrc`配置如下：

 - `"useBuiltIns"`属性值为`"usage"`时，会自动引入`@babel/polyfill`，必须保证已经安装了`@babel/polyfill`

 - `"useBuiltIns"`属性值为`"usage"`时，需要添加`"corejs": 2`配置项，否则报错，需要安装`core-js`
 

首先删掉`index.js`中的`import '@babel/polyfill'`

>安装`core-js`
`npm i --save core-js@2`或`npm i --save core-js@3`

```
{
  "presets": [["@babel/preset-env",{
    "useBuiltIns": "usage", //不需要把polly都打包到代码中，根据代码按需转译
    // core-js@３和core-js@２二选一
    //"corejs": 3,  //npm i --save core-js@３
    "corejs": 2  //npm i --save core-js@2
  }]]
}
```

修改`webpack.config.js`，删除`options`对象

```
module.exports={
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
```

执行`npm run build`，打包后的文件大小为`165KB`

![](https://upload-images.jianshu.io/upload_images/9437556-7e2dde1460a060fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

但是，在开发类库或是第三方模块时不适合使用`@babel/polyfill`，所以接下来使用`@babel/plugin-transform-runtime`来解决这个问题。


**@babel/plugin-transform-runtime、@babel/runtime和@babel/runtime-corejs2的用法**

[@babel/runtime-corejs2](https://babeljs.io/docs/en/babel-runtime-corejs2)：是一个包含`Babel modular runtime helpers`和`regenerator-runtime`以及`core-js`的库。

[@babel/runtime](https://babeljs.io/docs/en/babel-runtime#docsNav)：是一个包含`Babel modular runtime helpers`和`regenerator-runtime`的库。

在配置项中`corejs`属性值为默认为`false`，如果需要将`Promise`等`API`进行转译，则需要设置属性值为`2`时，并且安装`@babel/runtime-corejs2`

>安装：
- `npm i @babel/plugin-transform-runtime -D`
- `npm i --save @babel/runtime`
- `npm i --save @babel/runtime-corejs2`

**修改.babelrc文件**
```
{
  "plugins": [
    ["@babel/plugin-transform-runtime",{
      "helpers": true,
      "regenerator": true,
      "useESModules": false,
      "corejs": 2
    }]
  ]
}
```
我们把`presets`配置项去掉了，然后`npm run build`打包，打开打包后的`main.js`查看，虽然把转译了`Promise`，但是ES6新语法并没被转译，例如：`let`没有被转译为`var`。

所以还是需要配置`presets`，因为`"@babel/preset-env"`包含了对所有ES6语法转译为ES5插件。

**再次修改.babelrc文件**
```
{
　"presets": ["@babel/preset-env"],
  "plugins": [
    ["@babel/plugin-transform-runtime",{
      "helpers": true,
      "regenerator": true,
      "useESModules": false,
      "corejs": 2
    }]
  ]
}
```

添加`presets`配置项，然后`npm run build`打包，打开打包后的`main.js`查看，可以看到`let`和箭头函数都被转译为ES5语法了。　


