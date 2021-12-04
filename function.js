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
    // description: formData.get('description'),
    // quantity: formData.get('quantity'),
    price: formData.get('price')
  }
  // stringify and store in localStorage the new product with a name === product reference
  newProduct_json = JSON.stringify(newProduct);
  localStorage.setItem(formData.get('reference'), newProduct_json);
  // launch display of product table
  displayProductsList()
}


function setButtonsActions(){
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

function addProductToCart(productRef){

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
  // remove cart view, and display it again 
  removeCart()
  displayCart(cart);
}

function deleteProduct(productRef){
  localStorage.removeItem(productRef)
  removeProductList();
  if(Object.keys(localStorage).length > 0){
    displayProductsList()
  }
}