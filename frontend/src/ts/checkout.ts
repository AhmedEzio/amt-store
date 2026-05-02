
import { apiFetch } from './api.js';
import { getCart, saveCart, getUser } from './storage.js';
import { mountGlobals, currency, requireAuth, showToast } from './ui.js';
const renderSummary = () => {
  const list = document.getElementById('checkoutSummary'); const total = document.getElementById('checkoutTotal'); const email = document.getElementById('email') as HTMLInputElement | null;
  const user = getUser(); if (email && user?.email) email.value = user.email;
  if (!list || !total) return; const cart = getCart();
  list.innerHTML = cart.map((item) => `<div class="summary-row"><span>${item.title} × ${item.quantity}</span><strong>${currency(item.price * item.quantity)}</strong></div>`).join('');
  total.textContent = currency(cart.reduce((sum, item)=> sum + item.price * item.quantity, 0));
};
document.addEventListener('DOMContentLoaded', ()=> {
  mountGlobals(); requireAuth(); renderSummary();
  document.getElementById('checkoutForm')?.addEventListener('submit', async (e)=>{
    e.preventDefault(); const cart = getCart(); if (!cart.length) return showToast('Cart is empty','danger');
    const payload = {
      shippingAddress: {
        fullName: (document.getElementById('fullName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        city: (document.getElementById('city') as HTMLInputElement).value,
        address: (document.getElementById('address') as HTMLInputElement).value
      },
      items: cart,
      totalPrice: cart.reduce((sum, item)=> sum + item.price * item.quantity, 0)
    };
    try { await apiFetch('/orders', { method:'POST', body:JSON.stringify(payload) }); saveCart([]); showToast('Checkout completed'); setTimeout(()=> location.href = '../index.html', 700); }
    catch(error:any){ showToast(error.message, 'danger'); }
  });
});
