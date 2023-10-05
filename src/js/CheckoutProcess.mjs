import { getLocalStorage } from "./utils.mjs";


export default class CheckoutProcess {
    constructor(key, outputSelector, subtotal) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = Number(0);
      this.subtotal = Number(subtotal);
      this.shipping = Number(0);
      this.tax = Number(0);
      this.orderTotal = Number(0);
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.itemTotal = this.calculateItemSummary(this.list);
      this.calculateOrdertotal();
      //console.log(this.list, this.itemTotal);
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
      this.tax = this.subtotal * 0.06;
      this.orderTotal = this.subtotal + this.tax + this.shipping;

      //console.log(this.list, this.itemTotal);
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      //document.querySelector(".cart-total").textContent += this.subtotal.toFixed(2);
      document.querySelector(".shipping-estimate").textContent += this.shipping.toFixed(2);
      document.querySelector(".tax").textContent += this.tax.toFixed(2);
      document.querySelector(".order-total").textContent += this.orderTotal.toFixed(2);
    }
  }
