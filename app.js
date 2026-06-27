/* ═══════════════════════════════════════════════════
   TA-NETJER — app.js
   WhatsApp ordering · No cart needed
   ═══════════════════════════════════════════════════ */

   const WA_NUMBER = '16134139455';

   const PRODUCTS = [
     {
       id: 1,
       name: 'Blue Lotus Artisan Shaving & Body Soap',
       tag: 'Skin Care',
       desc: 'A handcrafted round soap bar inspired by ancient Egypt\'s sacred Blue Lotus. Rich, cushioning lather from coconut, palm, canola, and castor oils - perfect for shaving or body wash. Phthalate-free fragrance, 5% superfat for soft, hydrated skin.',
       price: 8.99,
       image: 'images/BlueSoap.png',
       badge: 'New',
     },
     {
       id: 2,
       name: 'Oatmeal Soap',
       tag: 'Skin Care',
       desc: 'Hypoallergenic and scent-free. Handmade with natural ingredients for gentle, everyday cleansing. Soothing and pure - ideal for sensitive skin.',
       price: 8.99,
       image: 'images/OatmealSoap.png',
       badge: 'Bestseller',
     },
     {
       id: 3,
       name: 'Charcoal & Black Seed Soap',
       tag: 'Skin Care',
       desc: 'Detoxifying and purifying. Deep-cleansing activated charcoal meets the healing power of black seed. Handmade with natural ingredients to draw out impurities and brighten the skin.',
       price: 8.99,
       image: 'images/BlackseedSoap.png',
       badge: null,
     },
     {
       id: 4,
       name: 'Moringa Soap',
       tag: 'Skin Care',
       desc: 'Naturally nourishing. Deeply healing. Handmade with Moringa Leaf Powder and a healing blend of rosemary, cedarwood, and sweet orange essential oils for healthy, radiant skin. Pure & gentle for all skin types.',
       price: 8.99,
       image: 'images/MoringaSoap.png',
       badge: null,
     },
     {
       id: 5,
       name: 'Turmeric Face Mask - Purify & Glow',
       tag: 'Face Care',
       desc: '100% natural. Purifies & brightens, nourishes your skin. Sourced from the Horn of Africa. 150g.',
       price: 14.99,
       image: 'images/TurmericMask.png',
       badge: null,
     },
     {
       id: 6,
       name: 'Qasil Face Pack',
       tag: 'Face Care',
       desc: 'Natural deep cleansing. Made from the leaves of the Gob Tree grown in Somalia. Deep cleansing & purifying, revitalizes and nourishes skin. 100% natural. 150g.',
       price: 18.99,
       image: 'images/QasilPack.png',
       badge: null,
     },
     {
       id: 7,
       name: 'Henna & Botanical Shampoo Bar',
       tag: 'Hair Care',
       desc: 'Natural care for healthy, strong, beautiful hair. Handmade with premium henna powder and botanical oils to gently cleanse, condition, and revitalize your hair. Phthalate-free fragrance. Gentle & safe for all hair types.',
       price: 8.99,
       image: 'images/ShampooBar.png',
       badge: null,
     },
     {
       id: 8,
       name: 'Hair Growth Solution with Vitamin E',
       tag: 'Hair Care',
       desc: 'Nourishes and strengthens, promotes healthy growth. Formulated with Vitamin E. Suitable for all hair types. Rooted in Africa.',
       price: 15.99,
       image: 'images/Hairoil.png',
       badge: null,
     },
     {
       id: 9,
       name: 'Deodorant Cream - Lavender + Vanilla',
       tag: 'Body Care',
       desc: 'Vegan and organic, aluminium-free deodorant cream. Gentle on skin, kind to the planet. 2oz / 60ml.',
       price: 12.99,
       image: 'images/Deodorant.png',
       badge: null,
     },
   ];
   
   /* ── WHATSAPP ORDER ── */
   function orderViaWhatsApp(productId) {
     const product = PRODUCTS.find(p => p.id === productId);
     if (!product) return;
     const msg = encodeURIComponent(
       `Hi Ta Netjer! I'd like to order:\n\n` +
       `*${product.name}*\n` +
       `Price: $${product.price.toFixed(2)}\n\n` +
       `Please let me know availability and shipping details. Thank you!`
     );
     const url = `https://wa.me/${WA_NUMBER}?text=${msg}`;
     window.open(url, '_blank');
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
                  <svg viewBox="0 0 48 48" fill="none"><path d="M24 4C24 4 8 16 8 28a16 16 0 0032 0C40 16 24 4 24 4z" stroke="currentColor" stroke-width="1.5"/></svg>
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
             <span class="product-card__price">$${p.price.toFixed(2)}</span>
             <button
               class="product-card__add product-card__wa"
               onclick="orderViaWhatsApp(${p.id})"
               aria-label="Order ${p.name} via WhatsApp"
             >
               <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
               Order via WhatsApp
             </button>
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
     if (window.innerWidth <= 768) return;
     window.addEventListener('scroll', () => {
       photo.style.transform = `scale(1.04) translateY(${window.scrollY * 0.25}px)`;
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
       btn.textContent = 'Thank you!';
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
   });