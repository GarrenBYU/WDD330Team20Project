import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const element = document.querySelector(".product-list");
const category = getParam('category');

const product = new ProductData(category);
const listing = new ProductList(product.category, product, element);
// const dataSource = new ProductData("tents");
// const element = document.querySelector(".product-list");
// const listing = new ProductList("Tents", dataSource, element);

listing.init();

loadHeaderFooter();