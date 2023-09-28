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
  
  const products =  await list.map((item) => templateFn(item));
  // REMOVED THIS COMMENT
  parentElement.insertAdjacentHTML(position, products.join(''));
  if (clear) {
    parentElement.textContent = '';
  }
  // document.querySelector(parentElement).innerHTML = products.join("");
}


export function renderWithTemplate(templateFn, parentElement, data, callback){

  parentElement.appendChild(templateFn);
  if (callback) {
    callback(data);
  }
  
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
  console.log(templateHeaderHTML)
  renderWithTemplate(templateHeaderHTML, headerElement);
  renderWithTemplate(templateFooterHTML, footerElement);



}