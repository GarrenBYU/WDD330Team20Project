function productListingTemplate(products) {

    
    const productHTMLTemplates = products.map(product => `
        <li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">${product.ListPrice}</p>
            </a>
        </li>
    `);

  
    return productHTMLTemplates.join('');
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    
    getData() {
        return fetch(this.path)
          .then(convertToJson)
          .then((data) => data);
    }
 
    renderProductList(list) {
        const element = document.querySelector(this.listElement)
        element.insertAdjacentHTML("afterbegin", productListingTemplate(list))
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderProductList(list)


    }
}