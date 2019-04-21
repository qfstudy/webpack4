// import './style.css'
// import './main.scss'
import image from './images/11.png'
// import style from './index.scss'

function createImg(){
  let img=new Image()
  img.src=image
  // img.classList.add(style.img)
  let root=document.getElementById('root')
  root.append(img)
}

export default createImg
