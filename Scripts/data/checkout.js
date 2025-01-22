import {cart,removeCartItem} from './cart.js';
import {products} from './products.js';

hello();

let cartSummaryHtml='';
cart.forEach((cartItem)=>{
    const prodId=cartItem.productId;
    let matchingItem;
    products.forEach((product)=>{
        if(product.id===prodId){
            matchingItem=product;
        }
        
    });

    cartSummaryHtml+=`
        <div class="outer-order-summary">
            <div class="order-summary js-outer-order-summary-${matchingItem.id}">
                <div class="cart-summary">
                    <div class="delivery-date">
                        Delivery date: Tuesday, January 28
                    </div>
                    <div class="cart-item-grid">
                        <img src=${matchingItem.image} class="product-image">
                        <div class="cart-item-details">
                            <div class="product-name">
                                ${matchingItem.name}
                            </div>
                            <div class="product-price">Rs.${((matchingItem.priceCents)/100).toFixed(2)}</div>
                            <div class="product-quantity">
                                Quantity : <span class="quantity js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                                <span class="js-updating-button update-button" data-product-id=${matchingItem.id}>Update</span>
                                <input type="number" class="input-class js-input-block-${matchingItem.id}">
                                <span class="js-save-button save-button" data-product-id=${matchingItem.id}>Save</span>
                                <span class="js-deleting-button delete-button" data-product-id=${matchingItem.id}>Delete</span>
                            </div>
                        </div>
                        <div class="delivery-details">
                            <div class="delivery-title">Choose a delivery Option: </div>
                            <div class="radio-block1">
                                <div class="radio-input1">
                                    <input type="radio" name="radio-${matchingItem.id}">
                                </div>
                                <div class="radio-label1">
                                    <label for="radio-${matchingItem.id}">Wednesday, June 12</label>
                                </div>
                                
                            </div>
                            <div class="radio-down1">
                                FREE Shipping
                            </div>
                            <div class="radio-block1">
                                <div class="radio-input1">
                                    <input type="radio" name="radio-${matchingItem.id}">
                                </div>
                                <div class="radio-label1">
                                    <label for="radio-${matchingItem.id}">Thursday, August 22</label>
                                </div>
                                
                            </div>
                            <div class="radio-down1">
                                Rs.300 - Shipping
                            </div>
                            <div class="radio-block1">
                                <div class="radio-input1">
                                    <input type="radio" name="radio-${matchingItem.id}">
                                </div>
                                <div class="radio-label1">
                                    <label for="radio-${matchingItem.id}">Tuesday, January 21</label>
                                </div>
                                
                            </div>
                            <div class="radio-down1">
                                Rs.500 - Shipping
                            </div>
                        </div>
                </div>
            </div>
        </div>
    `;

});
function updateNumbers(){
    let cartNumber=0;
    cart.forEach(item=>{
        cartNumber+=item.quantity;
    });
    if(cartNumber===0){
        document.querySelector('.js-header-number').innerHTML='';
    }else{
        document.querySelector('.js-header-number').innerHTML=cartNumber;
    }
}
document.querySelector('.js-order-summary').innerHTML=cartSummaryHtml;
document.querySelectorAll('.js-deleting-button').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        removeCartItem(productId);
        updateNumbers();
        const container=document.querySelector(`.js-outer-order-summary-${productId}`);
        container.remove();
    });
});
document.querySelectorAll('.js-updating-button').forEach(link=>{
    link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        const container=document.querySelector(`.js-outer-order-summary-${productId}`);
        container.classList.add('is-editing-quantity');
        const defaultValue=document.querySelector(`.js-quantity-label-${productId}`).innerHTML;
        document.querySelector(`.js-input-block-${productId}`).value=defaultValue;
    });
});
document.querySelectorAll('.js-save-button').forEach(link=>{
    link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        const container=document.querySelector(`.js-outer-order-summary-${productId}`);
        container.classList.remove('is-editing-quantity'); 
        const value=Number(document.querySelector(`.js-input-block-${productId}`).value);
        if(value<0 || value>=100){
            alert("Not a valid quantity");
            return;
        }
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML=value;
        cart.forEach(item=>{
            if(item.productId===productId){
                item.quantity=value;
            }
            updateNumbers();
        })
        localStorage.setItem('cart',JSON.stringify(cart));        
    });
});

updateNumbers();









