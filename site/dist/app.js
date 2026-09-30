const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const products = [
  { id: 'german', name: 'سوسیس آلمانی مرغ', category: 'sausage', image: 'german', badge: 'طعم کلاسیک', desc: 'مرغ تازه و ترکیب ادویه‌های معطر؛ خوش‌طعم کنار سیب‌زمینی و توی ساندویچ.', note: 'برای یک وعدهٔ دلچسب' },
  { id: 'mushroom', name: 'کالباس مرغ و قارچ', category: 'deli', image: 'chicken-mushroom', badge: 'رنگ و طعم، کنار هم', desc: 'مرغ، قارچ و تکه‌های رنگارنگ سبزیجات؛ هر برش، یک ترکیب دوست‌داشتنی.', note: 'همراه ساندویچ و پیش‌غذا' },
  { id: 'cheese', name: 'کوکتل پنیری', category: 'sausage', image: 'sausages', badge: 'رفیق دورهمی', desc: 'کوکتل با طعم دلنشین پنیر؛ یک انتخاب خوشمزه برای عصرهای دورهمی.', note: 'از خانوادهٔ سوسیس‌ها', representative: true },
  { id: 'kids', name: 'سوسیس کودک', category: 'special', image: 'kids', badge: 'با ادویهٔ ملایم', desc: 'ترکیب بوقلمون، تخم بلدرچین و سویق کودک با ادویه‌های ملایم.', note: 'ترکیبات را پیش از سفارش بپرسید' },
  { id: 'mortadella', name: 'کالباس مارتادلا', category: 'deli', image: 'packaging', badge: 'آمادهٔ یک لقمه', desc: 'یک انتخاب آشنا برای ساندویچ‌های خانگی و لقمه‌های جمع‌وجور.', note: 'از خانوادهٔ کالباس‌ها', representative: true },
  { id: 'luxury', name: 'سوسیس مرغ لوکس', category: 'sausage', image: 'german', badge: 'عطر و طعم خانگی', desc: 'با گوشت مرغ و چاشنی‌های خوش‌عطر؛ همراه نان تازه و سبزیجات.', note: 'از خانوادهٔ سوسیس‌ها', representative: true },
  { id: 'bulgarian', name: 'سوسیس بلغاری', category: 'sausage', image: 'sausages', desc: 'برای تنوع دادن به ساندویچ‌ها و امتحان یک طعم تازه.', note: 'از خانوادهٔ سوسیس‌ها', representative: true },
  { id: 'nuggets', name: 'ناگت مرغ', category: 'special', image: null, desc: 'لقمه‌های مرغ برای کنار سیب‌زمینی، سبزیجات و سس دلخواه شما.', note: 'جزئیات و موجودی در ایتا' },
  { id: 'ham', name: 'ژامبون مرغ', category: 'deli', image: 'packaging', desc: 'برای ساندویچ‌های سرد، پیش‌غذا و یک میز پذیرایی رنگارنگ.', note: 'از خانوادهٔ کالباس‌ها', representative: true },
  { id: 'dry', name: 'کالباس خشک', category: 'deli', image: 'packaging', desc: 'طعمی متفاوت برای دوست‌داران لقمه‌های پرمزه و چاشنی‌های معطر.', note: 'از خانوادهٔ کالباس‌ها', representative: true },
];
let activeFilter = 'all';
let expandedCatalog = false;
function renderProducts() {
  const filtered = products.filter(p => activeFilter === 'all' || p.category === activeFilter);
  const visible = activeFilter === 'all' && !expandedCatalog ? filtered.slice(0, 6) : filtered;
  $('#product-grid').innerHTML = visible.map(p => `<article class="product-card"><div class="product-image">${p.image ? `<img src="assets/${p.image}.png" alt="${p.representative ? 'تصویر مجموعهٔ محصولات خانگی کالسیس' : p.name + ' خانگی کالسیس'}" loading="lazy" width="600" height="450">` : '<div class="product-placeholder"><span>کالسیس</span><small>تصویر این خوشمزه به‌زودی</small></div>'}${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}</div><div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span>${p.note}</span><button class="product-add" data-order="${p.id}" aria-label="انتخاب ${p.name} برای سفارش">+</button></div></div></article>`).join('');
  const moreButton = $('#show-all');
  if (moreButton) moreButton.hidden = activeFilter !== 'all' || expandedCatalog;
}
renderProducts();
$('#product-filters').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter;
  $$('.filter').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  renderProducts();
});
$('.menu-toggle').addEventListener('click', () => {
  const open = $('.menu-toggle').getAttribute('aria-expanded') !== 'true';
  $('.menu-toggle').setAttribute('aria-expanded', String(open));
  $('.menu-toggle').setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
  $('#mobile-nav').hidden = !open;
});
$$('#mobile-nav a').forEach(a => a.addEventListener('click', () => { $('#mobile-nav').hidden = true; $('.menu-toggle').setAttribute('aria-expanded', 'false'); $('.menu-toggle').setAttribute('aria-label', 'باز کردن منو'); }));

$('#show-all').addEventListener('click', () => { expandedCatalog = true; renderProducts(); });
const config = window.KALSIS_CONFIG || {};
function safeURL(value) { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } }
const eitaaURL = safeURL(config.eitaa) || 'https://eitaa.com/kalsis_1404';
$$('.eitaa-link').forEach(link => { link.href = eitaaURL; });
const eitaaHandle = $('.footer-grid bdi');
eitaaHandle.textContent = '@' + new URL(eitaaURL).pathname.split('/').filter(Boolean).pop();
if (/^\+?[\d\s()-]{7,20}$/.test(config.phone || '')) {
  $('#phone-link').href = 'tel:' + config.phone.replace(/[^+\d]/g, '');
  $('#phone-link').textContent = config.phoneDisplay || config.phone;
  $('#phone-link').dir = 'ltr'; $('#phone-link').hidden = false;
}
if (safeURL(config.website)) { $('#website-link').href = safeURL(config.website); $('#website-link').textContent = new URL(config.website).hostname; $('#website-link').hidden = false; }
$('#year').textContent = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());
let toastTimer;
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3500); }

const dialog = $('#order-dialog');
const order = new Map();
const quantities = [['500', '۵۰۰ گرم'], ['1000', '۱ کیلوگرم'], ['1500', '۱٫۵ کیلوگرم'], ['2000', '۲ کیلوگرم']];
let returnFocus;
function hideResult() { $('#order-result').hidden = true; $('.result-hint').textContent = 'متن آماده است. آن را کپی کنید و از راه ارتباطی کانال ایتا با ما هماهنگ کنید.'; }
function renderOrder() {
  $('#order-items').innerHTML = [...order.entries()].map(([id, amount]) => {
    const product = products.find(p => p.id === id);
    return `<div class="order-row"><span>${product.name}</span><select data-quantity="${id}" aria-label="مقدار ${product.name}">${quantities.map(([value, label]) => `<option value="${value}" ${amount === value ? 'selected' : ''}>${label}</option>`).join('')}</select><button type="button" class="remove-item" data-remove="${id}" aria-label="حذف ${product.name}">×</button></div>`;
  }).join('') || '<p class="empty-order">اول یک خوشمزه به سفارشت اضافه کن.</p>';
  $('#add-product').innerHTML = '<option value="">افزودن محصول به سفارش…</option>' + products.filter(p => !order.has(p.id)).map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  $('#add-product').disabled = order.size === products.length;
  $('.prepare-order').disabled = !order.size;
  hideResult();
}
document.addEventListener('click', event => {
  const button = event.target.closest('[data-order]');
  if (!button) return;
  const id = button.dataset.order;
  if (products.some(p => p.id === id) && !order.has(id)) order.set(id, '500');
  if (!order.size) order.set('german', '500');
  renderOrder(); returnFocus = button; dialog.showModal(); document.body.classList.add('modal-open');
});
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); returnFocus?.focus({ preventScroll: true }); });
$('#add-product').addEventListener('change', event => { if (products.some(p => p.id === event.target.value)) { order.set(event.target.value, '500'); renderOrder(); } });
$('#order-items').addEventListener('change', event => {
  if (event.target.matches('[data-quantity]') && quantities.some(q => q[0] === event.target.value)) { order.set(event.target.dataset.quantity, event.target.value); hideResult(); }
});
$('#order-items').addEventListener('click', event => {
  const button = event.target.closest('[data-remove]');
  if (button) { order.delete(button.dataset.remove); renderOrder(); $('#add-product').focus(); }
});
$('#order-notes').addEventListener('input', hideResult);
$('#order-form').addEventListener('submit', event => {
  event.preventDefault(); if (!order.size) return;
  const lines = [...order.entries()].map(([id, amount]) => `• ${products.find(p => p.id === id).name} — ${quantities.find(q => q[0] === amount)[1]}`);
  const notes = $('#order-notes').value.trim();
  $('#order-message').value = `سلام کالسیس! 🌿\nبرای این محصولات می‌خواستم قیمت و موجودی بپرسم:\n${lines.join('\n')}${notes ? '\n\nتوضیحات: ' + notes : ''}\n\nلطفاً زمان آماده‌سازی و روش تحویل را هم بفرمایید. ممنون!`;
  $('#order-result').hidden = false;
  $('#order-message').focus({ preventScroll: true });
  $('#order-result').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
});
$('#copy-order').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('#order-message').value); toast('متن سفارش کپی شد؛ حالا در ایتا بفرستید.'); $('.result-hint').textContent = 'متن کپی شد؛ برای هماهنگی سفارش، آن را در ایتا بفرستید.'; }
  catch { $('#order-message').focus(); $('#order-message').select(); $('.result-hint').textContent = 'کپی خودکار در این مرورگر در دسترس نیست. متن انتخاب‌شده را دستی کپی کنید.'; }
});

// A spring-based tile displacement effect: the supplied photo breaks into tiny
// voxel-like blocks near the pointer and settles back into the original image.
function initVoxels() {
  const scene = $('#voxel-scene'), image = $('#hero-image'), canvas = $('#voxel-canvas');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let tiles = [], width = 0, height = 0, raf = 0, pointer = null, visible = true;
  const buffer = document.createElement('canvas');
  const bctx = buffer.getContext('2d');
  function resize() {
    width = scene.clientWidth; height = scene.clientHeight;
    if (!width || !height || !image.naturalWidth) return;
    const dpr = Math.min(devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buffer.width = Math.ceil(width); buffer.height = Math.ceil(height);
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    bctx.drawImage(image, (width - image.naturalWidth * scale) / 2, (height - image.naturalHeight * scale) / 2, image.naturalWidth * scale, image.naturalHeight * scale);
    tiles = [];
    const size = width < 370 ? 17 : 20;
    for (let y = 0; y < height; y += size) for (let x = 0; x < width; x += size) tiles.push({ x, y, w: Math.min(size, width - x), h: Math.min(size, height - y), dx: 0, dy: 0, vx: 0, vy: 0, seed: Math.random() * Math.PI * 2 });
    ctx.clearRect(0, 0, width, height); wake();
  }
  function frame(time) {
    raf = 0;
    if (reducedMotion.matches || !visible) { ctx.clearRect(0, 0, width, height); return; }
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#175c4e'; ctx.fillRect(0, 0, width, height);
    let moving = false;
    for (const tile of tiles) {
      let tx = 0, ty = 0;
      if (pointer) {
        const dx = tile.x + tile.w / 2 - pointer.x, dy = tile.y + tile.h / 2 - pointer.y;
        const distance = Math.hypot(dx, dy), force = Math.max(0, 1 - distance / 115);
        if (force > 0) {
          tx = (dx / (distance || 1) * 28 + Math.sin(time * .025 + tile.seed) * 6) * force;
          ty = (dy / (distance || 1) * 28 + Math.cos(time * .022 + tile.seed) * 6) * force;
        }
      }
      tile.vx = (tile.vx + (tx - tile.dx) * .13) * .73;
      tile.vy = (tile.vy + (ty - tile.dy) * .13) * .73;
      tile.dx += tile.vx; tile.dy += tile.vy;
      if (Math.abs(tile.dx) + Math.abs(tile.dy) + Math.abs(tile.vx) + Math.abs(tile.vy) > .12) moving = true;
      const lift = Math.min(1, (Math.abs(tile.dx) + Math.abs(tile.dy)) / 20);
      if (lift > .15) { ctx.fillStyle = `rgba(9,37,27,${lift * .35})`; ctx.fillRect(tile.x + tile.dx + 3, tile.y + tile.dy + 4, tile.w, tile.h); }
      ctx.drawImage(buffer, tile.x, tile.y, tile.w, tile.h, tile.x + tile.dx, tile.y + tile.dy, tile.w + .25, tile.h + .25);
    }
    if (pointer || moving) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, width, height);
  }
  function wake() { if (!raf && !reducedMotion.matches && visible) raf = requestAnimationFrame(frame); }
  function updatePointer(event) {
    const bounds = scene.getBoundingClientRect();
    pointer = { x: (event.clientX - bounds.left) / bounds.width * width, y: (event.clientY - bounds.top) / bounds.height * height };
    wake();
  }
  scene.addEventListener('pointermove', event => { if (event.pointerType !== 'touch') updatePointer(event); }, { passive: true });
  scene.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') { updatePointer(event); setTimeout(() => { pointer = null; wake(); }, 450); } }, { passive: true });
  scene.addEventListener('pointerleave', () => { pointer = null; wake(); });
  reducedMotion.addEventListener('change', () => { pointer = null; ctx.clearRect(0, 0, width, height); wake(); });
  new ResizeObserver(resize).observe(scene);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) wake(); else { pointer = null; if (raf) cancelAnimationFrame(raf); raf = 0; } }).observe(scene);
  if (image.complete && image.naturalWidth) resize(); else image.addEventListener('load', resize, { once: true });
}
initVoxels();
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .09 });
  $$('.section-heading, .story-grid, .center-heading, .values-grid, .order-layout, .club-section, .faq-layout').forEach(element => { element.classList.add('scroll-reveal'); observer.observe(element); });
}
