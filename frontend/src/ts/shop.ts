
import { apiFetch } from './api.js';
import { mountGlobals, currency, renderStars, addToCart, showToast } from './ui.js';
let currentPage = 1;
const state = { search:'', category:'all', minPrice:'', maxPrice:'' };
const render = async (page=1) => {
  currentPage = page;
  const list = document.getElementById('productList'); const pager = document.getElementById('pagination');
  if (!list || !pager) return; list.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
  const query = new URLSearchParams({ page:String(page), limit:'9', search:state.search, category:state.category, minPrice:state.minPrice, maxPrice:state.maxPrice });
  const data = await apiFetch(`/products?${query.toString()}`);
  if (!data.products.length) { list.innerHTML = '<div class="empty-view">No products match your filters.</div>'; pager.innerHTML=''; return; }
  list.innerHTML = data.products.map((product:any) => `
    <article class="product-card">
      <a class="product-media" href="product.html?id=${product._id}"><img src="${product.image}" alt="${product.title}" /></a>
      <div class="product-body">
        <div class="d-flex justify-content-between gap-2 flex-wrap"><span class="badge-category">${product.category}</span>${product.stock > 0 ? '<span class="badge-stock">In stock</span>' : '<span class="badge-sale">Sold out</span>'}</div>
        <h3>${product.title}</h3><p>${product.description.slice(0,92)}...</p>
        <div class="d-flex align-items-center justify-content-between"><small class="text-secondary">${renderStars(4.8)}</small><small class="text-secondary">${product.stock} units</small></div>
        <div class="price-row"><span class="price">${currency(product.price)}</span><div class="d-flex gap-2"><a href="product.html?id=${product._id}" class="btn-soft">View</a><button class="btn-gradient" data-add="${product._id}">Add</button></div></div>
      </div>
    </article>`).join('');
  pager.innerHTML = Array.from({length:data.pages}, (_,i) => `<button class="page-dot ${i+1===data.page?'active':''}" data-page="${i+1}">${i+1}</button>`).join('');
  pager.querySelectorAll('[data-page]').forEach((btn)=>btn.addEventListener('click', ()=> render(Number((btn as HTMLElement).dataset.page))));
  document.querySelectorAll('[data-add]').forEach((btn)=> btn.addEventListener('click', async ()=>{ try { await addToCart((btn as HTMLElement).dataset.add || ''); } catch(e:any){showToast(e.message,'danger')} }));
};
document.addEventListener('DOMContentLoaded', () => {
  mountGlobals();
  document.getElementById('applyFilters')?.addEventListener('click', () => {
    state.search = (document.getElementById('searchInput') as HTMLInputElement).value;
    state.category = (document.getElementById('categoryFilter') as HTMLSelectElement).value;
    state.minPrice = (document.getElementById('minPrice') as HTMLInputElement).value;
    state.maxPrice = (document.getElementById('maxPrice') as HTMLInputElement).value;
    render(1).catch((e:any)=>showToast(e.message,'danger'));
  });
  render(currentPage).catch((e:any)=>showToast(e.message,'danger'));
});
