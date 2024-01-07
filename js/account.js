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