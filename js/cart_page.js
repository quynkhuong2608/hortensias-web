let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function() {
  if (cart.style.right == '-100%') {
    cart.style.right = '0';
    container.style.transform = 'translateX(-400px)';
  } else {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
  }
})
close.addEventListener('click', function() {
  cart.style.right = '-100%';
  container.style.transform = 'translateX(0)';
})

// LEFT SIDE PANEL - PRODUCT DETAILS
function loadProducts() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(this.responseText, "text/xml");

      var products = xmlDoc.getElementsByTagName("product");

      for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var image = product.getElementsByTagName("image")[0]?.textContent;
        var alt = product.getElementsByTagName("alt")[0]?.textContent;
        var title = product.getElementsByTagName("title")[0]?.textContent;
        var price = product.getElementsByTagName("price")[0]?.textContent;

        if (!image || !alt || !title || !price) {
          console.error('Missing product data');
          continue;
        }

loadProducts();


// // PRODUCTS DETAILS
// function showProductDetails() {
//   var xmlContent = localStorage.getItem('xmlData');
//   var localStorageTitle = localStorage.getItem('title');
//   var clickedProduct = localStorage.getItem('product');

//   if (xmlContent && localStorageTitle && clickedProduct) {
//     const parser = new DOMParser();
//     const product = parser.parseFromString(clickedProduct, 'text/xml').documentElement;

//     var xmlPrice = product.getElementsByTagName("price")[0].textContent;
//     var xmlOriginalPrice = product.getElementsByTagName("original_price")[0].textContent;
//     var xmlGender = product.getElementsByTagName("gender")[0].textContent;
//     var xmlMaterial = product.getElementsByTagName("material")[0].textContent;
//     var image = product.getElementsByTagName("image")[0]?.textContent;

//     var productDetailHTML = `
//           <div class="col-md-6">
//               <div>
//                   <a class="thumbnails">
//                       <img data-name="product_image" src="${image}" alt="">
//                   </a>
//               </div>
//               <!-- Các hình ảnh thu nhỏ -->
//               <div id="product-thumbnail" class="owl-carousel">

//               </div>
//           </div>
//           <div class="col-md-6 prodetail caption product-thumb">
//               <h4 data-name="product_name" class="product-name">
//                   <a href="#" title="${localStorageTitle}">${localStorageTitle}</a>
//               </h4>
//               <span class="price mb_20">
//                   <span class="amount"><span class="currencySymbol"></span>${xmlPrice}</span>
//               </span>
//               <hr>
//               <ul class="list-unstyled product_info mtb_20">
//                   <li>
//                       <label>Giá gốc:</label>
//                       <span> <a href="#">${xmlOriginalPrice}</a></span>
//                   </li>
//                   <li>
//                       <label>Giới tính:</label>
//                       <span>${xmlGender}</span>
//                   </li>
//                   <li>
//                       <label>Chất liệu:</label>
//                       <span>${xmlMaterial}</span>
//                   </li>
//               </ul>
//               <hr>
//               <p class="product-desc mtb_30">
//               Hortensias tự hào mang đến cho bạn một bộ sưu tập trang sức đa dạng và đẹp mắt. Với sự kết hợp
//               giữa các chất liệu sang trọng, quý phái và thiết kế tinh tế, sản phẩm của chúng tôi không chỉ là
//               biểu tượng của sự sang trọng mà còn thể hiện cái tôi và phong cách riêng của bạn.
//               </p>

//               <div id="product">
//                   <div class="form-group">
//                       <div class="Color col-md-6">
//                           <label>Màu sắc</label>
//                           <select name="product_color" id="select-by-color" class="selectpicker form-control">
//                               <option>Bạc</option>
//                               <option>Trắng</option>
//                           </select>
//                       </div>
//                       <div class="qty col-md-6">
//                           <label>Số lượng</label>
//                           <input name="product_quantity" min="1" value="1" type="number" class="selectpicker form-control"/>
//                       </div>
//                   </div>
//                   <div class="button-group mt_30">
//                       <div class="add-to-cart">
//                           <a href="#"><span>Add to cart</span></a>
//                       </div>
//                       <div class="wishlist">
//                           <a href="#"><span>wishlist</span></a>
//                       </div>
//                       <div class="compare">
//                           <a href="#"><span>Compare</span></a>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       `;

//     var productInfo = document.getElementById("productInfo");
//     if (!productInfo) {
//       productInfo = document.createElement('div');
//       productInfo.id = "productInfo";
//     }
//     productInfo.innerHTML = productDetailHTML;
//   } else {
//     console.error('XML data or product element not found in localStorage.');
//   }
// }
// showProductDetails();

// let products = null;
// // get data from file json
// fetch('product.json')
//   .then(response => response.json())
//   .then(data => {
//     products = data;
//     addDataToHTML();
//   })

//show datas product in list 
function addDataToHTML() {
  // remove datas default from HTML
  let listProductHTML = document.querySelector('.listProduct');
  listProductHTML.innerHTML = '';

  // add new datas
  if (products != null) // if has data
  {
    products.forEach(product => {
      let newProduct = document.createElement('div');
      newProduct.classList.add('item');
      newProduct.innerHTML =
        `<img src="${image}" alt="">
            <h2>${localStorageTitle}</h2>
            <div class="price">$${product.price}</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>`;

      listProductHTML.appendChild(newProduct);

    });
  }
}
//use cookie so the cart doesn't get lost on refresh page


let listCart = [];
function checkCart() {
  var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split('=')[1]);
  } else {
    listCart = [];
  }
}
checkCart();
function addCart($idProduct) {
  let productsCopy = JSON.parse(JSON.stringify(products));
  //// If this product is not in the cart
  if (!listCart[$idProduct]) {
    listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
    listCart[$idProduct].quantity = 1;
  } else {
    //If this product is already in the cart.
    //I just increased the quantity
    listCart[$idProduct].quantity++;
  }
  document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

  addCartToHTML();
}
addCartToHTML();
function addCartToHTML() {
  // clear data default
  let listCartHTML = document.querySelector('.listCart');
  listCartHTML.innerHTML = '';

  let totalHTML = document.querySelector('.totalQuantity');
  let totalQuantity = 0;
  // if has product in Cart
  if (listCart) {
    listCart.forEach(product => {
      if (product) {
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.innerHTML =
          `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
        listCartHTML.appendChild(newCart);
        totalQuantity = totalQuantity + product.quantity;
      }
    })
  }
  totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type) {
  switch ($type) {
    case '+':
      listCart[$idProduct].quantity++;
      break;
    case '-':
      listCart[$idProduct].quantity--;

      // if quantity <= 0 then remove product in cart
      if (listCart[$idProduct].quantity <= 0) {
        delete listCart[$idProduct];
      }
      break;

    default:
      break;
  }
  // save new data in cookie
  document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  // reload html view cart
  addCartToHTML();
}
