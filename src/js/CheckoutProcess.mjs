import { getLocalStorage, alertMessage, removeAllAlerts, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const externalServices = new ExternalServices()
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

    async checkout(event, form) {
      event.preventDefault();
      const formData = new FormData(form),
      convertedJSON = {}

      let orderDate = new Date;
      formData.forEach(function (value, key) {
        convertedJSON[key] = value;
      });
     
  
      const simplifiedData = packageItems(this.list);
      convertedJSON["orderDate"] = orderDate
      convertedJSON["items"] = simplifiedData
      try {
        const res = await externalServices.checkout(convertedJSON);
        console.log(res);
        setLocalStorage("so-cart", []);
        location.assign("/checkout/success.html");
      } catch (err) {
        // get rid of any preexisting alerts.
        removeAllAlerts();
        for (let message in err.message) {
          alertMessage(err.message[message]);
        }
      }

      // try {
      //   const checkoutForm = document.forms[0];
      //   const check_status = checkoutForm.checkValidity();
      //   checkoutForm.reportValidity();
      //   externalServices.checkout(convertedJSON)
            
      //   if(check_status) {
      //     window.location.href = "success.html";
      //     localStorage.clear();
      //   }
      // } 
      // catch(error) {

      // }
    
    }
  }


  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(cartItems) {
  if (!cartItems || !Array.isArray(cartItems)) {
    return []; 
  }

  function simplifyCartItem(item) {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    };
  }

  const simplifiedCart = cartItems.map(simplifyCartItem);

  return simplifiedCart;
}


