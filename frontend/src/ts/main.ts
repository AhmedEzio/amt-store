
import { apiFetch } from './api.js';
import { mountGlobals, currency, renderStars, addToCart, showToast } from './ui.js';

const heroProducts = async () => {
  const data = await apiFetch('/products?page=1&limit=8');
  return data.products;
};

const renderFeatured = async () => {
  const grid = document.getElementById('featuredProducts');
  const picks = document.getElementById('curatedPicks');
  if (!grid || !picks) return;
  grid.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
  const products = await heroProducts();
  grid.innerHTML = products.slice(0,3).map((product:any) => `
    <article class="product-card">
      <a class="product-media" href="pages/product.html?id=${product._id}">
        <img src="${product.image}" alt="${product.title}" />
      </a>
      <div class="product-body">
        <span class="badge-category">${product.category}</span>
        <h3>${product.title}</h3>
        <p>${product.description.slice(0,95)}...</p>
        <div class="d-flex align-items-center justify-content-between text-secondary"><small>${renderStars(4.7)}</small><small>${product.stock} in stock</small></div>
        <div class="price-row">
          <span class="price">${currency(product.price)}</span>
          <div class="d-flex gap-2"><a class="btn-soft" href="pages/product.html?id=${product._id}">Details</a><button class="btn-gradient" data-add="${product._id}">Add</button></div>
        </div>
      </div>
    </article>`).join('');
  picks.innerHTML = products.slice(3,8).map((product:any, index:number) => `
    <div class="floating-card">
      <div class="d-flex align-items-center justify-content-between mb-2"><span class="badge-category">0${index+1}</span><span class="badge-stock">Curated</span></div>
      <h4>${product.title}</h4>
      <p class="text-secondary mb-3">${product.description.slice(0,100)}...</p>
      <div class="d-flex justify-content-between align-items-center gap-3"><strong class="price">${currency(product.price)}</strong><a class="btn-ghost" href="pages/product.html?id=${product._id}">Open Product</a></div>
    </div>`).join('');
  document.querySelectorAll('[data-add]').forEach((btn) => btn.addEventListener('click', async () => { try { await addToCart((btn as HTMLElement).dataset.add || ''); } catch (e:any) { showToast(e.message, 'danger'); } }));
};

document.addEventListener('DOMContentLoaded', () => { mountGlobals(); renderFeatured().catch((e:any)=>showToast(e.message,'danger')); });
