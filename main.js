window.onload = function(){

  // variable declaration zone 
  const btnNewProduct = document.getElementById('btn-new-product');
  const newProductForm = document.forms.newProductForm;
 

  // if localStorage is not empty - contains products => display product list
  if(Object.keys(localStorage).length > 0){
    displayProductsList()
  }

  /** New Product Form submit button eventListener
   * check validity of the product reference
   * if match store the new product in localStorage
   */
  btnNewProduct.addEventListener('click', (e) => {
    e.preventDefault();

    // store new product form data and access reference
    let formData = new FormData(newProductForm);
    let productRef = formData.get('reference');

    // check validity of refeerence - must be unique and match the pattern
    let productRefStatus = checkProductReferenceValidity(productRef);

    if(productRefStatus == false){
      alert('reference already use, must be unique')
    }else if(productRefStatus){
      storeNewProductInLocalStorage(formData)
    }else {
      alert('reference do not match the pattern')
    }
  })
}
