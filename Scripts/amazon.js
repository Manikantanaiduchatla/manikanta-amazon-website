// "as" used to modify the name of the variable which was imported..
// import {products as productsName} from './data/products.js';

import {products} from './data/products.js';
import {addToCart,cart} from './data/cart.js';
let cartValue=0;
cart.forEach((item)=>{
    cartValue+=item.quantity;
});
if(cartValue===0){
    document.querySelector('.js-cart-quantity').innerHTML='';
}
else{
    document.querySelector('.js-cart-quantity').innerHTML=cartValue;
}
let productHTML='';
products.forEach((product)=>{
    productHTML+=`<div class="product-container">
                    <div class="product-image-container">
                        <img class="product-image" src=${product.image}>
                    </div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-rating-container">
                        <img src=${product.rating.stars} class="product-rating">
                        <div class="product-rating-number">${product.rating.count}</div>
                    </div>
                    <div class="product-price">Rs. ${(product.priceCents/100).toFixed(2)}</div>
                    <div class="product-quantity-container">
                        <select class="quantity-selector js-quantity-selector-${product.id}">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div class="product-spacer js-product-spacer-${product.id}">
                        <img src="img/checkmark.png" class="space-image">
                        <div>Added</div>
                    </div>
                    <div class="add-to-cart-section">
                        <button class="add-to-cart-button js-add-to-cart"
                            data-product-id="${product.id}"
                        >Add to Cart</button>
                    </div>
                </div>`;
});
document.querySelector('.js-products').innerHTML=productHTML;

export function updateCartQuantity(quantity){
    cartValue+=quantity;
    document.querySelector('.js-cart-quantity').innerHTML=cartValue;
}

document.querySelectorAll('.js-add-to-cart')
 .forEach((button)=>{
    button.addEventListener('click',()=>{
        const prodId=button.dataset.productId;
        const cartQuantity=document.querySelector(`.js-quantity-selector-${prodId}`);
        const quantity=Number(cartQuantity.value);
        
        addToCart(prodId,quantity);
        updateCartQuantity(quantity);

        const message=document.querySelector(`.js-product-spacer-${prodId}`);
        message.classList.add('message-visible');
        setTimeout(()=>{
            message.classList.remove('message-visible');
        },2000);
    });
});



