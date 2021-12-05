// variable declaration zone 

const cart = [];

/** CHECK PRODUCT REFERENCE VALIDITY
 * reference must be unique and match the pattern / regex
 * check if reference match the regex and then compare in with products already store in localStorage
 * @param {*} productRef 
 * @returns null if doesn't match the regex, false if not unique, the reference is match and is unique
 */
function checkProductReferenceValidity(productRef){
  const regex = /[a-z]{2}-{1}[0-9]{3}/;
  let refMatch = productRef.match(regex);
  let productsList = Object.keys(localStorage);

  // if productRef match the regex, check if product in the list already have the same reference
  if(refMatch){
    for( var i = 0; i < productsList.length; i++){ 
        if ( productsList[i] === productRef) {
          refMatch =  false
        }
    }
  }
  return refMatch
}

/** STORE NEW PRODUCT IN LOCAL STORAGE
 * create a object with the form data and store it LocalStorage
 * display the product list
 * @param {*} formData take the form as params
 */
function storeNewProductInLocalStorage(formData){
  let newProduct = {
    reference: formData.get('reference'),
    name: formData.get('name'),
    stock: formData.get('stock'),
    // description: formData.get('description'),
    // quantity: formData.get('quantity'),
    price: formData.get('price')
  }
  // stringify and store in localStorage the new product with a name === its reference
  newProduct_json = JSON.stringify(newProduct);
  localStorage.setItem(formData.get('reference'), newProduct_json);
  // launch display of product table
  displayProductsList()
}

/** SET PRODUCT LIST BUTTONS ACTIONS
 * add eventListener on buttons buy and delele
 * button buy call function addProductToCart
 * button delete call function adeleteProduct
 */
function setProductListButtonsActions(){
  let buttonsBuy = document.getElementsByClassName('buttonBuy');
  let buttonsDelete = Array.from(document.getElementsByClassName('buttonDelete'));
  // add eventListener on product buy button
  Array.from(buttonsBuy).forEach((button) => {
    button.addEventListener("click", (e) => {
      // store product reference looking at row parent id and send to function
      let productRef = e.target.parentElement.parentElement.id
      addProductToCart(productRef)
    })
  })
  // add eventListener on product delete button and send to delete poduct 
  Array.from(buttonsDelete).forEach((button) => {
    button.addEventListener("click", (e) => {
      // store product reference looking at row parent id and send it tot the function
      let productRef = e.target.parentElement.parentElement.id
      deleteProduct(productRef)
    })
  })
}


/** ADD PRODUCT TO CART
 * button buy check stock, add product to cart, increase quantity if already in cart
 * decrease product stock and call views function
 * @param {*} productRef 
 */
function addProductToCart(productRef){
  // check stock
  if (controlProductStock(productRef) === true) {
    let inCart = false;
    // check if product is already in cart, if true change quantity
    for( var i = 0; i < cart.length; i++){ 
      if ( cart[i][0] === productRef) {
        cart[i][1] += 1;
        inCart = true;
      }
    }
    // if product not already in cart add it
    if(inCart === false){
      let cartItem = [productRef, 1]
      cart.push(cartItem);
    }
    // update the stock, display product list, remove cart view, and display it again
    decreaseProductStock(productRef)
    updateViews()
  } else {
    alert('stock insufisant');
  }
}

/** DELETE PRODUCT
 * delete product from localStorage, delete it also from cart if present
 * @param {*} productRef 
 */
function deleteProduct(productRef){
  // remove product from localStorage
  localStorage.removeItem(productRef)
  removeProductList();
  if(Object.keys(localStorage).length > 0){
    displayProductsList()
  }
  // remove product from cart
  for( let i = 0; i < cart.length; i++){ 
    if ( cart[i][0] === productRef) {
      cart[i][1] -= 1;
        cart.splice(i, 1); 
    }
  }
  // delete, display the views
  removeCart()
  displayCart(cart);
}

/** SET CART BUTTONS ACTIONS
 * add eventListener on cart buttons add and sub
 * button add call addExtraProductToCart function
 * button sub call removeProductFromCart function
 */
function setCartButtonsActions(){
  let buttonsAdd = document.getElementsByClassName('buttonAdd');
  let buttonsSub = Array.from(document.getElementsByClassName('buttonSub'));
  // add eventListener on cart add button
  Array.from(buttonsAdd).forEach((button) => {
    button.addEventListener("click", (e) => {
      // store product reference looking at row parent id and send to function
      let productRef = e.target.parentElement.parentElement.id
      addExtraProductToCart(productRef)
    })
  })
  // add eventListener on product delete button and send to delete poduct 
  Array.from(buttonsSub).forEach((button) => {
    button.addEventListener("click", (e) => {
      // store product reference looking at row parent id and send it tot the function
      let productRef = e.target.parentElement.parentElement.id
      removeProductFromCart(productRef);
    })
  })
}

/** ADD EXTRA PRODUCT TO CART
 * check product stock, if in stock add an extra quantity - else alert of insufficient quantity
 * decrease the stock and update the views
 * @param {*} productRef 
 */
function addExtraProductToCart(productRef){
  // check stock
  if (controlProductStock(productRef) === true) {
    for( var i = 0; i < cart.length; i++){ 
      if ( cart[i][0] === productRef) {
        cart[i][1] += 1;
      }
    }
    // decrease the stock
    decreaseProductStock(productRef);
    // remove cart view, and display it again
    updateViews();
  } else {
    alert('stock insufisant');
  }
}

/** REMOVE PRODUCT FROM CART
 * decrease quantity of product, if quantity === 0 remove product from cart
 * increase stock, updates views
 * @param {*} productRef 
 */
function removeProductFromCart(productRef){
  for( var i = 0; i < cart.length; i++){ 
    if ( cart[i][0] === productRef) {
      cart[i][1] -= 1;
      // if quantity === 0 remove product from cart
      if(cart[i][1] === 0){
        cart.splice(i, 1); 
      }
    }
  }
  // remove cart view, and display it again
  increaseProductStock(productRef)
  updateViews()
};

/** DECREASE PRODUCT STOCK
 * substract one to product stock and store it back to localStorage
 * @param {*} productRef 
 */
function decreaseProductStock(productRef){
  let product = JSON.parse(localStorage.getItem(productRef));
  product.stock -= 1
  product_json = JSON.stringify(product);
  localStorage.setItem(product.reference, product_json);
}

/** INCREASE PRODUCT STOCK
 * add one extra to product stock and store it back to localStorage
 * @param {*} productRef 
 */
function increaseProductStock(productRef){
  let product = JSON.parse(localStorage.getItem(productRef));
  product.stock += 1
  product_json = JSON.stringify(product);
  localStorage.setItem(product.reference, product_json);
}

/** CONTROL PRODUCT STOCK
 * if product stock > 0 return true
 * else return false
 */
function controlProductStock(productRef){
  let product = JSON.parse(localStorage.getItem(productRef));
  if (product.stock > 0){
    return true;
  } else {
    return false;
  }

}

/** UPDATE VIEWS
 * display product list, remove cart and display it again
 */
function updateViews(){
  displayProductsList()
  removeCart()
  displayCart(cart);
}
