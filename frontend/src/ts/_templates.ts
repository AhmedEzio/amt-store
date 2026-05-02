
export const pageShell = (title:string, content:string, depth='') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | AMT Store</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="${depth}assets/css/style.css" />
</head>
<body>
  <div class="atelier-nav">
    <div class="container container-xxl">
      <div class="nav-shell d-flex align-items-center justify-content-between gap-4 flex-wrap">
        <a href="${depth}index.html" class="d-flex align-items-center gap-3">
          <span class="brand-mark">A</span>
          <div><div class="brand-name">AMT Store</div><small class="nav-meta text-secondary">Digital Atelier Commerce</small></div>
        </a>
        <div class="d-flex align-items-center gap-4 flex-wrap mobile-stack">
          <nav class="d-flex align-items-center gap-3 flex-wrap">
            <a class="nav-link atelier-link" data-nav href="${depth}index.html">Home</a>
            <a class="nav-link atelier-link" data-nav href="${depth}pages/shop.html">Shop</a>
            <a class="nav-link atelier-link" data-nav href="${depth}pages/cart.html">Cart</a>
            <a class="nav-link atelier-link" data-nav href="${depth}pages/profile.html">Orders</a>
          </nav>
          <div class="d-flex align-items-center gap-3">
            <a href="${depth}pages/cart.html" class="btn-soft position-relative">Cart <span class="ms-1" data-cart-count>0</span></a>
            <div data-auth-area></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <main class="container container-xxl">${content}</main>
  <footer class="footer-shell">
    <div class="container container-xxl d-flex justify-content-between flex-wrap gap-3">
      <span>AMT Store © 2026</span><span>Full Stack • JWT • MongoDB • TypeScript • Admin Dashboard</span>
    </div>
  </footer>
  <div class="toast-wrap" id="toastContainer"></div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`
