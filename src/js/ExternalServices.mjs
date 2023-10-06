const baseURL = import.meta.env.VITE_SERVER_URL
const checkoutServerURL = import.meta.env.VITE_CHECKOUT_SERVER_URL;

console.log(checkoutServerURL)
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
  this.category = category;
  }
  
  async getData() {
    const response = await fetch(baseURL + `/products/search/${this.category}`);
    const data = await convertToJson(response);
    return data.Result
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async checkout(order) {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order),
      
    }

    const response = await fetch(checkoutServerURL, options);
    if(response.ok) {
      console.log(response) 
    } else {
      console.group("error")
    }
  }
}
