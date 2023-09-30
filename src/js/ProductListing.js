import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

const element = document.querySelector(".product-list");

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);

const category = searchParams.get('category'); 
console.log(category);
const product = new ProductData(category);
const data = await product.getData(category);

const listing = new ProductList(category, data, element);
// const dataSource = new ProductData("tents");
// const element = document.querySelector(".product-list");
// const listing = new ProductList("Tents", dataSource, element);

listing.init();
loadHeaderFooter();


// const category = getParam('category');
// console.log(category);
// // first create an instance of our ProductData class.
// const dataSource = new ProductData();
// // then get the element we want the product list to render in
// const listElement = document.querySelector('.product-list');
// // then create an instance of our ProductList class and send it the correct information.
// const myList = new ProductList(category, dataSource, listElement);
// // finally call the init method to show our products
// myList.init();
