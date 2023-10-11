import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter, loadSuperNumber } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();
loadSuperNumber();
const shoppingCart = new ShoppingCart('so-cart', '.product-list');
shoppingCart.renderBasket();
shoppingCart.renderTotal();

document.querySelector('#checkoutSubmit')
.addEventListener('submit', (e) => {
  e.preventDefault();
  myCheckout.checkout();
});


// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");

//   // fix for the empty cart error
//   if (cartItems != null) {
//     const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//     document.querySelector(".product-list").innerHTML = htmlItems.join("");
//   }
  
// }
// function cartItemTemplate(item) {
//   const newItem = `<li class='cart-card divider'>
//   <a href='#' class='cart-card__image'>
//     <img
//       src='${item.Image}'
//       alt='${item.Name}'
//     />
//   </a>
//   <a href='#'>
//     <h2 class='card__name'>${item.Name}</h2>
//   </a>
//   <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
//   <p class='cart-card__quantity'>qty: 1</p>
//   <p class='cart-card__price'>$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();

// function renderTotal(){
//   const products = getLocalStorage('so-cart')
//   if(!products) return;
//   let sum = 0;
//   let total_holder = document.querySelector(".hide");
  
//   for(const obj of products)
//   {
//     obj.FinalPrice ? sum += obj.FinalPrice : sum+=0;
//   }
  
//   total_holder.style.display = "block";
//   total_holder.textContent = `Total: $${sum}`;
// }

// renderCartContents();
// renderTotal();
// loadHeaderFooter()

