import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";
const element = document.querySelector(".product-list");
const category = getParam('category');

const product = new ExternalServices(category);
const listing = new ProductList(product.category, product, element);

document.querySelector("#close-modal").addEventListener("click", ()=> {
    document.querySelector("#modal-container").style.display = "none"
})
listing.init();
