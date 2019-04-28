//同步
import _ from 'lodash'

console.log(_.join(['lodash', 'babel', 'webpack'], '-'))

//异步
//getComponent:webpack方法
// function getComponent(){
//   return import(/* webpackChunkName:"lodash" */'lodash').then(({default: _})=>{
//     var element=document.createElement('div')
//     element.innerHTML=_.join(['lodash', 'babel', 'webpack'], '-')
//     return element
//   })
// }

// getComponent().then(element=>{
//   document.body.appendChild(element)
// })