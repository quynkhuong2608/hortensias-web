$(function() {
  "use strict";
  /*  =====  On responsive swatch left to right colunm  =====  */
  function left_colunm_swetch() {
    if ($(window).width() <= 767) {
      localStorage.setItem('display', 'wrapper');
      $('#column-right:parent').each(function() {
        $(this).insertBefore($(this).prev('#column-left'));
      });
    }
    if ($(window).width() > 767) {
      localStorage.setItem('display', 'wrapper');
      $('#column-left:parent').each(function() {
        $(this).insertBefore($(this).prev('#column-right'));
      });
    }
  }
  /*  =====  magnificPopup  =====  */
  function m_popup_select() {
    $('#product-thumbnail').magnificPopup({
      delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
      },
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function(element) {
          return element.find('img');
        }
      }

    })
  }
  /* ===== Search  =====   */
  function search() {
    var i = $("#search-overlay-btn");
    var a = $(".search-overlay, .search-overlay .search-overlay-close");
    i.on('click', function(event) {
      $(".search-overlay").addClass("open"),
        $('.search-overlay > form > input[type="search"]').focus();
    });
    a.on('click', function(event) {
      event.target != this && "search-overlay-close" != event.target.className && 32 != event.keyCode || $(this).removeClass("open");
    });
  }
  /* ===== Grid list active  =====   */
  function gl_active() {
    $('.btn-list-grid button').on('click', function() {
      if ($(this).hasClass('grid-view')) {
        $('.btn-list-grid button').addClass('active');
        $('.btn-list-grid button.list-view').removeClass('active');
      }
      else if ($(this).hasClass('list-view')) {
        $('.btn-list-grid button').addClass('active');
        $('.btn-list-grid button.grid-view').removeClass('active');
      }
    });
  }
  /* ===== Grid list View  =====   */
  function gl_view() {
    // Product List
    $('#list-view').on('click', function() {
      $('.product-layout > .clearfix').remove();
      $('.product-layout').attr('class', 'product-layout product-list col-xs-12');
      $('#column-left .product-layout').attr('class', 'product-layout mb_20');
      $('#column-right .product-layout').attr('class', 'product-layout mb_20');

    });
    // Product Grid
    $('#grid-view').on('click', function() {
      $('.product-layout').attr('class', 'product-layout product-grid col-md-4 col-sm-6 col-xs-12');
    });
  }
  /* ===== Timer  =====   */
  function makeTimer() {
    var endTime = new Date("August 10, 2018 12:00:00 PDT");
    var endTime = (Date.parse(endTime)) / 1000;
    var now = new Date();
    var now = (Date.parse(now) / 1000);
    var timeLeft = endTime - now;
    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }

    $(".days").html(days + "<span>Days</span>");
    $(".hours").html(hours + "<span>Hours</span>");
    $(".minutes").html(minutes + "<span>Min</span>");
    $(".seconds").html(seconds + "<span>Sec</span>");
  }
  setInterval(function() { makeTimer(); }, 1000);
  /* ===== Login Register Tab  =====   */
  function log_reg_tab() {
    $('#login-form-link').on('click', function(e) {
      $("#login-form").delay(100).fadeIn(100);
      $("#register-form").fadeOut(100);
      $('#register-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
    $('#register-form-link').on('click', function(e) {
      $("#register-form").delay(100).fadeIn(100);
      $("#login-form").fadeOut(100);
      $('#login-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
  }
  /*  footer toggle */
  function footerToggle() {
    if ($(window).width() < 991) {
      $(".footer .toggle_div").remove();
      $(".footer-title").append("<a class='toggle_div'>&nbsp;</a>");
      $(".footer-title").addClass('toggle');
      $(".footer-title").addClass('active');
      $(".footer .toggle_div").on('click', function() {
        $(this).parent().toggleClass('active').parent().find('ul').slideToggle('slow');
      });
    } else {
      $(".footer-title").parent().find('ul').removeAttr('style');
      $(".footer-title").removeClass('active');
      $(".footer-title").removeClass('toggle');
      $(".footer .toggle_div").remove();
    }
  }

  function owl_carousel() {
    $('.main-banner').owlCarousel({
      autoplay: false,
      responsiveClass: true,
      dots: true,
      items: 1, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 1,
          nav: false
        },
        1000: {
          items: 1,
          nav: false,
        }
      }
    });

    $('.nArrivals , .Bestsellers , .Featured , .latest').owlCarousel({
      autoplay: false,
      responsiveClass: true,
      items: 4, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        400: {
          items: 2,
          nav: true
        },
        600: {
          items: 3,
          nav: true
        },
        1000: {
          items: 4,
          nav: true
        }
      }
    });

    $('#featu-pro , #bests-pro , #new-pro').owlCarousel({
      autoplay: false,
      responsiveClass: true,
      items: 1, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        480: {
          items: 2,
          nav: true
        },
        767: {
          items: 2,
          nav: true
        },
        1000: {
          items: 1,
          nav: true,
        }
      }
    });
    /* ===== Specials and client carousel =====   */
    $('.client').owlCarousel({
      autoplay: false,
      responsiveClass: true,
      items: 1, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 1,
          nav: false
        },
        1000: {
          items: 1,
          nav: false,
        }
      }
    });
    /* ===== left-special carousel =====   */
    $('#left-special').owlCarousel({
      autoplay: false,
      responsiveClass: true,
      items: 1, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        480: {
          items: 2,
          nav: true
        },
        768: {
          items: 1,
          nav: true
        },
        1000: {
          items: 1,
          nav: true,
        }
      }
    });

    /* ===== Offers carousel =====   */
    $('.offers').owlCarousel({
      loop: true,
      autoplay: true,
      responsiveClass: true,
      items: 3, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 1,
          nav: false
        },
        1200: {
          items: 2,
          nav: false
        },
        1360: {
          items: 3,
          nav: false,
        }
      }
    });
    $('.related-pro').owlCarousel({
      autoplay: false,
      responsiveClass: true,
      items: 3, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 2,
          nav: false
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 3,
          nav: true,
        },
        1200: {
          items: 3,
          nav: true,
        }
      }
    });

    /* ===== Product Thumbnail =====   */
    $('#product-thumbnail').owlCarousel({
      loop: false,
      thumbs: true,
      autoplay: false,
      items: 5, //10 items above 1000px browser width
      nav: true,
    })

    /* ===== Brand carousel =====   */
    $('.brand').owlCarousel({
      loop: true,
      autoplay: true,
      responsiveClass: true,
      items: 6, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 2,
          nav: true
        },
        400: {
          items: 3,
          nav: true
        },
        600: {
          items: 4,
          nav: true
        },
        1000: {
          items: 6,
          nav: true,
          loop: true
        }
      }
    })
    /* ===== Blog carousel =====   */
    $('.blog').owlCarousel({
      autoplay: false,
      responsiveClass: true,
      items: 2, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 2,
          nav: true
        },
        1000: {
          items: 2,
          nav: true,
        }
      }
    })

    /* ===== Team carousel =====   */
    $('.team3col').owlCarousel({
      autoplay: false,
      responsiveClass: true,
      items: 3, //10 items above 1000px browser width
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 2,
          nav: true
        },
        1000: {
          items: 3,
          nav: true,
        }
      }
    });
  }
  /* ---- Page Scrollup JS Start ---- */
  //When distance from top = 250px fade button in/out

  $(window).scroll(function() {
    if ($(this).scrollTop() > 250) {

      $('#scrollup').fadeIn(300);
    }
    else {
      $('#scrollup').fadeOut(300);
    }
  });
  $('#scrollup').on('click', function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });

  /* ===== Event for windows and document =====   */

  $(document).ready(function() {
    gl_active();
    gl_view();
    search();
    footerToggle();
    m_popup_select();
    log_reg_tab();

  });

  $(window).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    owl_carousel();
    left_colunm_swetch();
  });

  $(window).resize(function() {
    left_colunm_swetch();
    gl_active();
    gl_view();
    search();
    footerToggle();
  });
});
jQuery(window).on("load", function() {
  $(".loder").fadeOut("slow");
});


// Display Products
function loadProducts() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xmlDoc = this.responseXML;
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

          var addToCartButton = targetContainer.getElementById('add-to-cart');
          addToCartButton.addEventListener('click', addToCartClick);
        }

        // Tạo HTML cho mỗi sản phẩm
        var productHTML = `
            <div class="item">
              <div class="product-thumb">
                <div class="image product-imageblock"> 
                  
                    <img src="${image}" alt="${alt}" title="${alt}" class="img-responsive"> 
                  
                  <div class="button-group text-center">
                    <div class="wishlist"><a href="#"><span>wishlist</span></a></div>
                    <div class="quickview"><a href="#"><span>Quick View</span></a></div>
                    <div class="compare"><a href="#"><span>Compare</span></a></div>
                    <div id="add-to-cart" class="add-to-cart"><a href="#"><span>Add to cart</span></a></div>
                  </div>
                </div>
                <div class="caption product-detail text-center">
                  <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i
                    class="fa fa-star fa-stack-1x"></i></span> <span class="fa fa-stack"><i
                    class="fa fa-star-o fa-stack-1x"></i><i class="fa fa-star fa-stack-1x"></i></span> <span
                  class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i
                    class="fa fa-star fa-stack-1x"></i></span> <span class="fa fa-stack"><i
                    class="fa fa-star-o fa-stack-1x"></i><i class="fa fa-star fa-stack-1x"></i></span> <span
                  class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i><i
                    class="fa fa-star fa-stack-x"></i></span> </div>
                  <h6 class="product-name"><a href="#">${title}</a></h6>
                  <span class="price"><span class="amount">${parseFloat(price).toLocaleString()} VNĐ</span></span>
                </div>
              </div>
            </div>
          `;


        // ONCLICK
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

        var targetContainer = document.getElementById("product-grid-" + (i + 1));
        if (!targetContainer) {
          targetContainer = document.createElement('div');
          targetContainer.id = "product-grid-" + (i + 1);
          // document.body.appendChild(targetContainer);
        }
        targetContainer.innerHTML = productHTML;
        targetContainer.querySelector('.product-name').replaceWith(productTitle)
      }
    } else if (this.readyState == 4) {
      console.error('Failed to load XML data');
    }
  }

  xhttp.open("GET", "data.xml", true);
  xhttp.send();
}

loadProducts();


/* ===== Event Login =====   */
function login(event) {
  event.preventDefault();

  var username = document.getElementById('username1').value;
  var password = document.getElementById('password').value;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'users.xml', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      var customers = xmlDoc.getElementsByTagName('customer');
      var admins = xmlDoc.getElementsByTagName('admin');
      var validUser = null;

      for (var i = 0; i < customers.length; i++) {
        var customer = customers[i];
        var xmlUsername = customer.getElementsByTagName('username')[0].textContent;
        var xmlPassword = customer.getElementsByTagName('password')[0].textContent;

        if (xmlUsername === username && xmlPassword === password) {
          validUser = customer;
          break;
        }
      }

      if (!validUser) {
        for (var i = 0; i < admins.length; i++) {
          var admin = admins[i];
          var xmlUsername = admin.getElementsByTagName('username')[0].textContent;
          var xmlPassword = admin.getElementsByTagName('password')[0].textContent;

          if (xmlUsername === username && xmlPassword === password) {
            validUser = admin;
            break;
          }
        }
      }

      if (validUser) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('loggedInUsername', username);

        if (validUser.tagName === 'admin') {
          window.location.href = 'index_ad.html';
        } else {
          window.location.href = 'account.html';
        }
      } else {
        document.getElementById('error').style.display = 'block';
      }
    }
  };
  xhr.send();
}

function getFromXML(url, tag) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send();

  var xmlDoc = xmlHttp.responseXML;
  var elements = xmlDoc.getElementsByTagName(tag);

  var data = [];
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var obj = {};

    for (var j = 0; j < element.childNodes.length; j++) {
      var child = element.childNodes[j];
      if (child.nodeType === 1) {
        obj[child.nodeName] = child.textContent;
      }
    }

    data.push(obj);
  }

  return data;
}
function togglePasswordVisibility(inputId) {
  var input = document.getElementById(inputId);
  var icon = input.nextElementSibling;

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove('bi-eye-slash');
    icon.classList.add('bi-eye');
  } else {
    input.type = "password";
    icon.classList.remove('bi-eye');
    icon.classList.add('bi-eye-slash');
  }
}

/* ===== Event Account =====   */
var loggedInUsername = localStorage.getItem('loggedInUsername');
var customers = getFromXML('customer.xml', 'customer');
var loggedInCustomer = customers.find(function(customer) {
  return customer.username === loggedInUsername;
});

var nameElement = document.getElementById('name');
var phoneElement = document.getElementById('phone');
var emailElement = document.getElementById('email');
var addressElement = document.getElementById('address');
var imageElement = document.querySelector('#customerImage img');


nameElement.textContent = 'Tên: ' + loggedInCustomer.name;
phoneElement.textContent = 'Số điện thoại: ' + loggedInCustomer.phone;
emailElement.textContent = 'Email: ' + loggedInCustomer.email;
addressElement.textContent = 'Địa chỉ: ' + loggedInCustomer.address;
imageElement.src = loggedInCustomer.image;

function enableEdit() {
  document.getElementById('editName').value = loggedInCustomer.name;
  document.getElementById('editPhone').value = loggedInCustomer.phone;
  document.getElementById('editEmail').value = loggedInCustomer.email;
  document.getElementById('editAddress').value = loggedInCustomer.address;

  document.getElementById('infoSection').style.display = 'none';
  document.getElementById('editSection').style.display = 'block';
  document.getElementById('editButton').style.display = 'none';
}

function cancelEdit() {
  document.getElementById('infoSection').style.display = 'block';
  document.getElementById('editSection').style.display = 'none';
  document.getElementById('editButton').style.display = 'block';
}

function saveProfile() {
  var newName = document.getElementById('editName').value;
  var newPhone = document.getElementById('editPhone').value;
  var newEmail = document.getElementById('editEmail').value;
  var newAddress = document.getElementById('editAddress').value;

  loggedInCustomer.name = newName;
  loggedInCustomer.phone = newPhone;
  loggedInCustomer.email = newEmail;
  loggedInCustomer.address = newAddress;

  updateXML('customer.xml', 'customer', customers);

  nameElement.textContent = 'Tên: ' + newName;
  phoneElement.textContent = 'Số điện thoại: ' + newPhone;
  emailElement.textContent = 'Email: ' + newEmail;
  addressElement.textContent = 'Địa chỉ: ' + newAddress;

  document.getElementById('infoSection').style.display = 'block';
  document.getElementById('editSection').style.display = 'none';
  document.getElementById('editButton').style.display = 'block';

  alert('Thông tin đã được lưu thành công!');
}

function getFromXML(url, tag) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send();

  var xmlDoc = xmlHttp.responseXML;
  var elements = xmlDoc.getElementsByTagName(tag);

  var data = [];
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var obj = {};

    for (var j = 0; j < element.childNodes.length; j++) {
      var child = element.childNodes[j];
      if (child.nodeType === 1) {
        obj[child.nodeName] = child.textContent;
      }
    }

    data.push(obj);
  }

  return data;
}

function updateXML(url, tag, data) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send();

  var xmlDoc = xmlHttp.responseXML;
  var elements = xmlDoc.getElementsByTagName(tag);

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var username = element.getElementsByTagName('username')[0].textContent;

    if (username === loggedInUsername) {
      element.getElementsByTagName('name')[0].textContent = loggedInCustomer.name;
      element.getElementsByTagName('phone')[0].textContent = loggedInCustomer.phone;
      element.getElementsByTagName('email')[0].textContent = loggedInCustomer.email;
      element.getElementsByTagName('address')[0].textContent = loggedInCustomer.address;
    }
  }
  var serializer = new XMLSerializer();
  var xmlString = serializer.serializeToString(xmlDoc);

  var xmlHttp2 = new XMLHttpRequest();
  xmlHttp2.open('POST', url, false);
  xmlHttp2.setRequestHeader('Content-Type', 'text/xml');
  xmlHttp2.send(xmlString);
}

// Function to handle "Add to Cart" button click
