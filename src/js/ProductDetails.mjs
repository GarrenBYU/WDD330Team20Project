import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  let discount =  product.FinalPrice / product.SuggestedRetailPrice * 100
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryExtraLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice} - <s>$${product.SuggestedRetailPrice}</s> <strong class="discount">${discount.toFixed()}%</strong> off!</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `/products/search/${id}`);
    const data = await convertToJson(response);
    return data.Result
  }

  addToCart() {
   // setLocalStorage("so-cart", [this.product]);
    let oldCartContent = getLocalStorage("so-cart");
    if (oldCartContent) {
      setLocalStorage("so-cart", [...oldCartContent, this.product]);
    } else {
      setLocalStorage("so-cart", [this.product]);
    }
  }


  renderProductDetails(product) {
    const element = document.querySelector("main");
    
    element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    console.log(element);
    
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML

    this.renderProductDetails("main");
    //this.renderProductDetails(this.product);
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }
  // addToCart() {
  //   setLocalStorage("so-cart", this.product);
    // let oldCartContent = getLocalStorage("so-cart");
    // if (oldCartContent) {
    //   setLocalStorage("so-cart", [...oldCartContent, this.product]);
    // } else {
    //   setLocalStorage("so-cart", [this.product]);
    // }
  // }
  // getData() {
  //   return fetch(this.path)
  //     .then(convertToJson)
  //     .then((data) => data);
  // }
  // async findProductById(id) {
  //   const products = await this.getData();
  //   return products.find((item) => item.Id === id);
  // }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    
    element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    //console.log(element);
    
  }
}
