import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  console.log(item);
  const newItem = `<li class='cart-card divider'>
  <button id ='${item.Id}' class="remove-btn" '>X</button>
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

      // Находим все кнопки удаления и добавляем слушатели события
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

function removeCard(btn) {
  console.log(btn.id);
  btn.parentElement.style.display= 'none'; // Hiding the card from DOM

  const items = getLocalStorage('so-cart'); // Getting items from storage 
  const indexToDelete = items.findIndex(item => item.Id === btn.id); // We need an index to correctly delete an item
  if (indexToDelete !== -1) {
    items.splice(indexToDelete, 1);
    localStorage.setItem('so-cart', JSON.stringify(items)); // resfreshing the local storage
  }

  console.log(localStorage);
  console.log(getLocalStorage('so-cart'));

}
