/*
１．测试图片引入效果
２．测试css和scss文件的打包效果
*/
// import image from './images/11.png'
// import './css/style.css'
// import './css/index.scss'

// let img=new Image()
// img.src=image
// document.body.append(img)

/*这一部分是css模块化 */
import image from './images/11.png'
import style from './css/style.css'
// import style from './css/index.scss'

let img=new Image()
img.src=image

//style.img .img是scss文件中写好的类名
img.classList.add(style.img)

document.body.append(img)