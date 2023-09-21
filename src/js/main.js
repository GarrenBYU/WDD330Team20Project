import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listing = new ProductList("Tents", dataSource, element);

listing.init();