import _ from 'lodash';
import myImage from './my-image.jpg';
import './style.css';
import myName from './myName';
import {functionOne, functionTwo} from './namedExport';

function hedercomponent() {
  var element = document.createElement('h2');
  // use your function!
  element.innerHTML = myName('Houda');
  return element;
}

function divcomponent() {
  const element = document.createElement('div');
// Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  return element;
}

function divImageComponent() {
  const element = document.createElement('div');
  element.classList.add('image_container');

  const img = new Image();
  img.src = myImage;
  
  element.appendChild(img);

  return element;
}

document.body.appendChild(hedercomponent());
document.body.appendChild(divcomponent());
document.body.appendChild(divImageComponent());

functionOne();
functionTwo();