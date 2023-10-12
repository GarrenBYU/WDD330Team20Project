const baseURL = import.meta.env.VITE_SERVER_URL
const checkoutServerURL = import.meta.env.VITE_CHECKOUT_SERVER_URL;
// test for redeployment
console.log(checkoutServerURL)
async function convertToJson(res) {
  const response = await res.json();
  if (res.ok) {
    return response;
  } else {
    throw { name: 'servicesError', message: response };
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

    //const response = await fetch(checkoutServerURL, options);
    return await fetch(checkoutServerURL, options).then(convertToJson);
   // return await fetch(baseURL + "checkout/", options).then(convertToJson);
    // if(response.ok) {
    //   console.log(response) 
    // } else {
    //   console.group("error")
    // }
  }
}
