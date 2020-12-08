import _ from 'lodash';
import myName from './myName';

function divcomponent() {
  const element = document.createElement('div');
// Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}

function hedercomponent() {
  var element = document.createElement('h2');

  // use your function!
  element.innerHTML = myName('Houda');
  return element;
}

document.body.appendChild(hedercomponent());

document.body.appendChild(divcomponent());