function displayCart() {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var cartTable = document.getElementById('cartTable');
  var totalPriceElement = document.getElementById('totalPrice');

  if (!cartTable || !totalPriceElement) {
    console.error('Cart table or total price element not found.');
    return;
  }

  // Clear existing content
  cartTable.innerHTML = '';
  totalPriceElement.innerHTML = '';

  if (cart && cart.length > 0) {
    // Create the table header
    var headerRow = document.createElement('tr');
    headerRow.classList.add('cart-row');
    headerRow.innerHTML = '<th>Image</th><th>Title</th><th>Quantity</th><th>Price</th>';
    cartTable.appendChild(headerRow);

    // Create a row for each product in the cart
    var total = 0;
    cart.forEach(function(product) {
      var row = document.createElement('tr');
      row.classList.add('cart-row');

      // Display product image, title, quantity, and price
      row.innerHTML = `<td><img src="${product.image} style="max-width: 50px;"></td>
                           <td>${product.title}</td>
                           <td>
                            <button onclick="changeQuantity(${cart.indexOf(product)}, -1)">-</button>
                            <span>${product.quantity}</span>
                            <button onclick="changeQuantity(${cart.indexOf(product)}, 1)">+</button>
                    </td> 
                           <td>${product.price} VNĐ</td>
                           // <t>${product.price * product.quantity} VNĐ</div>
                           `;

      cartTable.appendChild(row);

      // Update the total price
      total += product.price * product.quantity;
    });

    // Display the total price
    totalPriceElement.textContent = 'Total Price: ' + total + ' VNĐ';
  } else {
    // Display a message when the cart is empty
    cartTable.textContent = 'Your cart is empty.';
  }
}

// Retrieve the cart from localStorage
function getCartFromLocalStorage() {
  var cartString = localStorage.getItem('cart');
  return cartString ? JSON.parse(cartString) : [];
}
function changeQuantity(index, change) {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var updatedCart = [];

  cart.forEach((item, i) => {
    if (i === index) {
      item.quantity += change;

      // Remove the item if the quantity becomes 0
      if (item.quantity > 0) {
        updatedCart.push(item);
      }
    } else {
      updatedCart.push(item);
    }
  });

  localStorage.setItem('cart', JSON.stringify(updatedCart));
  displayCart();
}

// Call the displayCart function when the page loads
window.onload = displayCart;