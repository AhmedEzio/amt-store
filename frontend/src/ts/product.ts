
import { apiFetch } from './api.js';
import { mountGlobals, currency, renderStars, getQuery, addToCart, showToast } from './ui.js';
const render = async () => {
  const id = getQuery('id'); if (!id) throw new Error('Missing product ID');
  const product = await apiFetch(`/products/${id}`);
  const root = document.getElementById('productRoot'); if (!root) return;
  root.innerHTML = `
    <div class="product-shell">
      <div class="product-detail-grid">
        <div>
          <div class="gallery-main"><img src="${product.image}" alt="${product.title}" /></div>
          <div class="thumb-row"><div class="mini-thumb"><img src="${product.image}" alt="${product.title}" /></div><div class="mini-thumb"><img src="${product.image}" alt="${product.title}" /></div><div class="mini-thumb"><img src="${product.image}" alt="${product.title}" /></div></div>
        </div>
        <div class="product-summary">
          <span class="badge-category">${product.category}</span>
          <h1>${product.title}</h1>
          <div class="d-flex gap-3 flex-wrap align-items-center mb-3"><span class="badge-stock">${product.stock} Available</span><small class="text-secondary">${renderStars(4.9)} • premium editorial layout</small></div>
          <p>${product.description}</p>
          <div class="detail-list">
            <div class="detail-chip"><small class="text-secondary d-block mb-1">Price</small><strong class="price">${currency(product.price)}</strong></div>
            <div class="detail-chip"><small class="text-secondary d-block mb-1">Delivery</small><strong>2 - 4 business days</strong></div>
            <div class="detail-chip"><small class="text-secondary d-block mb-1">Warranty</small><strong>12 months support</strong></div>
            <div class="detail-chip"><small class="text-secondary d-block mb-1">Curated For</small><strong>Modern daily use</strong></div>
          </div>
          <div class="d-flex gap-3 flex-wrap"><button class="btn-gradient" id="addOne">Add to Cart</button><a href="cart.html" class="btn-soft">Go to Cart</a></div>
        </div>
      </div>
    </div>`;
  document.getElementById('addOne')?.addEventListener('click', async ()=> { try { await addToCart(id); } catch(e:any){showToast(e.message,'danger')} });
};
document.addEventListener('DOMContentLoaded', ()=> { mountGlobals(); render().catch((e:any)=>showToast(e.message,'danger')); });
