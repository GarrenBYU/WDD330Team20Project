import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.target = listElement;
    }

   

    // renderList(list){
    //     getOnlyOnesWithImages(list).then((fileteredTents) => {
    //         renderListWithTemplate(productCardTemplate, this.listElement, fileteredTents);
    //     })
        
    //     // const htmlStrings = list.map(productCardTemplate);
    //     // if (clear) {
    //     //     parentElement.innerHTML = '';
    //     // }
    //     // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    //     //renderListWithTemplate(productCardTemplate, this.listElement, list);
    // }

    renderList(list) {
        getOnlyWithImage(list) // We are going to fetch everything we need first
        .then((filteredTents) => {
          renderListWithTemplate(productCardTemplate, this.target, filteredTents)
        });
        //console.log(actual_list);
        //renderListWithTemplate(productCardTemplate, this.target, filteredTents)
        // const products = list.map((item) => productCardTemplate(item));
        // console.log(products);
        // document.querySelector(this.target).innerHTML = products.join("");
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list)
    }
}

async function getOnlyWithImage(list) {
    let realProducts = [];

    async function checkFile(item) {
        try{
            const response = await fetch(item.Image);
            if (response.ok) {
                realProducts.push(item);
            } else {
                console.error('There is no such file: ', item.Image);
            }
        }
        catch(error) {
            console.error('There has been an error when looking for the file ', error);
        }
    }
    await Promise.all(list.map((item) => checkFile(item)));
    console.log(realProducts)
    return realProducts;
}