import ShoppingCard from "./ShoppingCart.mjs";
import { getLocalStorage } from "./utils.mjs";


export default class CheckoutProcess {
    constructor(key, outputSelector, subtotal) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.subtotal = subtotal;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.itemTotal = this.calculateItemSummary(this.list);
    }
  
    calculateItemSummary(products) {
      // calculate and display the total amount of the items in the cart, and the number of items.
      let count = 0;
      for(const product of products)
      {
        count += 1;
      }
      return count
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.shipping = 10 + ((this.itemTotal - 1) * 2);
      this.tax = Number(this.subtotal) * 0.06;
      
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      document.querySelector(".cart-total").textContent += Number(subtotal).toFixed(2);
      document.querySelector(".shipping-estimate").textContent += shippingPrice.toFixed(2);
      document.querySelector(".tax").textContent += tax.toFixed(2);
      document.querySelector(".order-total").textContent += orderTotal.toFixed(2);
    }
  }