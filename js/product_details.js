//CATEGORY
function category() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xmlDoc = this.responseXML;
      var products = xmlDoc.getElementsByTagName("product");

      for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var image = product.getElementsByTagName("image")[0]?.textContent;
        var title = product.getElementsByTagName("title")[0]?.textContent;
        var price = product.getElementsByTagName("price")[0]?.textContent;

        if (!image || !title || !price) {
          console.error('Missing product data');
          continue;
        }

        // Tạo HTML cho mỗi sản phẩm
        var categoryHTML = `
              <div class="item">
                  <div class="product-thumb clearfix">
                      <div class="image product-imageblock">
                              <img src="${image}" alt="Item" title="Item" class="img-responsive" />
                          <div class="button-group text-center">
                              <div class="wishlist">
                                  <a href="#"><span>wishlist</span></a>
                              </div>
                              <div class="quickview">
                                  <a href="#"><span>Quick View</span></a>
                              </div>
                              <div class="compare">
                                  <a href="#"><span>Compare</span></a>
                              </div>
                              <div class="add-to-cart">
                                  <a href="#"><span>Add to cart</span></a>
                              </div>
                          </div>
                      </div>
                      <div class="caption product-detail text-center">
                          <h6 data-name="product_name" class="product-name mt_20">
                              <a href="#" title="${title}">${title}</a>
                          </h6>
                          <div class="rating">
                              <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i
                                      class="fa fa-star fa-stack-1x"></i></span>
                              <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i
                                      class="fa fa-star fa-stack-1x"></i></span>
                              <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i
                                      class="fa fa-star fa-stack-1x"></i></span>
                              <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i
                                      class="fa fa-star fa-stack-1x"></i></span>
                              <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i
                                      class="fa fa-star fa-stack-x"></i></span>
                          </div>
                          <span class="price"><span class="amount"><span class="currencySymbol"></span>${price}</span>
                          </span>
                          <p class="product-desc mt_20 mb_60">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium rem facere molestias
                              explicabo at, optio, amet laboriosam fuga sint, soluta neque voluptatum voluptatibus veritatis.
                              Sapiente!
                          </p>
                      </div>
                  </div>
              </div>
              `;
        // Thêm sự kiện onclick vào title
        var productTitle = document.createElement('h6');
        productTitle.classList.add('product-name');
        productTitle.setAttribute('data-product', i);
        productTitle.setAttribute('style', 'height: 36px;');
        productTitle.textContent = title;

        productTitle.onclick = function(event) {
          event.preventDefault();

          var productIndex = this.getAttribute('data-product');
          var clickedProduct = products[productIndex];

          if (clickedProduct) {
            var xmlContent = clickedProduct.outerHTML;
            var title = clickedProduct.getElementsByTagName("title")[0]?.textContent;

            localStorage.setItem('xmlData', xmlContent);
            localStorage.setItem('title', title);
            localStorage.setItem('product', clickedProduct.outerHTML);

            window.open('product_detail_page.html', '_self');
          }
        };

        var targetContainer = document.getElementById("category-" + (i + 1));
        if (!targetContainer) {
          targetContainer = document.createElement('div');
          targetContainer.id = "category-" + (i + 1);
        }
        targetContainer.innerHTML = categoryHTML;
        targetContainer.querySelector('.product-name').replaceWith(productTitle)
      }
    } else if (this.readyState == 4) {
      console.error('Failed to load XML data');
    }
  }

  xhttp.open("GET", "data.xml", true);
  xhttp.send();
}
category();

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

        // Tạo HTML cho mỗi sản phẩm
        var productHTML = `
          <div class="product-list col-xs-4">
            <div class="product-thumb">
              <div class="image product-imageblock">

                  <img class="img-responsive" title="${alt}" alt="${alt}" src="${image}" />

              </div>
            </div>
          </div>
          <div class="col-xs-8">
            <div class="caption product-detail">
              <h6 class="product-name">
                <a href="product_detail_page.html">${title}</a>
              </h6>
              <div class="rating">
                <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i class="fa fa-star fa-stack-1x"></i></span>
                <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i class="fa fa-star fa-stack-1x"></i></span>
                <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i class="fa fa-star fa-stack-1x"></i></span>
                <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i class="fa fa-star fa-stack-1x"></i></span>
                <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i class="fa fa-star fa-stack-x"></i></span>
              </div>
              <span class="price">
                <span class="amount">
                  <span class="currencySymbol"></span>${price}
                </span>
              </span>
            </div>
          </div>
        `;

        // Thêm sự kiện onclick vào title
        var productTitle = document.createElement('h6');
        productTitle.classList.add('product-name');
        productTitle.setAttribute('data-product', i);
        productTitle.textContent = title;

        productTitle.onclick = function(event) {
          event.preventDefault();

          var productIndex = this.getAttribute('data-product');
          var clickedProduct = products[productIndex];

          if (clickedProduct) {
            var xmlContent = clickedProduct.outerHTML;
            var title = clickedProduct.getElementsByTagName("title")[0]?.textContent;

            localStorage.setItem('xmlData', xmlContent);
            localStorage.setItem('title', title);
            localStorage.setItem('product', clickedProduct.outerHTML);

            window.open('product_detail_page.html', '_self');
          }
        };

        var targetContainer = document.getElementById("product-left-" + (i + 1));
        if (!targetContainer) {
          targetContainer = document.createElement('div');
          targetContainer.id = "product-left-" + (i + 1);
        }
        targetContainer.innerHTML = productHTML;
        targetContainer.querySelector('.product-name').replaceWith(productTitle)

      };

    } else if (this.readyState == 4) {
      console.error('Failed to load XML data');
    }
  }


  xhttp.open("GET", "data.xml", true);
  xhttp.send();
}

loadProducts();


// PRODUCTS DETAILS
function showProductDetails() {
  var xmlContent = localStorage.getItem('xmlData');
  var localStorageTitle = localStorage.getItem('title');
  var clickedProduct = localStorage.getItem('product');

  if (xmlContent && localStorageTitle && clickedProduct) {
    const parser = new DOMParser();
    const product = parser.parseFromString(clickedProduct, 'text/xml').documentElement;

    var xmlPrice = product.getElementsByTagName("price")[0].textContent;
    var xmlOriginalPrice = product.getElementsByTagName("original_price")[0].textContent;
    var xmlGender = product.getElementsByTagName("gender")[0].textContent;
    var xmlMaterial = product.getElementsByTagName("material")[0].textContent;
    var image = product.getElementsByTagName("image")[0]?.textContent;

    var productDetailHTML = `
          <div class="col-md-6">
              <div>
                  <a class="thumbnails">
                      <img data-name="product_image" src="${image}" alt="">
                  </a>
              </div>
              <!-- Các hình ảnh thu nhỏ -->
              <div id="product-thumbnail" class="owl-carousel">

              </div>
          </div>
          <div class="col-md-6 prodetail caption product-thumb">
              <h4 data-name="product_name" class="product-name">
                  <a href="#" title="${localStorageTitle}">${localStorageTitle}</a>
              </h4>
              <span class="price mb_20">
                  <span class="amount"><span class="currencySymbol"></span>${xmlPrice}</span>
              </span>
              <hr>
              <ul class="list-unstyled product_info mtb_20">
                  <li>
                      <label>Giá gốc:</label>
                      <span> <a href="#">${xmlOriginalPrice}</a></span>
                  </li>
                  <li>
                      <label>Giới tính:</label>
                      <span>${xmlGender}</span>
                  </li>
                  <li>
                      <label>Chất liệu:</label>
                      <span>${xmlMaterial}</span>
                  </li>
              </ul>
              <hr>
              <p class="product-desc mtb_30">
              Hortensias tự hào mang đến cho bạn một bộ sưu tập trang sức đa dạng và đẹp mắt. Với sự kết hợp
              giữa các chất liệu sang trọng, quý phái và thiết kế tinh tế, sản phẩm của chúng tôi không chỉ là
              biểu tượng của sự sang trọng mà còn thể hiện cái tôi và phong cách riêng của bạn.
              </p>

              <div id="product">
                  <div class="form-group">
                      <div class="Color col-md-6">
                          <label>Màu sắc</label>
                          <select name="product_color" id="select-by-color" class="selectpicker form-control">
                              <option>Bạc</option>
                              <option>Trắng</option>
                          </select>
                      </div>
                      <div class="qty col-md-6">
                          <label>Số lượng</label>
                          <input name="product_quantity" id="pdquantity" min="1" value="1" type="number" class="selectpicker form-control"/>
                      </div>
                  </div>
                  <div class="button-group mt_30">
                      <div class="add-to-cart" id="add-to-cart">
                          <a href="#"><span>Add to cart</span></a>
                      </div>
                      <div class="wishlist">
                          <a href="#"><span>wishlist</span></a>
                      </div>
                      <div class="compare">
                          <a href="#"><span>Compare</span></a>
                      </div>
                  </div>
              </div>
          </div>
      `;

    var productInfo = document.getElementById("productInfo");
    if (!productInfo) {
      productInfo = document.createElement('div');
      productInfo.id = "productInfo";
    }
    productInfo.innerHTML = productDetailHTML;
  } else {
    console.error('XML data or product element not found in localStorage.');
  }
}
showProductDetails();

//ADD TO CART
// Function to handle adding a product to the cart
function addToCart(product) {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart
  var existingProduct = cart.find(item => item.title === product.title);

  if (existingProduct) {
    // If the product is already in the cart, increase the quantity
    existingProduct.quantity = Number(existingProduct.quantity) + Number(product.quantity);
  }
  else {
    // If the product is not in the cart, add it with quantity 1
    cart.push({ ...product, quantity: Number(product.quantity) });
  }

  // Save the updated cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Optionally, you can provide visual feedback to the user (e.g., a confirmation message)
  alert('Đã thêm sản phẩm vào giỏ hàng!');
}

// Function to display cart items on the cart page
// function displayCart() {
//   var cart = JSON.parse(localStorage.getItem('cart')) || [];

//   var cartItemsContainer = document.getElementById('cartItems');

//   if (cart.length === 0) {
//     cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
//   } else {
//     var cartHTML = '<ul>';
//     cart.forEach(item => {
//       cartHTML += `<li>${item.title} - Quantity: ${item.quantity}</li>`;
//       // You can customize the displayed information as needed
//     });
//     cartHTML += '</ul>';
//     cartItemsContainer.innerHTML = cartHTML;
//   }
// }

// Update the "Add to cart" button to call addToCart function
// document.querySelector('.add-to-cart a').addEventListener('click', function(event) {
//   event.preventDefault();
document.getElementById('add-to-cart').addEventListener('click', function(event) {
  event.preventDefault();

  // // Retrieve product details from localStorage
  // var clickedProduct = localStorage.getItem('product');
  // if (clickedProduct) {
  //   var parser = new DOMParser();
  //   var product = parser.parseFromString(clickedProduct, 'text/xml').documentElement;

  //   var title = product.getElementsByTagName("title")[0]?.textContent;
  //   var price = product.getElementsByTagName("price")[0]?.textContent;
  //   var image = product.getElementsByTagName("image")[0]?.textContent;


  var xmlContent = localStorage.getItem('xmlData');
  var localStorageTitle = localStorage.getItem('title');
  var clickedProduct = localStorage.getItem('product');
  // var quantity = document.getElementsByName('product_quantity').value;
  var selectedColor = document.getElementById('select-by-color').value;
  var selectedQuantity = document.getElementById('pdquantity').value;

  // // Add color and quantity to the product details
  // productDetails.color = selectedColor;
  // productDetails.quantity = selectedQuantity;

  if (xmlContent && localStorageTitle && clickedProduct) {
    const parser = new DOMParser();
    const product = parser.parseFromString(clickedProduct, 'text/xml').documentElement;

    var xmlPrice = product.getElementsByTagName("price")[0].textContent;
    var xmlOriginalPrice = product.getElementsByTagName("original_price")[0].textContent;
    var xmlGender = product.getElementsByTagName("gender")[0].textContent;
    var xmlMaterial = product.getElementsByTagName("material")[0].textContent;
    var image = product.getElementsByTagName("image")[0]?.textContent;
    // Create a product object with necessary details
    var productDetails = {
      image: image,
      title: localStorageTitle,
      quantity: selectedQuantity,
      price: xmlPrice,
      color: selectedColor,
      // Add other details as needed
    };

    // Add the product to the cart
    addToCart(productDetails);

    // Update the cart display on the cart page
    displayCart();
  } else {
    console.error('Product details not found.');
  }
});

// SHOW CATEGORY

document.addEventListener("DOMContentLoaded", function() {
  var category = getParameterByName('category');
  if (category === 'vong-tay') {
    displayVongTay();
  } else if (category === 'day-chuyen') {
    displayDayChuyen();
  } else if (category === 'nhan') {
    displayNhan();
  } else if (category === 'khuyen-tai') {
    displayKhuyenTai();
  }

  function displayVongTay() {
    var categoryContainer = document.getElementById("category-container")
    var categoryHTML = `
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-6"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-7"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-8"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-9"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-10"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-26"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-27"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-28"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-29"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-30"></div>
    </div>
    `;
    categoryContainer.innerHTML = categoryHTML;
  }

  function displayDayChuyen() {
    var categoryContainer = document.getElementById("category-container")
    var categoryHTML = `
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-1"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-2"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-3"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-4"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-5"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-21"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-22"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-23"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-24"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-25"></div>
    </div>
    `;
    categoryContainer.innerHTML = categoryHTML;
  }

  function displayNhan() {
    var categoryContainer = document.getElementById("category-container")
    var categoryHTML = `
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-11"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-12"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-13"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-14"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-15"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-31"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-32"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-33"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-34"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-35"></div>
    </div>
    `;
    categoryContainer.innerHTML = categoryHTML;
  }

  function displayKhuyenTai() {
    var categoryContainer = document.getElementById("category-container")
    var categoryHTML = `
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-16"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-17"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-18"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-19"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-20"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-31"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-12"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-13"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-14"></div>
    </div>
    <div class="product-layout product-grid col-md-4 col-xs-6 ">
      <div class="category" id="category-15"></div>
    </div>
      `;
    categoryContainer.innerHTML = categoryHTML;
  }

  function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
});

// CHUYỂN HƯỚNG TRANG CATEGORY
document.addEventListener("DOMContentLoaded", function() {
  var currentPage = 1;
  var productsPerPage = 9;
  var productLayouts = document.querySelectorAll(".product-layout");
  var totalProducts = productLayouts.length;
  var totalPages = Math.ceil(totalProducts / productsPerPage);

  for (var i = 0; i < productLayouts.length; i++) {
    productLayouts[i].style.display = "none";
  }

  showProducts(currentPage);

  // Xử lý sự kiện khi người dùng bấm vào nút trang trước
  document.getElementById("previous-page").addEventListener("click", function(e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      showProducts(currentPage);
    }
  });

  // Xử lý sự kiện khi người dùng bấm vào nút trang tiếp theo
  document.getElementById("next-page").addEventListener("click", function(e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      showProducts(currentPage);
    }
  });

  // Xử lý sự kiện khi người dùng bấm vào nút trang số
  var pageLinks = document.querySelectorAll(".page-link");
  if (pageLinks) {
    pageLinks.forEach(function(link) {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        var page = parseInt(this.textContent);
        showProducts(page);
      });
    });
  }

  // Hiển thị các sản phẩm của trang hiện tại
  function showProducts(page) {
    var startIndex = (page - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage - 1;

    for (var i = 0; i < productLayouts.length; i++) {
      productLayouts[i].style.display = "none";
    }

    for (var i = startIndex; i <= endIndex && i < productLayouts.length; i++) {
      productLayouts[i].style.display = "block";
    }

    updatePagination(page);
  }

  // Cập nhật trạng thái nút chuyển trang
  function updatePagination(page) {
    if (pageLinks) {
      pageLinks.forEach(function(link) {
        link.parentElement.classList.remove("active");
      });
      currentPage = page;
      pageLinks[currentPage - 1].parentElement.classList.add("active");
    }
  }
});