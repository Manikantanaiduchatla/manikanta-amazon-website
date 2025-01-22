export let cart=JSON.parse(localStorage.getItem('cart'));
 
if(!cart){
    [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:6
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:4
    },{
        productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity:8
    }];
}
export function addToCart(productId,quantity){
    let matchingItem;
    cart.forEach((item)=>{
        if(item.productId===productId){
            matchingItem=item;
        }
    });
    if(matchingItem){
        matchingItem.quantity+=quantity;
    }else{
        cart.push({
            productId,
            quantity
        });
    }
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function removeCartItem(productId){
    let newCart=[];
    cart.forEach(item=>{
        if(item.productId!==productId){
            newCart.push(item);
        }
    });
    cart=newCart;
    saveToStorage();
}
