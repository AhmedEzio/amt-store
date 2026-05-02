
import { apiFetch } from './api.js';
import { getUser } from './storage.js';
import { mountGlobals, currency, requireAuth, initials, showToast } from './ui.js';
const render = async () => {
  const user = requireAuth(); if (!user) return; const name = user.name || 'User';
  const info = document.getElementById('profileInfo'); const list = document.getElementById('ordersList'); if (!info || !list) return;
  info.innerHTML = `<div class="profile-badge"><div class="avatar">${initials(name)}</div><div><h2 class="headline-font mb-1">${name}</h2><p class="text-secondary mb-1">${user.email}</p><span class="badge-category text-uppercase">${user.role}</span></div></div>`;
  const orders = await apiFetch('/orders/my');
  if (!orders.length) { list.innerHTML = '<div class="empty-view">No orders yet. Complete a checkout to see your timeline here.</div>'; return; }
  list.innerHTML = orders.map((order:any) => `
    <article class="order-item">
      <div class="avatar">#</div>
      <div>
        <div class="d-flex justify-content-between gap-3 flex-wrap"><h4 class="headline-font mb-1">Order ${order._id.slice(-6).toUpperCase()}</h4><span class="badge-stock">${order.status}</span></div>
        <p class="text-secondary mb-2">${new Date(order.createdAt).toLocaleDateString()} • ${order.items.length} item(s)</p>
        <small class="text-secondary">Ship to ${order.shippingAddress?.city || '—'} • ${order.shippingAddress?.address || '—'}</small>
      </div>
      <strong class="price">${currency(order.totalPrice)}</strong>
    </article>`).join('');
};
document.addEventListener('DOMContentLoaded', ()=> { mountGlobals(); render().catch((e:any)=>showToast(e.message,'danger')); });
