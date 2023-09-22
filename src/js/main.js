import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const element = document.querySelector(".product-list");

const product = new ProductData('tents');
const productList = new ProductListing(product.category, product, element);
productList.init();
