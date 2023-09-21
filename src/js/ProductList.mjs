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
    const products = list.map((item) => productCardTemplate(item));
    console.log(products);
    document.querySelector(this.target).innerHTML = products.join("");
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list)
  }
}
