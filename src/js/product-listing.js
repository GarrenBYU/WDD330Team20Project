import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
const element = document.querySelector(".product-list");
const category = getParam('category');

const product = new ProductData(category);
const listing = new ProductList(product.category, product, element);


listing.init();
