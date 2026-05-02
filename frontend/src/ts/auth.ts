import { apiFetch } from './api.js';
import { setUserSession, getUser } from './storage.js';
import { showToast } from './ui.js';

const redirectIfLogged = () => {
  if (getUser()) location.href = '../index.html';
};

const bindLogin = () => {
  const form = document.getElementById('loginForm') as HTMLFormElement | null;
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    try {
      const data = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      setUserSession(data);
      showToast('Login successful');
      setTimeout(() => (location.href = '../index.html'), 700);
    } catch (error: any) {
      showToast(error.message, 'danger');
    }
  });
};

const bindRegister = () => {
  const form = document.getElementById('registerForm') as HTMLFormElement | null;
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
      setUserSession(data);
      showToast('Account created successfully');
      setTimeout(() => (location.href = '../index.html'), 700);
    } catch (error: any) {
      showToast(error.message, 'danger');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  redirectIfLogged();
  bindLogin();
  bindRegister();
});
