# AMT Store

AMT Store is a full-stack e-commerce project built with:

- Frontend: HTML, CSS, Bootstrap, JavaScript, TypeScript
- Backend: Node.js, Express.js, MongoDB, JWT
- Bonus features: Pagination, Search, Filters, Route protection, Admin dashboard, Cloudinary-ready image upload

## Features

### User Side
- Register / Login with JWT
- Browse products
- Search and filter products
- Pagination
- Add to cart
- Fake checkout

### Admin Side
- Protected admin dashboard
- Add / edit / delete products
- Manage product list

## Project Structure

```bash
amt-store/
  backend/
  frontend/
  README.md
```

## 1) Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/amt-store
JWT_SECRET=supersecretjwtkey
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Run MongoDB
Make sure MongoDB is running locally.

### Seed demo data
```bash
npm run seed
```

### Start backend
```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

## 2) Frontend Setup

```bash
cd frontend
npm install
npm run build
```

Then run the frontend with a local server.

Example using VS Code Live Server or:

```bash
npx serve .
```

Open:

```bash
http://localhost:3000
```

> If your frontend runs on a different port/path, keep the backend API in `frontend/src/ts/config.ts` as:

```ts
export const API_BASE_URL = 'http://localhost:5000/api';
```

## Demo Accounts

After running seed:

- Admin: `admin@amtstore.com` / `Admin@123`
- User: `user@amtstore.com` / `User@123`

## Notes

- Cloudinary is optional right now. If you add your Cloudinary keys, the backend is ready for uploaded images.
- Without Cloudinary keys, admin can still save image URLs directly.
- The current UI is a default clean version. Once you send your preferred UI, it can be swapped into the same structure.

## Main Pages

- `/index.html`
- `/pages/login.html`
- `/pages/register.html`
- `/pages/checkout.html`
- `/pages/admin.html`



## Updated UI Screens

- Home
- Shop / Listing
- Product Details
- Cart
- Checkout
- Access (Login/Register)
- Profile & Orders
- Admin Dashboard

The frontend follows the uploaded "Digital Atelier" design direction with premium spacing, glassmorphism navigation, tonal surfaces, and gradient CTAs.
