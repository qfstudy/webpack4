//tree shaking import export
import {cube} from './math.js'

let component = () => {
  let element = document.createElement('pre')
  element.innerHTML = [
    'Hello webpack!',
    '2 cubed is equal to ' + cube(2)
  ].join('\n\n');
  console.log(cube)
  
  return element;
}
document.body.appendChild(component());