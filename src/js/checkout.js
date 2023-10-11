import ShoppingCard from "./ShoppingCart.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
// import { getLocalStorage } from "./utils.mjs";

const shoppingCart = new ShoppingCard("so-cart", ".cart-total");
const subtotal = shoppingCart.renderTotal(); // I think it needs to be refactored. Function should not perform 2 operations at once
const checkoutProcess = new CheckoutProcess("so-cart", ".cart-total", subtotal);
checkoutProcess.init();


const form = document.querySelector("form");
form.addEventListener("submit", (event) => checkoutProcess.checkout(event, form));
// MODULE DONE!!!

document.querySelector('#checkoutSubmit').addEventListener('submit', (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status)
    myCheckout.checkout();
  });