//通过改style.css样式测试热模块替换效果
import './style.css'

var btn = document.createElement('button')
btn.innerHTML='新增'
document.body.appendChild(btn)

btn.onclick=function(){
  var div=document.createElement('div')
  div.innerHTML='items'
  document.body.appendChild(div)
}

//样式和js的热模块替换有点区别
//js要达到热模块替换的效果，得要if(module.hot){}这一部分代码
//css样式因为css-loader已经支持if(module.hot){}这一部分，所以不需要单独实现这一部分
import number from './number'
import add from './add'
add()
number()

if(module.hot){
  module.hot.accept('./add.js',function(){
    add()
    document.getElementById('root').removeChild(document.getElementById('add'))
  })
  module.hot.accept('./number.js',function(){
    number()
    document.body.removeChild(document.getElementById('number'))
  })
}