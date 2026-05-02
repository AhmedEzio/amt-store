
import { apiFetch } from './api.js';
import { setUserSession, getUser } from './storage.js';
import { mountGlobals, showToast } from './ui.js';
const toggle = (mode:'login'|'register') => {
  document.querySelectorAll('[data-mode-btn]').forEach((btn) => btn.classList.toggle('active', (btn as HTMLElement).dataset.modeBtn === mode));
  (document.getElementById('loginWrap') as HTMLElement).style.display = mode === 'login' ? 'block' : 'none';
  (document.getElementById('registerWrap') as HTMLElement).style.display = mode === 'register' ? 'block' : 'none';
};
document.addEventListener('DOMContentLoaded', () => {
  mountGlobals(); if (getUser()) location.href = '../index.html';
  document.querySelectorAll('[data-mode-btn]').forEach((btn) => btn.addEventListener('click', ()=> toggle(((btn as HTMLElement).dataset.modeBtn || 'login') as any)));
  toggle('login');
  document.getElementById('loginForm')?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    try { const data = await apiFetch('/auth/login', { method:'POST', body:JSON.stringify({ email:(document.getElementById('loginEmail') as HTMLInputElement).value, password:(document.getElementById('loginPassword') as HTMLInputElement).value }) }); setUserSession(data); showToast('Welcome back'); setTimeout(()=> location.href = '../index.html', 500); }
    catch(error:any){ showToast(error.message, 'danger'); }
  });
  document.getElementById('registerForm')?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    try { const data = await apiFetch('/auth/register', { method:'POST', body:JSON.stringify({ name:(document.getElementById('registerName') as HTMLInputElement).value, email:(document.getElementById('registerEmail') as HTMLInputElement).value, password:(document.getElementById('registerPassword') as HTMLInputElement).value }) }); setUserSession(data); showToast('Account created'); setTimeout(()=> location.href = '../index.html', 500); }
    catch(error:any){ showToast(error.message, 'danger'); }
  });
});
