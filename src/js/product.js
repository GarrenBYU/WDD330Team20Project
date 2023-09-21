import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Variables
const dataSource = new ProductData("tents");
const productId = getParam('product');

console.log(dataSource.findProductById(productId));


function addProductToCart(product) {
  let oldCartContent = getLocalStorage("so-cart");
  if (oldCartContent) {
    setLocalStorage("so-cart", [...oldCartContent, product]);
  } else {
    setLocalStorage("so-cart", [product]);
  }
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);


