
import { getCart } from './storage.js';
import { mountGlobals, currency, removeCartItem, updateCartQty } from './ui.js';
const render = () => {
  const items = document.getElementById('cartItems'); const total = document.getElementById('cartTotal'); if (!items || !total) return;
  const cart = getCart();
  if (!cart.length) { items.innerHTML = '<div class="empty-view">Your bag is empty. Curate a few pieces first.</div>'; total.textContent = currency(0); return; }
  items.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" />
      <div>
        <span class="badge-category">${item.category || 'Curated item'}</span>
        <h4 class="mt-2 mb-2 headline-font">${item.title}</h4>
        <p class="text-secondary mb-3">Balanced utility, premium finish, and editorial presentation.</p>
        <div class="d-flex gap-2 flex-wrap"><button class="btn-soft" data-minus="${item._id}">-</button><span class="btn-soft">Qty ${item.quantity}</span><button class="btn-soft" data-plus="${item._id}">+</button><button class="btn-ghost" data-remove="${item._id}">Remove</button></div>
      </div>
      <strong class="price">${currency(item.price * item.quantity)}</strong>
    </div>`).join('');
  const grand = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); total.textContent = currency(grand); const duplicate = document.getElementById('cartTotalDuplicate'); if (duplicate) duplicate.textContent = currency(grand);
  items.querySelectorAll('[data-remove]').forEach((b)=> b.addEventListener('click', ()=>{ removeCartItem((b as HTMLElement).dataset.remove || ''); render(); }));
  items.querySelectorAll('[data-plus]').forEach((b)=> b.addEventListener('click', ()=>{ updateCartQty((b as HTMLElement).dataset.plus || '', 1); render(); }));
  items.querySelectorAll('[data-minus]').forEach((b)=> b.addEventListener('click', ()=>{ updateCartQty((b as HTMLElement).dataset.minus || '', -1); render(); }));
};
document.addEventListener('DOMContentLoaded', ()=> { mountGlobals(); render(); });
