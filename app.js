/* ═══════════════════════════════════════════════════
   TA-NETJER — app.js
   ═══════════════════════════════════════════════════ */

/* ── PRODUCT DATA ──
   NOTE: Prices below are PLACEHOLDERS — replace the `price` value
   for each product with your real price. Everything else (cart math,
   totals, etc.) updates automatically once you do.
*/
const PRODUCTS = [
    {
      id: 1,
      name: 'Blue Lotus Artisan Shaving & Body Soap',
      tag: 'Skin Care',
      desc: 'A handcrafted round soap bar inspired by ancient Egypt\'s sacred Blue Lotus. Rich, cushioning lather from coconut, palm, canola, and castor oils — perfect for shaving or body wash. Naturally colored, phthalate-free fragrance, 5% superfat for soft, hydrated skin.',
      price: 9.00, // PLACEHOLDER — update with real price
      image: 'images/BlueSoap.png',
      badge: 'New',
    },
    {
      id: 2,
      name: 'Oatmeal Soap',
      tag: 'Skin Care',
      desc: 'Hypoallergenic and scent-free, made with natural ingredients for gentle, everyday cleansing. Soothing for sensitive skin.',
      price: 8.50, // PLACEHOLDER — update with real price
      image: 'images/OatmealSoap.png',
      badge: 'Bestseller',
    },
    {
      id: 3,
      name: 'Charcoal & Black Seed Soap',
      tag: 'Skin Care',
      desc: 'Detoxifying and purifying, handmade with natural ingredients to draw out impurities and brighten the skin.',
      price: 9.50, // PLACEHOLDER — update with real price
      image: 'images/BlackseedSoap.png',
      badge: null,
    },
    {
      id: 4,
      name: 'Turmeric Face Mask — Purify & Glow',
      tag: 'Skin Care',
      desc: '100% natural detoxifying blend sourced from the Horn of Africa. Purifies and brightens for a healthy glow. 150g.',
      price: 18.00, // PLACEHOLDER — update with real price
      image: 'images/TurmericMask.png',
      badge: null,
    },
    {
      id: 5,
      name: 'Hair Growth Solution with Vitamin E',
      tag: 'Hair Care',
      desc: 'Nourishes and strengthens, promotes healthy growth. Suitable for all hair types. Rooted in Africa.',
      price: 24.00, // PLACEHOLDER — update with real price
      image: 'images/Hairoil.png',
      badge: null,
    },
    {
      id: 6,
      name: 'Deodorant Cream — Lavender + Vanilla',
      tag: 'Body Care',
      desc: 'Vegan and organic, aluminium-free deodorant cream. Gentle on skin, kind to the planet. 2oz / 60ml.',
      price: 12.00, // PLACEHOLDER — update with real price
      image: 'images/Deodorant.png',
      badge: null,
    },
  ];
  
  /* ── CART STATE ── */
  let cart = JSON.parse(localStorage.getItem('tn_cart') || '[]');
  function saveCart() { localStorage.setItem('tn_cart', JSON.stringify(cart)); }
  function getCartCount() { return cart.reduce((n, i) => n + i.qty, 0); }
  function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
  
  function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(i => i.id === id);
    if (existing) { existing.qty++; }
    else { cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 }); }
    saveCart(); updateCartUI(); flashBtn(id);
  }
  
  function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    saveCart(); updateCartUI(); renderCartItems();
  }
  
  function updateCartUI() {
    const count = getCartCount();
    const el = document.getElementById('cartCount');
    if (el) { el.textContent = count; el.classList.toggle('visible', count > 0); }
    const total = document.getElementById('cartTotal');
    if (total) total.textContent = `£${getCartTotal().toFixed(2)}`;
    const footer = document.getElementById('cartFooter');
    if (footer) footer.style.display = cart.length > 0 ? 'block' : 'none';
  }
  
  function renderCartItems() {
    const el = document.getElementById('cartItems');
    if (!el) return;
    if (cart.length === 0) { el.innerHTML = '<p class="cart-modal__empty">Your cart is empty.</p>'; return; }
    el.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__qty">
          <button onclick="changeQty(${item.id},-1)" aria-label="Decrease">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id},1)" aria-label="Increase">+</button>
        </div>
        <div class="cart-item__price">£${(item.price * item.qty).toFixed(2)}</div>
      </div>
    `).join('');
  }
  
  function flashBtn(id) {
    const btn = document.querySelector(`[data-product-id="${id}"]`);
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = 'Added ✓';
    btn.style.background = 'var(--terracotta)'; btn.style.color = '#fff';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1400);
  }
  
  /* ── CART MODAL ── */
  function openCart() {
    const o = document.getElementById('cartOverlay');
    if (!o) return;
    o.classList.add('open'); o.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    showStep('stepCart');
    renderCartItems(); updateCartUI();
  }
  function closeCart() {
    const o = document.getElementById('cartOverlay');
    if (!o) return;
    o.classList.remove('open'); o.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  
  function showStep(stepId) {
    ['stepCart', 'stepCheckout', 'stepConfirm'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = id === stepId ? 'flex' : 'none';
    });
  }
  
  /* ── CHECKOUT FLOW ── */
  const PAYEE_EMAIL = 'tanetjer.nature@gmail.com';
  let lastOrderNumber = null;
  
  function generateOrderNumber() {
    const n = Math.floor(1000 + Math.random() * 9000);
    return `TN-${n}`;
  }
  
  function renderCheckoutSummary() {
    const el = document.getElementById('checkoutSummary');
    if (!el) return;
    const rows = cart.map(item => `
      <div class="checkout-summary__row">
        <span>${item.name} × ${item.qty}</span>
        <span>£${(item.price * item.qty).toFixed(2)}</span>
      </div>
    `).join('');
    el.innerHTML = rows + `
      <div class="checkout-summary__row checkout-summary__row--total">
        <span>Total</span>
        <span>£${getCartTotal().toFixed(2)}</span>
      </div>
    `;
  }
  
  function goToCheckout() {
    if (cart.length === 0) return;
    renderCheckoutSummary();
    showStep('stepCheckout');
  }
  
  function handleCheckoutSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const address = form.address.value.trim();
    if (!fullName || !email || !address) return;
  
    lastOrderNumber = generateOrderNumber();
    const total = getCartTotal().toFixed(2);
  
    document.getElementById('orderNumber').textContent = `#${lastOrderNumber}`;
    document.getElementById('payeeEmail').textContent = PAYEE_EMAIL;
    document.getElementById('payAmount').textContent = `£${total}`;
    document.getElementById('payReference').textContent = `Order #${lastOrderNumber}`;
  
    showStep('stepConfirm');
  }
  
  function copyToClipboard(text, btn) {
    navigator.clipboard?.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied ✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1500);
    }).catch(() => {});
  }
  
  function finishOrder() {
    cart = [];
    saveCart();
    updateCartUI();
    closeCart();
  }
  
  /* ── RENDER PRODUCTS ── */
  function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(p => `
      <div class="product-card reveal">
        <div class="product-card__img-wrap">
          ${p.image
            ? `<img src="${p.image}" alt="${p.name}" class="product-card__img" />`
            : `<div class="product-card__img-placeholder">
                 <svg viewBox="0 0 48 48" fill="none"><path d="M24 4C24 4 8 16 8 28a16 16 0 0032 0C40 16 24 4 24 4z" stroke="currentColor" stroke-width="1.5"/><path d="M24 20v16M18 30l6-6 6 6" stroke="currentColor" stroke-width="1.5"/></svg>
                 <span>Photo coming soon</span>
               </div>`
          }
          ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        </div>
        <div class="product-card__body">
          <span class="product-card__tag">${p.tag}</span>
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__desc">${p.desc}</p>
          <div class="product-card__footer">
            <span class="product-card__price">£${p.price.toFixed(2)}</span>
            <button class="product-card__add" data-product-id="${p.id}" onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');
    observeReveal();
  }
  
  /* ── PARALLAX HERO ── */
  function initParallax() {
    const photo = document.querySelector('.hero__photo');
    if (!photo) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      photo.style.transform = `scale(1.04) translateY(${y * 0.25}px)`;
    }, { passive: true });
  }
  
  /* ── SCROLL ── */
  function handleScroll() {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
  }
  
  function observeReveal() {
    const items = document.querySelectorAll('.reveal:not(.observed)');
    const io = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => { el.classList.add('observed'); io.observe(el); });
  }
  
  /* ── BURGER ── */
  function initBurger() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobileMenu');
    if (!burger || !menu) return;
    burger.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }
  
  /* ── EMAIL ── */
  function initEmail() {
    const btn = document.getElementById('emailSubmit');
    const input = document.getElementById('emailInput');
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      if (!input.value.trim().includes('@')) {
        input.style.borderColor = 'var(--terracotta)';
        setTimeout(() => input.style.borderColor = '', 1500);
        return;
      }
      btn.textContent = 'Thank you ✓';
      btn.style.background = 'var(--terracotta)';
      input.value = '';
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
    });
  }
  
  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    renderProducts();
    initParallax();
    initBurger();
    initEmail();
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    observeReveal();
  
    document.querySelector('.nav__cart')?.addEventListener('click', openCart);
    document.getElementById('cartClose')?.addEventListener('click', closeCart);
    document.getElementById('checkoutClose')?.addEventListener('click', closeCart);
    document.getElementById('confirmClose')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', e => { if (e.target.id === 'cartOverlay') closeCart(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
  
    document.getElementById('goToCheckout')?.addEventListener('click', goToCheckout);
    document.getElementById('backToCart')?.addEventListener('click', () => showStep('stepCart'));
    document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckoutSubmit);
    document.getElementById('finishOrder')?.addEventListener('click', finishOrder);
  
    document.getElementById('copyEmail')?.addEventListener('click', (e) => copyToClipboard(PAYEE_EMAIL, e.target));
    document.getElementById('copyAmount')?.addEventListener('click', (e) => copyToClipboard(document.getElementById('payAmount').textContent, e.target));
    document.getElementById('copyReference')?.addEventListener('click', (e) => copyToClipboard(document.getElementById('payReference').textContent, e.target));
  
    updateCartUI();
  });