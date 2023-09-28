import {renderListWithTemplate} from "./utils.mjs";
function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">$${product.ListPrice}</p></a
            >
          </li>`
}
export default class ProductListing {
    constructor(category, dataSource, target) {
    this.category = category;
    this.dataSource = dataSource;
    this.target = target;
  }

  renderList(list) {
    getOnlyWithImage(list) // We are going to fetch everything we need first
    .then((filteredTents) => {
      renderListWithTemplate(productCardTemplate, this.target, filteredTents)
    });
    //console.log(actual_list);
    //renderListWithTemplate(productCardTemplate, this.target, filteredTents)
    // const products = list.map((item) => productCardTemplate(item));
    // console.log(products);

  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list)
  }
}

async function getOnlyWithImage(list) {
  console.log(list);
  let real_existing_products = [];

  async function checkFile(item) {
    try {
      const response = await fetch(item.Image); // Wait till fetch image from recourse item.Image
      if (response.ok) { // We have it? Responce 200?
        real_existing_products.push(item); // Good! Push it!
      } else { // No?
        console.error('Ooops! No such file in your project: ', item.Image); // Skip it!
      }
    } catch (error) {
      console.error('An error occured when checking file: ', error); 
    }
  }

  await Promise.all(list.map((item) => checkFile(item)));  // Checking each tent image and waiting for all of them had been checked
  return real_existing_products;
}