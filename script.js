// 🛒 ตะกร้าสินค้า
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// 💳 Checkout
function loadCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartItems) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      ${item.name} - ฿${item.price} 
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function checkout() {
  const receipt = document.getElementById('receipt');
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  receipt.innerHTML = `<h3>Thank you for your purchase! 🧾</h3>
  <p>Total Paid: ฿${total}</p>`;
  cart = [];
  localStorage.removeItem('cart');
  loadCart();
}

// 🔐 ระบบ Login
function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const message = document.getElementById('login-message');

  if (user === 'admin' && pass === '1234') {
    localStorage.setItem('role', 'admin');
    window.location.href = 'admin.html';
  } else if (user === 'user' && pass === '1111') {
    localStorage.setItem('role', 'user');
    window.location.href = 'index.html';
  } else {
    message.textContent = '❌ Incorrect username or password!';
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

// โหลดตะกร้าอัตโนมัติถ้าอยู่หน้า checkout
document.addEventListener('DOMContentLoaded', loadCart);
