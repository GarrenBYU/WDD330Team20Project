import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductDetails from './ProductDetails.mjs';
import ExternalServices from "./ExternalServices.mjs";

// Variables


const productId = getParam('product');
const category = getParam('category');
const dataSource = new ExternalServices(category);
//console.log(await dataSource.findProductById(productId));
console.log(dataSource)
const product = new ProductDetails(productId, dataSource, "main");
product.init();


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



