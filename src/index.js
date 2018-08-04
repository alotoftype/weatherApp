import './sass/main.scss';

const component = () => {
  var element = document.createElement('div');
  element.classList.add('root');
  return element;

}

document.body.appendChild(component());
