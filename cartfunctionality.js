// Load cart from localStorage
function loadCart() {
  return JSON.parse(localStorage.getItem('glow_cart')) || [];
}

// Save cart to localStorage and update cart icon count
function saveCart(cart) {
  localStorage.setItem('glow_cart', JSON.stringify(cart));
  updateCartCount();
}

// Update cart count on the nav icon
function updateCartCount() {
  const cart = loadCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.getElementById('nav-cart-count');
  if (countElement) {
    countElement.textContent = count;
  }
}   
// Add item to cart
function addToCart(name, price, id, image) {
  let cart = loadCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  saveCart(cart);
}

// Remove item from cart
function removeFromCart(id) {
  const updatedCart = loadCart().filter(item => item.id !== id);
  saveCart(updatedCart);
  renderCart();
}

// Change quantity of a cart item
function changeQuantity(id, quantity) {
  const cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity = parseInt(quantity);
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart(cart);
      renderCart();
    }
  }
}

// Render cart contents in cart.html
function renderCart() {
  const cart = loadCart();
  const cartItems = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');

  if (!cartItems || !summary) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty">Your cart is empty.</p>`;
    summary.innerHTML = '';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <div class="quantity-control">
          <label>Qty:</label>
          <input type="number" min="1" value="${item.quantity}" onchange="changeQuantity('${item.id}', this.value)" />
        </div>
        <button onclick="removeFromCart('${item.id}')" class="remove-btn">Remove</button>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  summary.innerHTML = `
    <h3>Summary</h3>
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Shipping: $0.00</p>
    <h4 class="total">Total: $${subtotal.toFixed(2)}</h4>
  `;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
});
