import ShoppingCard from "./ShoppingCart.mjs";
// import { getLocalStorage } from "./utils.mjs";

// // const shoppingCart = new ShoppingCard("so-cart", ".cart-total");
// // shoppingCart.renderTotal();
//const subtotal = shoppingCart.renderTotal();
const sub = ShoppingCard.renderTotal();
console.log(sub);
// // const productsCount = countProducts()
// // const shippingPrice = 10 + ((productsCount - 1) * 2);
// // const tax = Number(subtotal) * 0.06;
// // const orderTotal = Number(subtotal) + shippingPrice + tax;


// function countProducts(){
//     let count = 0;
//     const products = getLocalStorage("so-cart");
//     for(const product of products)
//     {
//       count += 1;
//     }
//     return count
// }

import CheckoutProcess from "./CheckoutProcess.mjs";
const checkoutProcess = new CheckoutProcess("so-cart", ".cart-total", subtotal);
