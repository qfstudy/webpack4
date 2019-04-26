// import "@babel/polyfill"
//设置 "useBuiltIns": "usage",可以不用import "@babel/polyfill"，自动引入
let arr=[
  new Promise(()=>{}),
  new Promise(()=>{}),
  2
]

arr.map((item)=>{
  console.log(item)
})