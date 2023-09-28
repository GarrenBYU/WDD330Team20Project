import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}


export default class ShoppingCard {
  constructor(key, target) {
  this.key = key;
  this.target =  target;
}

renderBasket(){
  const items = getLocalStorage(this.key);
  if(!items) return;
  const htmlElements = items.map((item)=>cartItemTemplate(item));
  document.querySelector(this.target).innerHTML = htmlElements.join("");
}



renderTotal(){
  const products = getLocalStorage(this.key)
  if(!products) return;
  let sum = 0;
  let total_holder = document.querySelector(".hide");
  
  for(const obj of products)
  {
    obj.FinalPrice ? sum += obj.FinalPrice : sum+=0;
  }
  total_holder.style.display = "block";
  total_holder.textContent = `Total: $${sum.toFixed(2)}`;
}
}
