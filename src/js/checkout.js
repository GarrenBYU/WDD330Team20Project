import ShoppingCard from "./ShoppingCart.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
// import { getLocalStorage } from "./utils.mjs";

const shoppingCart = new ShoppingCard("so-cart", ".cart-total");
const subtotal = shoppingCart.renderTotal(); // I think it needs to be refactored. Function should not perform 2 operations at once
const checkoutProcess = new CheckoutProcess("so-cart", ".cart-total", subtotal);
checkoutProcess.init();

// MODULE DONE!!!

