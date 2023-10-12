// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)

  return product;
}

export async function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  document.querySelector("#category_name").textContent = list[0].Category[0].toUpperCase() + list[0].Category.slice(1)
  const products = await list.map((item) => templateFn(item));

  try{
    parentElement.insertAdjacentHTML(position, products.join(''));
  }
  catch{
    
  }
  
  if (clear) {
    parentElement.textContent = '';
  }
  // document.querySelector(parentElement).innerHTML = products.join("");
}


export function renderWithTemplate(templateFn, parentElement, data, callback){

  if(templateFn) parentElement.appendChild(templateFn);
  if (callback) {
    callback(data);
  }
  const products = getLocalStorage('so-cart');
  let superNumber = document.getElementById('amount'); // Here we are going to set amount of items in a bag
  superNumber.textContent = products.length;
  
}
export async function loadTemplate(path) {
  const html = await fetch(path).then((res)=> res.text());

  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content;
}

export async function loadHeaderFooter() {
  let headerElement = document.querySelector("#header");
  let footerElement = document.querySelector("#footer");

  let templateHeaderHTML = await loadTemplate('../partials/header.html');
  let templateFooterHTML =  await loadTemplate('../partials/footer.html');

  renderWithTemplate(templateHeaderHTML, headerElement);
  renderWithTemplate(templateFooterHTML, footerElement);

}

export async function loadSuperNumber() {
  document.addEventListener("DOMContentLoaded", function() {
    let superNumber = document.getElementById('amount');
    //superNumber.textContent = 5;
  });
}

export function alertMessage(message, scroll=true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  const error_message = document.createElement('p');
  error_message.textContent = message

  const close_btn = document.createElement('button');
  close_btn.setAttribute('id', 'alert_btn');
  //close_btn.classList.add('alert_btn');
  close_btn.textContent = 'X';

  alert.appendChild(error_message);
  alert.appendChild(close_btn);

  alert.addEventListener('click', function(e) {
    console.log(e.target.tagName);
    if(e.target.tagName == 'BUTTON') { 
      main.removeChild(this);
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if(scroll) window.scrollTo(0,0);

}

export function removeAllAlerts() {
  let alerts = document.querySelectorAll('.alert');
  alerts.forEach(element => {
    element.remove();
  });
}
