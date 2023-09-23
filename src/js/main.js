import ProductListing from './ProductListing.mjs';
import ProductData from "./ProductData.mjs";


const dataSource = new ProductData("tents")
const productList = new ProductListing("tents", dataSource, ".product-list")
productList.init()