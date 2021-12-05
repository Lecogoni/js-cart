/** DISPLAY PRODUCT LIST
 * display product list based on products store in localStorage
 * call function wicht set buy and delete buttons eventListener and actions
 */
function displayProductsList(){
  // start by removing content if exist
  removeProductList()
  const productsList = document.getElementById('productsList');

  // create a wrapper button
  let tableWrapper = document.createElement('div');
  tableWrapper.setAttribute("id", 'product-list-wrapper');
  // create a title
  let tableTitle = document.createElement('h1');
  tableTitle.innerHTML = 'Liste des produits';
  tableWrapper.appendChild(tableTitle)
  // create the table
  let table = document.createElement('table');
  table.classList.add("table");
  table.classList.add("table-striped");
  // create the table header
  let tableHeader = document.createElement('thead');
  tableHeader.innerHTML = '<tr><th>Reference</th><th>Nom</th><th>Prix</th><th>Stock</th><th colspan="2"></th></tr>';
  table.appendChild(tableHeader)

  // create the table body with the product list from localStorage
  let tableBody = document.createElement('tbody');
  let products = Object.keys(localStorage);

  // loop on each product
  for( var i = 0; i < products.length; i++){ 
    let product = JSON.parse(localStorage.getItem(products[i]));
    let tableRow = document.createElement('tr');
    // give the row an id = product reference 
    tableRow.setAttribute("id", product.reference);
    // create table cell reference
    let productRef = document.createElement('td');
    productRef.innerHTML = product.reference;
    tableRow.appendChild(productRef)
    // create table cell name    
    let productName = document.createElement('td');
    productName.innerHTML = product.name;
    tableRow.appendChild(productName);
    // create table cell price   
    let productPrice = document.createElement('td');
    productPrice.innerHTML = product.price;
    tableRow.appendChild(productPrice);
    // create table cell stock   
    let productStock = document.createElement('td');
    productStock.innerHTML = product.stock;
    tableRow.appendChild(productStock);
    // create buy button
    buyButton = document.createElement('td');
    buyButton.innerHTML = '<button class="btn btn-primary buttonBuy">acheter</button>';
    tableRow.appendChild(buyButton);
    // create delete button
    deleteButton = document.createElement('td');
    deleteButton.innerHTML = '<button class="btn btn-danger buttonDelete">supprimer</button>';
    tableRow.appendChild(deleteButton);
    // add the table row - one product to the tbody
    tableBody.appendChild(tableRow);
  }
  // insert, tbody in table, table in wrapper, wrapper in html div
  table.appendChild(tableBody);
  tableWrapper.appendChild(table);
  productsList.appendChild(tableWrapper);

  // set event listener and fucntion on buy and delete buttons
  setProductListButtonsActions();
}

/** REMOVE PRODUCT LIST
 * remove html element from the parent
 * empty product list
 */
function removeProductList(){
  const productsList = document.getElementById('productsList');
  const productsListWrapper = document.getElementById('product-list-wrapper');
  if(productsListWrapper){
    productsList.removeChild(productsListWrapper);
  }
}

/** DISPLAY CART 
 * display cart based on cart => 2D array [[product.reference, quantity],[], ...]
 * create a table, set table header, table body with product info, calculate total price for each product
 * create a table footer with cart total price 
 */
function displayCart(cart){

  const cartDiv = document.getElementById('cart');
  let cartTotal = 0;

  if(cart.length > 0){

    let cartWrapper = document.createElement('div');
    cartWrapper.setAttribute("id", 'cart-wrapper');
    let cartHeader = document.createElement('div');
    cartHeader.innerHTML = '<h1>Mon panier</h1>';
    cartWrapper.appendChild(cartHeader)

    let cartTable = document.createElement('table');
    cartTable.classList.add("table");
    cartTable.classList.add("table-striped");
    let tableHeader = document.createElement('thead');
    tableHeader.innerHTML = '<tr><th>nom</th><th>quantité</th><th>prix unitaire</th><th>total</th><th colspan="2"></th></tr>';
    cartTable.appendChild(tableHeader);

    let tableBody = document.createElement('tbody');
    // loop on each cart item - product in cart
    for( var i = 0; i < cart.length; i++){
      let product = JSON.parse(localStorage.getItem(cart[i][0]));
      let cartRow = document.createElement('tr');
      cartRow.setAttribute("id", product.reference);
      cartRow.innerHTML = '<td>'+ product.name +'</td><td>'+ cart[i][1] +'</td><td>'+product.price +'</td><td>'+ (Math.round((product.price * cart[i][1]) * 100) / 100).toFixed(2); +'</td>';
      // increase cart total
      cartTotal += product.price * cart[i][1];

      // create add button
      addButton = document.createElement('td');
      addButton.innerHTML = '<button class="badge rounded-pill bg-primary buttonAdd">+</button>';
      cartRow.appendChild(addButton);
      // create sub button
      subButton = document.createElement('td');
      subButton.innerHTML = '<button class="badge rounded-pill bg-danger buttonSub">-</button>';
      cartRow.appendChild(subButton);

      tableBody.appendChild(cartRow)
    }
    let tableFooter = document.createElement('tfoot');
    tableFooter.innerHTML = '<tr><td colspan"3"> </td><td>'+ (Math.round(cartTotal * 100) / 100).toFixed(2) + '</td></tr>';
    cartTable.appendChild(tableFooter);

    cartTable.appendChild(tableBody);
    cartWrapper.appendChild(cartTable);
    cartDiv.appendChild(cartWrapper);

    setCartButtonsActions()
  }
}


/** REMOVE CART
 * remome cart html wrapper form its html parent
 */
function removeCart(){
  const cartDiv = document.getElementById('cart');
  const cartWrapper = document.getElementById('cart-wrapper');
  if(cartWrapper){
    cartDiv.removeChild(cartWrapper);
  }
}

