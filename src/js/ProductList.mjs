import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import {renderListWithTemplate} from "./utils.mjs";



function productModalTemplate(product) {
  let discount =   ((product.SuggestedRetailPrice - product.FinalPrice)/product.SuggestedRetailPrice ) * 100
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryExtraLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice} - <s>$${product.SuggestedRetailPrice}</s> <strong class="discount">${discount.toFixed()}%</strong> off!</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}


function productCardTemplate(product) {
    return `
            <li class="product-card">
            <a href="/product_pages/?category=${product.Category}&product=${product.Id}">
              <img
                src="${product.Images.PrimaryLarge}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">$${product.ListPrice}</p></a
            >
            <button class="quick_view" product-id="${product.Id}">Quick view</button>
          </li>`
}
export default class ProductListing {
    constructor(category, dataSource, target) {
    this.category = category;
    this.dataSource = dataSource;
    this.target = target;
  }

  renderList(list) {
    // getOnlyWithImage(list) // We are going to fetch everything we need first
    // .then((filteredTents) => {
      renderListWithTemplate(productCardTemplate, this.target, list)
    // });
    //console.log(actual_list);
    //renderListWithTemplate(productCardTemplate, this.target, filteredTents)
    // const products = list.map((item) => productCardTemplate(item));
    // console.log(products);

  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    await this.renderList(list)
    const dataSource = new ExternalServices(this.category)
    
    console.log(dataSource)
    document.querySelectorAll(".quick_view").forEach(element => element.addEventListener("click", async ()=> {
      let productId =  element.getAttribute('product-id')
     console.log(productId)
      let product = new ProductDetails(productId, dataSource, "#modal-content")
      product.init()
      // let productItem = await product.findProductById(productId)
      // console.log(productItem)
      document.querySelector("#modal-container").style.display = "block"
      // document.querySelector("#modal-content").innerHTML += productModalTemplate(productItem)
    }))
  }
}

// async function getOnlyWithImage(list) {
//   console.log(list);
//   let real_existing_products = [];

//   async function checkFile(item) {
//     try {
//       const response = await fetch(item.Image); // Wait till fetch image from recourse item.Image
//       if (response.ok) { // We have it? Responce 200?
//         real_existing_products.push(item); // Good! Push it!
//       } else { // No?
//         console.error('Ooops! No such file in your project: ', item.Image); // Skip it!
//       }
//     } catch (error) {
//       console.error('An error occured when checking file: ', error); 
//     }
//   }

  // await Promise.all(list.map((item) => checkFile(item)));  // Checking each tent image and waiting for all of them had been checked
  // return real_existing_products;
// }
