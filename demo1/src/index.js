// import './style.css'

import image from './images/11.png'
import style from './index.scss'

import createImg from './main.js'

createImg()

let img=new Image()
img.src=image
//style.img .img是scss文件中写好的类名
img.classList.add(style.img)
let root=document.getElementById('root')
root.append(img)