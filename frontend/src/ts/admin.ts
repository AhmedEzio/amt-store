
import { apiFetch } from './api.js';
import { requireAdmin, mountGlobals, currency, showToast } from './ui.js';
let editingId = '';
const loadProducts = async () => {
  const list = document.getElementById('adminProducts'); if (!list) return; const data = await apiFetch('/products?page=1&limit=100');
  (document.getElementById('totalProducts') as HTMLElement).textContent = String(data.total || data.products.length);
  list.innerHTML = data.products.map((item:any)=>`
    <article class="admin-product-item">
      <img src="${item.image}" alt="${item.title}" />
      <div>
        <div class="d-flex justify-content-between gap-3 flex-wrap"><h4 class="headline-font mb-1">${item.title}</h4><span class="badge-category">${item.category}</span></div>
        <p class="text-secondary mb-2">${item.description.slice(0,110)}...</p>
        <small class="text-secondary">Stock: ${item.stock}</small>
      </div>
      <div class="d-grid gap-2 justify-items-end"><strong class="price">${currency(item.price)}</strong><div class="d-flex gap-2"><button class="btn-soft" data-edit="${item._id}">Edit</button><button class="btn-soft" data-delete="${item._id}">Delete</button></div></div>
    </article>`).join('');
  list.querySelectorAll('[data-delete]').forEach((btn)=> btn.addEventListener('click', async ()=> {
    if (!confirm('Delete this product?')) return; try { await apiFetch(`/products/${(btn as HTMLElement).dataset.delete}`, { method:'DELETE' }); showToast('Product deleted'); await loadProducts(); } catch(e:any){ showToast(e.message,'danger'); }
  }));
  list.querySelectorAll('[data-edit]').forEach((btn)=> btn.addEventListener('click', async ()=> {
    try { const product = await apiFetch(`/products/${(btn as HTMLElement).dataset.edit}`); editingId = product._id; (document.getElementById('title') as HTMLInputElement).value = product.title; (document.getElementById('description') as HTMLTextAreaElement).value = product.description; (document.getElementById('price') as HTMLInputElement).value = product.price; (document.getElementById('category') as HTMLInputElement).value = product.category; (document.getElementById('stock') as HTMLInputElement).value = product.stock; (document.getElementById('image') as HTMLInputElement).value = product.image; showToast('Loaded product for editing'); window.scrollTo({top:0, behavior:'smooth'}); } catch(e:any){ showToast(e.message,'danger'); }
  }));
};
const loadOrders = async () => { const list = document.getElementById('adminOrders'); if (!list) return; const orders = await apiFetch('/orders'); (document.getElementById('totalOrders') as HTMLElement).textContent = String(orders.length); list.innerHTML = orders.slice(0,6).map((order:any)=>`<div class="summary-row"><span>${order.user?.name || 'User'} • ${order.items.length} items</span><strong>${currency(order.totalPrice)}</strong></div>`).join('') || '<div class="empty-view">No orders yet.</div>'; };
document.addEventListener('DOMContentLoaded', ()=> {
  mountGlobals(); requireAdmin(); loadProducts().catch((e:any)=>showToast(e.message,'danger')); loadOrders().catch((e:any)=>showToast(e.message,'danger'));
  document.getElementById('productForm')?.addEventListener('submit', async (e)=> {
    e.preventDefault(); const payload = { title:(document.getElementById('title') as HTMLInputElement).value, description:(document.getElementById('description') as HTMLTextAreaElement).value, price:Number((document.getElementById('price') as HTMLInputElement).value), category:(document.getElementById('category') as HTMLInputElement).value, stock:Number((document.getElementById('stock') as HTMLInputElement).value), image:(document.getElementById('image') as HTMLInputElement).value };
    try { if (editingId) { await apiFetch(`/products/${editingId}`, { method:'PUT', body:JSON.stringify(payload) }); showToast('Product updated'); } else { await apiFetch('/products', { method:'POST', body:JSON.stringify(payload) }); showToast('Product created'); } editingId=''; (document.getElementById('productForm') as HTMLFormElement).reset(); await loadProducts(); }
    catch(error:any){ showToast(error.message,'danger'); }
  });
  document.getElementById('resetBtn')?.addEventListener('click', ()=> { editingId=''; (document.getElementById('productForm') as HTMLFormElement).reset(); });
});
