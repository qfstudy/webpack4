function add(){
  var div=document.createElement('div')
  div.innerHTML=9
  div.setAttribute("id","add")
  let root=document.getElementById('root')
  root.appendChild(div)
}

export default add