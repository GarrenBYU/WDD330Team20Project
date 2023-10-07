import { getLocalStorage, renderWithTemplate } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Images.PrimaryMedium}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <button id ='${item.Id}' class="remove-btn" '>X Remove item</button>
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
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      removeCard(button);
      //this.renderBasket();
      this.renderTotal();
    });
  });
}



renderTotal(){
  const products = getLocalStorage(this.key)
  if(products.length == 0) return;
  let sum = 0;
  let total_holder = document.querySelectorAll(".hide");
  let shoppingCard_holder = document.querySelector(".hide");

  for(const obj of products)
  {
    obj.FinalPrice ? sum += obj.FinalPrice : sum+=0;
  }
  //total_holder.style.display = "block";
  //total_holder.map((element) => element.style.display = "block");
  for(const element of total_holder)
  {
    element.style.display = "block"
  }
  //console.log(total_holder);
  shoppingCard_holder.textContent = `Total: $${sum.toFixed(2)}`;
  return sum.toFixed(2);
}
}


function removeCard(btn) {
  console.log(btn.id);
  btn.parentElement.style.display= 'none'; // Hiding the card from DOM

  const items = getLocalStorage('so-cart'); // Getting items from storage 
  const indexToDelete = items.findIndex(item => item.Id === btn.id); // We need an index to correctly delete an item
  if (indexToDelete !== -1) {
    items.splice(indexToDelete, 1);
    localStorage.setItem('so-cart', JSON.stringify(items)); // refreshing the local storage
  }
  renderWithTemplate();
  console.log(localStorage);
  console.log(getLocalStorage('so-cart'));

}
