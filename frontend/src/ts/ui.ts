
import { getCart, getUser, clearUserSession, saveCart } from './storage.js';
import { apiFetch } from './api.js';
export const currency = (v:number) => `${v.toFixed(2)} EGP`;
export const showToast = (message:string, type:'success'|'danger'='success') => {
  const container = document.getElementById('toastContainer'); if (!container) return;
  const el = document.createElement('div'); el.className = `toast-msg ${type === 'danger' ? 'danger' : ''}`; el.textContent = message; container.appendChild(el); setTimeout(() => el.remove(), 2600);
};
export const initials = (name:string) => name.split(' ').map((p) => p[0]).slice(0,2).join('').toUpperCase();
export const getQuery = (name:string) => new URLSearchParams(location.search).get(name) || '';
export const updateNavbar = () => {
  const user = getUser(); const cartCount = document.querySelectorAll('[data-cart-count]');
  cartCount.forEach((n) => n.textContent = String(getCart().reduce((a,b) => a + b.quantity, 0)));
  document.querySelectorAll('[data-auth-area]').forEach((wrapper) => {
    wrapper.innerHTML = user ? `
      <div class="dropdown">
        <button class="btn btn-soft dropdown-toggle" data-bs-toggle="dropdown">${user.name}</button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg p-2" style="border-radius:18px;">
          <li><a class="dropdown-item rounded-3" href="${location.pathname.includes('/pages/') ? 'profile.html' : 'pages/profile.html'}">Profile & Orders</a></li>
          ${user.role === 'admin' ? `<li><a class="dropdown-item rounded-3" href="${location.pathname.includes('/pages/') ? 'admin.html' : 'pages/admin.html'}">Admin Dashboard</a></li>` : ''}
          <li><button class="dropdown-item rounded-3" id="logoutBtn">Logout</button></li>
        </ul>
      </div>` : `<a class="btn-gradient" href="${location.pathname.includes('/pages/') ? 'access.html' : 'pages/access.html'}">Login / Register</a>`;
    document.getElementById('logoutBtn')?.addEventListener('click', () => { clearUserSession(); showToast('Logged out'); setTimeout(()=> location.href = location.pathname.includes('/pages/') ? '../index.html' : 'index.html', 300); });
  });
};
export const setActiveNav = () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((a) => { if ((a as HTMLAnchorElement).getAttribute('href')?.includes(path)) a.classList.add('active'); });
};
export const renderStars = (rate=4.8) => '★★★★★ ' + rate.toFixed(1);
export async function addToCart(id:string) {
  const product = await apiFetch(`/products/${id}`);
  const cart = getCart(); const existing = cart.find((item) => item._id === id);
  if (existing) existing.quantity += 1; else cart.push({_id:product._id, title:product.title, price:product.price, image:product.image, quantity:1, category:product.category});
  saveCart(cart); updateNavbar(); showToast('Added to cart');
}
export const removeCartItem = (id:string) => { saveCart(getCart().filter((item) => item._id !== id)); updateNavbar(); showToast('Item removed','danger'); };
export const updateCartQty = (id:string, delta:number) => { const cart = getCart(); const item = cart.find((it) => it._id === id); if (!item) return; item.quantity += delta; if (item.quantity <= 0) return removeCartItem(id); saveCart(cart); updateNavbar(); };
export const requireAuth = () => { const user = getUser(); if (!user) location.href = 'access.html'; return user; };
export const requireAdmin = () => { const user = getUser(); if (!user || user.role !== 'admin') location.href = 'access.html'; return user; };
export const mountGlobals = () => { Object.assign(window, { addToCart, removeCartItem, updateCartQty }); updateNavbar(); setActiveNav(); };
