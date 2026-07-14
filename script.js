const products = [
  { id: 1, name: "Urban Runner", category: "sneakers", price: 6500, emoji: "👟", bg: "#ead6c3", badge: "Best Seller" },
  { id: 2, name: "Classic Oxford", category: "formal", price: 7800, emoji: "👞", bg: "#d9d1c4", badge: "New" },
  { id: 3, name: "Trail Explorer", category: "boots", price: 9200, emoji: "🥾", bg: "#cbd4bd", badge: "" },
  { id: 4, name: "Coastal Slide", category: "sandals", price: 3200, emoji: "🩴", bg: "#cce1e4", badge: "Popular" },
  { id: 5, name: "Street Flex", category: "sneakers", price: 5900, emoji: "👟", bg: "#d8d5e9", badge: "" },
  { id: 6, name: "Executive Loafer", category: "formal", price: 8400, emoji: "👞", bg: "#e6d6c7", badge: "Premium" },
  { id: 7, name: "Safari Boot", category: "boots", price: 8800, emoji: "🥾", bg: "#d5cbb4", badge: "" },
  { id: 8, name: "Weekend Comfort", category: "sandals", price: 3900, emoji: "🩴", bg: "#e2d9c8", badge: "" }
];

let activeCategory = "all";
let cart = JSON.parse(localStorage.getItem("strideCart") || "[]");

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const emptyState = document.getElementById("emptyState");

const formatMoney = value => `KSh ${value.toLocaleString()}`;

function renderProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(product => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(term) || product.category.includes(term);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image" style="--card-bg:${product.bg}">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <span aria-hidden="true">${product.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <h3>${product.name}</h3>
          <strong>${formatMoney(product.price)}</strong>
        </div>
        <p class="product-category">${product.category}</p>
        <div class="product-bottom">
          <span>Sizes 38–45</span>
          <button class="add-to-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">+</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyState.hidden = filtered.length !== 0;
}

function saveCart() {
  localStorage.setItem("strideCart", JSON.stringify(cart));
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQuantity;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartTotal.textContent = formatMoney(0);
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(product => product.id === item.id);
    return `
      <div class="cart-item">
        <div class="cart-item-emoji">${product.emoji}</div>
        <div>
          <h4>${product.name}</h4>
          <p>${formatMoney(product.price)} × ${item.quantity}</p>
        </div>
        <button class="remove-item" data-remove="${product.id}" aria-label="Remove ${product.name}">×</button>
      </div>
    `;
  }).join("");

  const total = cart.reduce((sum, item) => {
    const product = products.find(product => product.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);
  cartTotal.textContent = formatMoney(total);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
  document.body.classList.add("no-scroll");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  overlay.hidden = true;
  document.body.classList.remove("no-scroll");
}

document.getElementById("categoryFilters").addEventListener("click", event => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
  activeCategory = button.dataset.category;
  renderProducts();
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest(".add-to-cart");
  if (button) addToCart(Number(button.dataset.id));
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (button) removeFromCart(Number(button.dataset.remove));
});

searchInput.addEventListener("input", renderProducts);
document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.getElementById("checkoutButton").addEventListener("click", () => {
  alert("This is a demo checkout. Connect M-Pesa, Stripe, or another payment provider before accepting orders.");
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("formMessage").textContent =
    "Thank you! This demo form is ready to connect to Formspree, Netlify Forms, or your own backend.";
  event.target.reset();
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  alert("Thanks for subscribing!");
  event.target.reset();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
