import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const product = new ProductData('tents');

const productList = new ProductListing(product.category, product, ".product-list");
productList.init();
