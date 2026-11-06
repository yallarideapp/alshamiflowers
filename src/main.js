import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/noto-sans-arabic';
import { animate, inView, scroll, stagger } from 'motion';
import { categories, products } from './catalog.js';
import { copy } from './copy.js';
import { LAST_UPDATED, legal, trademarkNotice } from './legal.js';
import './style.css';

const IG = 'https://www.instagram.com/alshami.flowers/';
const PHONE = 'tel:+962790676747';
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* Storage is optional. */ } },
  remove(key) { try { localStorage.removeItem(key); } catch { /* Storage is optional. */ } }
};
const requestedLanguage = new URLSearchParams(location.search).get('lang');
let lang = ['ar', 'en'].includes(requestedLanguage) ? requestedLanguage : storage.get('alshami-v2-language') === 'en' ? 'en' : 'ar';
if (['ar', 'en'].includes(requestedLanguage)) storage.set('alshami-v2-language', lang);
let activeCategory = 'all';
let showAll = false;
let selection = [];
try {
  const saved = JSON.parse(storage.get('alshami-v2-selection') || '[]');
  if (Array.isArray(saved)) selection = products.flatMap(p => {
    const line = saved.find(item => item?.id === p.id);
    return line && Number.isInteger(line.quantity) && line.quantity > 0 ? [{ id: p.id, quantity: Math.min(20, line.quantity) }] : [];
  });
} catch { selection = []; }

let cleanup = [];
let returnFocus = null;
let toastTimer;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const isLegal = /\/(privacy|terms)\.html$/.exec(location.pathname)?.[1];
const t = () => copy[lang];
const icon = (name, cls = '') => {
  const paths = {
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    diagonal: '<path d="M5 19 19 5M5 5h14v14"/>',
    down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
    bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
    menu: '<path d="M4 8h16M4 16h16"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    phone: '<path d="m8 3 3 5-3 3c1 3 2 4 5 5l3-3 5 3c0 4-2 6-5 5C8 19 5 16 3 8 2 5 4 3 8 3Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    stem: '<path d="M12 21V9m0 7c-6 0-8-4-8-7 5 0 8 3 8 7Zm0-3c6 0 8-4 8-7-5 0-8 3-8 7Z"/>',
    heart: '<path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-4 4 1 9 8 15 7-6 12-11 8-15Z"/>',
    flower: '<path d="M12 7c-5-8-12 0-6 4-9 1-5 11 2 7-2 9 9 9 8 1 8 4 12-6 4-9 5-7-4-12-8-3Z"/><circle cx="12" cy="12" r="2"/>',
    check: '<path d="m5 12 4 4L19 6"/>'
  };
  return `<svg class="icon ${cls}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.flower}</svg>`;
};
const lotus = `<svg class="brand-mark" viewBox="0 0 60 64" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M30 44C10 43 10 23 17 19c6 1 11 6 13 13 2-7 7-12 13-13 7 4 7 24-13 25Z"/><path d="M30 44C18 34 21 18 30 11c9 7 12 23 0 33Zm0 0v10m-11-5c3-3 8-3 11 0m11 0c-3-3-8-3-11 0"/></svg>`;
const botanical = `<svg class="botanical" viewBox="0 0 210 280" fill="none" stroke="currentColor" stroke-width=".8" aria-hidden="true"><path pathLength="1" d="M100 275c-11-67 25-126 8-182m-6 111c-39 4-67-27-75-54 34 2 63 21 75 54Zm2-43c38-4 62-35 66-62-34 7-57 30-66 62ZM108 93C58 100 40 62 52 31c25 4 42 25 52 47-1-27 6-54 27-70 24 25 23 59-23 85Zm0 0c35-6 65-25 64-58-32 2-53 24-64 58Z"/></svg>`;
const arrow = () => icon('arrow', 'directional');
const total = () => selection.reduce((sum, line) => sum + line.quantity, 0);
const homeHref = (hash = '') => isLegal || !hash ? `./index.html?lang=${lang}${hash}` : hash;
const legalHref = page => `./${page}.html?lang=${lang}`;
const external = 'target="_blank" rel="noopener noreferrer"';
const img = (name, alt, attrs = '') => `<img src="./images/${name}" alt="${alt}" ${attrs}>`;

function header() {
  return `<a class="skip-link" href="#main">${t().skip}</a>
    <div class="topline"><span>${t().tagline}</span><span class="topline-center">AL SHAMI FLOWERS</span><span>${t().location}</span></div>
    <header class="header"><div class="header-inner">
      <a class="brand" href="${homeHref()}" aria-label="Al Shami Flowers · أزهار الشامي">${lotus}<span class="brand-type">al shami<span>أزهار الشامي</span></span></a>
      <nav class="desktop-nav" aria-label="${t().menuLabel}"><a href="${homeHref('#collection')}">${t().shop}</a><a href="${homeHref('#occasions')}">${t().occasions}</a><a href="${homeHref('#story')}">${t().story}</a><a href="${homeHref('#contact')}">${t().contact}</a></nav>
      <div class="header-actions"><button class="language-button" data-action="language" lang="${lang === 'ar' ? 'en' : 'ar'}" aria-label="${lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}">${lang === 'ar' ? 'EN' : 'عربي'}</button><span class="action-divider"></span><button class="icon-button" data-action="search" aria-label="${t().search}">${icon('search')}</button><button class="icon-button bag-button" data-action="bag" aria-label="${t().bag}">${icon('bag')}<span class="bag-count">${total()}</span></button><button class="icon-button mobile-menu" data-action="menu" aria-label="${t().menu}">${icon('menu')}</button></div>
    </div></header>`;
}

function footer() {
  return `<footer><div class="footer-main container"><div class="footer-brand"><a class="brand" href="${homeHref()}">${lotus}<span class="brand-type">al shami<span>أزهار الشامي</span></span></a><p>${t().footerText.replace('\n', '<br>')}</p></div><div><span class="footer-label">${t().exploreLabel}</span><a href="${homeHref('#collection')}">${t().shop}</a><a href="${homeHref('#occasions')}">${t().occasions}</a><a href="${homeHref('#story')}">${t().story}</a></div><div><span class="footer-label">${t().findUs}</span><a href="${IG}" ${external} dir="ltr">@alshami.flowers ${icon('diagonal')}</a><a href="${PHONE}" dir="ltr">+962 790 676 747</a><span>${t().location}</span></div><div class="footer-flower">${lotus}</div></div><div class="footer-bottom container"><span>© ${new Date().getFullYear()} ${t().copyright}</span><div><a href="${legalHref('privacy')}">${legal[lang].labels.privacy}</a><a href="${legalHref('terms')}">${legal[lang].labels.terms}</a></div></div><div class="footer-notice container"><span>${trademarkNotice(lang)}</span><span>${t().artNote}</span></div></footer>`;
}

function card(product) {
  return `<article class="product-card" data-reveal><div class="product-image-wrap"><button class="product-image-button" data-action="view" data-id="${product.id}" aria-label="${t().viewDesign}: ${product[lang]}">${img(product.image, product[lang], 'loading="lazy" width="980" height="1227"')}<span class="product-hover">${t().quickView} ${arrow()}</span></button><span class="product-tag">${product.tag[lang]}</span><button class="product-add" data-action="add" data-id="${product.id}" aria-label="${t().add}: ${product[lang]}">${icon('plus')}</button></div><div class="product-info"><button data-action="view" data-id="${product.id}"><h3>${product[lang]}</h3></button><span class="product-category">${categories.find(c => c.id === product.category)[lang]}</span></div><p class="product-price">${t().price}</p></article>`;
}

function home() {
  return `<main id="main"><section class="hero container" aria-labelledby="hero-title"><div class="hero-copy">${botanical}<p class="eyebrow hero-enter"><span class="small-flower">✳</span> ${t().eyebrow}</p><h1 id="hero-title"><span class="hero-line hero-enter">${t().heroA}</span><em class="hero-line hero-enter">${t().heroB}</em></h1><p class="hero-description hero-enter">${t().heroText}</p><div class="hero-actions hero-enter"><a class="button primary" href="#collection">${t().explore} ${arrow()}</a><a class="text-link" href="#story">${t().ourStory}</a></div><a class="scroll-cue hero-enter" href="#collection"><span class="scroll-line"></span>${t().scroll} ${icon('down')}</a></div><div class="hero-visual"><div class="hero-image-frame">${img('hero-floral.jpg', lang === 'ar' ? 'عمل توضيحي لتنسيق ورد وردي وكريمي مع زهور عنابية في مزهرية' : 'Illustrative pink and cream floral arrangement with burgundy dahlias in a vase', 'class="hero-photo" fetchpriority="high" width="1122" height="1402"')}</div><div class="hero-note"><span>avec amour</span><p>${t().heroNote.replace('\n', '<br>')}</p><span class="note-flower">${icon('stem')}</span></div><div class="hero-image-caption"><span>01 /</span><span>${t().heroCaption}</span><span>✳</span></div></div></section>
    <div class="trust-strip container"><div>${icon('stem')}<span>${t().trustA}</span></div><div>${icon('flower')}<span>${t().trustB}</span></div><div>${icon('heart')}<span>${t().trustC}</span></div></div>
    <section class="collection-section section-pad container" id="collection" aria-labelledby="collection-title"><div class="section-heading" data-reveal><div><p class="eyebrow">${t().collectionEyebrow}</p><h2 id="collection-title">${t().collectionTitle}</h2></div><p class="section-intro">${t().collectionText}</p></div><div class="collection-tools"><div class="filters" aria-label="${t().shop}">${categories.map(c => `<button class="filter ${activeCategory === c.id ? 'active' : ''}" data-action="filter" data-category="${c.id}" aria-pressed="${activeCategory === c.id}">${c[lang]}</button>`).join('')}</div><button class="text-link collection-more" data-action="all">${showAll ? t().viewLess : t().viewAll} ${arrow()}</button></div><div class="product-grid" id="product-grid">${filteredProducts().map(card).join('')}</div><p class="catalog-note">${t().inspiration}</p></section>
    <section class="occasion-section" id="occasions" aria-labelledby="occasion-title"><div class="container"><div class="occasion-heading" data-reveal><p class="eyebrow">${t().occasionEyebrow}</p><h2 id="occasion-title">${t().occasionTitle}</h2><p>${t().occasionText}</p></div><div class="occasion-grid">${[
      ['birthday', 'birthdaySub', 'flower', 'boxes', '01'], ['love', 'loveSub', 'heart', 'bouquets', '02'], ['wedding', 'weddingSub', 'stem', 'bridal', '03'], ['justBecause', 'justBecauseSub', 'flower', 'all', '04']
    ].map(([title, sub, symbol, cat, number]) => `<button class="occasion-item" data-action="occasion" data-category="${cat}" data-reveal><div class="occasion-top"><span>${number}</span>${icon(symbol)}</div><h3>${t()[title]}</h3><p>${t()[sub]}</p><span class="occasion-arrow">${arrow()}</span></button>`).join('')}</div></div></section>
    <section class="story-section section-pad container" id="story" aria-labelledby="story-title"><div class="story-visual" data-reveal><div class="story-image">${img('white-tulips-bouquet.jpg', lang === 'ar' ? 'توليب أبيض من أعمال أزهار الشامي' : 'White tulips from Al Shami Flowers', 'loading="lazy" width="980" height="1227"')}</div><span class="story-image-label">${t().originalWork}</span><div class="story-detail">${img('grand-pink-box.jpg', lang === 'ar' ? 'تفاصيل ورود وردية' : 'A detail of pink roses', 'loading="lazy" width="980" height="1227"')}</div></div><div class="story-copy" data-reveal><p class="eyebrow">${t().storyEyebrow}</p><h2 id="story-title">${t().storyTitle.replace('\n', '<br>')}</h2><p>${t().storyText}</p><a class="text-link" href="#contact">${t().storyLink} ${arrow()}</a><span class="story-signature">Al Shami</span></div></section>
    <section class="journal-section section-pad container" aria-labelledby="journal-title"><div class="section-heading" data-reveal><div><p class="eyebrow">${t().journalEyebrow}</p><h2 id="journal-title">${t().journalTitle}</h2></div><a class="text-link" href="${IG}" ${external}>${icon('instagram')} ${t().instagram} ${icon('diagonal')}</a></div><div class="journal-grid">${['pink-lily-box.jpg','red-pink-roses-bouquet.jpg','sunflowers-vase.jpg','lilac-roses-box.jpg'].map((name,i) => `<a class="journal-image" href="${IG}" ${external} aria-label="${t().instagram}: ${i + 1}" data-reveal>${img(name, lang === 'ar' ? 'من تنسيقات أزهار الشامي' : 'An arrangement from Al Shami Flowers', 'loading="lazy" width="980" height="1227"')}<span>${icon('instagram')}</span></a>`).join('')}</div></section>
    <section class="contact-section" id="contact" aria-labelledby="contact-title"><div class="container contact-inner" data-reveal><div class="contact-flower">${lotus}</div><p class="eyebrow">${t().ctaEyebrow}</p><h2 id="contact-title">${t().ctaTitle}</h2><p>${t().ctaText}</p><div class="contact-actions"><a class="button light" href="${PHONE}">${icon('phone')}${t().call} ${arrow()}</a><a class="text-link" href="${IG}" ${external}>${t().dm} ${icon('diagonal')}</a></div><span class="contact-location">${t().location} <span>✳</span> @alshami.flowers</span></div></section></main>`;
}

function legalPage() {
  const data = legal[lang][isLegal];
  return `<main id="main" class="legal-page container"><a class="text-link" href="${homeHref()}">${t().backHome} ${arrow()}</a><p class="eyebrow">AL SHAMI FLOWERS</p><h1>${data.title}</h1><p class="legal-updated">${legal[lang].labels.updated} ${LAST_UPDATED}</p>${data.sections.map(s => `<section><h2>${s.title}</h2><p>${s.body.replace(/(https:\/\/modee\.gov\.jo\/EN\/Pages\/Services)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">modee.gov.jo</a>')}</p></section>`).join('')}</main>`;
}

function filteredProducts() {
  const list = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  return showAll || activeCategory !== 'all' ? list : list.slice(0, 4);
}

function render() {
  cleanup.forEach(stop => stop()); cleanup = [];
  document.querySelector('#overlay')?.open && document.querySelector('#overlay').close();
  document.body.classList.remove('dialog-open');
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = isLegal ? `${legal[lang][isLegal].title} — ${t().copyright}` : t().title;
  document.querySelector('#app').innerHTML = `${header()}${isLegal ? legalPage() : home()}${footer()}<dialog id="overlay" aria-labelledby="dialog-title"></dialog><div id="toast" class="toast" role="status" aria-live="polite"></div>`;
  setupMotion();
}

function setupMotion() {
  if (reducedMotion.matches) return;
  const enter = document.querySelectorAll('.hero-enter');
  if (enter.length) {
    const animation = animate(enter, { opacity: [0, 1], y: [24, 0] }, { duration: .75, delay: stagger(.1, { startDelay: .12 }), ease: [.22, 1, .36, 1] });
    cleanup.push(() => animation.stop());
    const imageReveal = animate('.hero-image-frame', { clipPath: ['inset(7% 0 7% 0 round 46% 46% 0 0)', 'inset(0% 0 0% 0 round 46% 46% 0 0)'], opacity: [0, 1] }, { duration: 1.1, ease: [.22, 1, .36, 1] });
    const noteReveal = animate('.hero-note', { opacity: [0, 1], y: [18, 0], rotate: [-9, -5] }, { delay: .6, duration: .8, ease: [.22, 1, .36, 1] });
    cleanup.push(() => imageReveal.stop(), () => noteReveal.stop());
    if (matchMedia('(min-width: 1000px) and (pointer: fine)').matches) {
      cleanup.push(scroll(animate('.hero-photo', { y: [0, 45] }, { ease: 'linear' }), { target: document.querySelector('.hero'), offset: ['start start', 'end start'] }));
    }
  }
  const revealElements = document.querySelectorAll('[data-reveal]');
  cleanup.push(inView(revealElements, element => {
    const animation = animate(element, { opacity: [0, 1], y: [22, 0] }, { duration: .65, ease: [.22, 1, .36, 1] });
    cleanup.push(() => animation.stop());
  }, { amount: .12 }));
}

function saveSelection() {
  if (selection.length) storage.set('alshami-v2-selection', JSON.stringify(selection));
  else storage.remove('alshami-v2-selection');
  document.querySelectorAll('.bag-count').forEach(el => { el.textContent = total(); });
}

function notify(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
}

function dialogShell(title, content, className = '', focusSelector = '') {
  const dialog = document.querySelector('#overlay');
  if (!dialog.open) returnFocus = document.activeElement;
  dialog.className = className;
  dialog.innerHTML = `<div class="dialog-heading"><span class="eyebrow">AL SHAMI FLOWERS</span><button class="icon-button" data-action="close" aria-label="${t().close}">${icon('close')}</button></div><div class="dialog-body"><h2 id="dialog-title">${title}</h2>${content}</div>`;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
  if (!reducedMotion.matches) animate(dialog, { opacity: [0, 1], y: [15, 0] }, { duration: .25, ease: 'easeOut' });
  const preferredFocus = focusSelector ? dialog.querySelector(focusSelector) : null;
  (preferredFocus || dialog.querySelector('input') || dialog.querySelector('.dialog-body button, .dialog-body a') || dialog.querySelector('.dialog-heading button'))?.focus();
}

function closeDialog() {
  document.querySelector('#overlay').close();
}

function openProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  dialogShell(product[lang], `<div class="product-modal"><div class="modal-photo">${img(product.image, product[lang], 'width="980" height="1227"')}</div><div class="modal-copy"><p class="eyebrow">${categories.find(c => c.id === product.category)[lang]}</p><p>${product.detail[lang]}</p><p class="availability">${t().price}</p><button class="button primary" data-action="add" data-id="${product.id}">${t().add} ${icon('plus')}</button><p class="fine-print">${t().noCheckout}</p></div></div>`, 'product-dialog');
}

function openBag(focusSelector = '') {
  const content = selection.length ? `<p class="dialog-intro">${t().selectionText}</p><div class="selection-list">${selection.map(line => {
    const p = products.find(product => product.id === line.id);
    return `<div class="selection-item">${img(p.image, p[lang], 'width="980" height="1227"')}<div class="selection-info"><h3>${p[lang]}</h3><p>${t().price}</p><div class="quantity"><button data-action="decrease" data-id="${p.id}" aria-label="${t().decrease}: ${p[lang]}">${icon('minus')}</button><span>${line.quantity}</span><button data-action="increase" data-id="${p.id}" aria-label="${t().increase}: ${p[lang]}" ${line.quantity >= 20 ? 'disabled' : ''}>${icon('plus')}</button></div></div><button class="icon-button" data-action="remove" data-id="${p.id}" aria-label="${t().remove}: ${p[lang]}">${icon('close')}</button></div>`;
  }).join('')}</div><div class="selection-actions"><button class="button primary" data-action="copy">${t().copySelection} ${icon('check')}</button><a class="button outline" href="${PHONE}">${icon('phone')}${t().call}</a><a class="text-link" href="${IG}" ${external}>${t().dm} ${icon('diagonal')}</a><button class="subtle-button" data-action="clear">${t().clear}</button></div><p class="fine-print">${t().noCheckout}</p><div id="copy-fallback"></div>` : `<div class="empty-selection">${lotus}<h3>${t().emptyTitle}</h3><p>${t().emptyText}</p><a class="button primary" href="${homeHref('#collection')}" data-action="navigate">${t().continue} ${arrow()}</a></div>`;
  dialogShell(t().selectionTitle, content, 'bag-dialog', focusSelector);
}

function searchResults(query = '') {
  const normalized = query.trim().toLocaleLowerCase();
  const results = products.filter(p => `${p.ar} ${p.en} ${p.detail.ar} ${p.detail.en} ${categories.find(c => c.id === p.category)[lang]}`.toLocaleLowerCase().includes(normalized));
  return `<p class="search-count" role="status">${results.length} ${t().results}</p>${results.length ? results.map(p => `<button class="search-result" data-action="view" data-id="${p.id}">${img(p.image, p[lang], 'width="980" height="1227"')}<span><strong>${p[lang]}</strong><small>${t().price}</small></span>${arrow()}</button>`).join('') : `<p class="search-empty">${t().noResults}</p><button class="text-link" data-action="reset-search">${t().resetSearch}</button>`}`;
}

function openSearch() {
  dialogShell(t().searchTitle, `<label class="search-field">${icon('search')}<input type="search" id="search-input" autocomplete="off" placeholder="${t().searchPlaceholder}" aria-label="${t().search}"></label><div id="search-results">${searchResults()}</div>`, 'search-dialog');
}

function updateCollection() {
  document.querySelectorAll('.filter').forEach(button => {
    const active = button.dataset.category === activeCategory;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });
  document.querySelector('#product-grid').innerHTML = filteredProducts().map(card).join('');
  const more = document.querySelector('.collection-more');
  more.innerHTML = `${showAll ? t().viewLess : t().viewAll} ${arrow()}`;
  more.hidden = activeCategory !== 'all';
  if (!reducedMotion.matches) animate('.product-card', { opacity: [0, 1], y: [14, 0] }, { duration: .35, delay: stagger(.05) });
}

document.addEventListener('click', async event => {
  const action = event.target.closest('[data-action]');
  if (!action) return;
  const id = action.dataset.id;
  switch (action.dataset.action) {
    case 'language': {
      lang = lang === 'ar' ? 'en' : 'ar';
      storage.set('alshami-v2-language', lang);
      const url = new URL(location.href); url.searchParams.set('lang', lang); history.replaceState({}, '', url);
      render(); document.querySelector('.language-button').focus(); break;
    }
    case 'menu': dialogShell(t().menu, `<nav class="mobile-nav" aria-label="${t().menuLabel}">${[['#collection','shop'],['#occasions','occasions'],['#story','story'],['#contact','contact']].map(([hash,label]) => `<a href="${homeHref(hash)}" data-action="navigate">${t()[label]} ${arrow()}</a>`).join('')}</nav><a class="menu-instagram" href="${IG}" ${external}>${icon('instagram')} @alshami.flowers</a>`, 'menu-dialog'); break;
    case 'close': closeDialog(); break;
    case 'navigate': closeDialog(); break;
    case 'search': openSearch(); break;
    case 'bag': openBag(); break;
    case 'view': openProduct(id); break;
    case 'add': {
      const product = products.find(p => p.id === id); if (!product) break;
      const line = selection.find(item => item.id === id);
      if (line) line.quantity = Math.min(20, line.quantity + 1); else selection.push({ id, quantity: 1 });
      saveSelection(); notify(t().added); openBag(); break;
    }
    case 'increase': case 'decrease': {
      const line = selection.find(item => item.id === id); if (!line) break;
      line.quantity += action.dataset.action === 'increase' ? 1 : -1;
      line.quantity = Math.min(20, line.quantity);
      selection = selection.filter(item => item.quantity > 0); saveSelection(); openBag(`[data-action="${action.dataset.action}"][data-id="${id}"]:not(:disabled)`); break;
    }
    case 'remove': {
      const nextIndex = Math.min(selection.findIndex(item => item.id === id), selection.length - 2);
      selection = selection.filter(item => item.id !== id); saveSelection();
      openBag(selection[nextIndex] ? `[data-action="remove"][data-id="${selection[nextIndex].id}"]` : ''); break;
    }
    case 'clear': selection = []; saveSelection(); openBag(); break;
    case 'filter': activeCategory = action.dataset.category; updateCollection(); break;
    case 'all': showAll = !showAll; updateCollection(); break;
    case 'occasion': activeCategory = action.dataset.category; showAll = true; updateCollection(); document.querySelector('#collection').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' }); break;
    case 'reset-search': document.querySelector('#search-input').value = ''; document.querySelector('#search-results').innerHTML = searchResults(); document.querySelector('#search-input').focus(); break;
    case 'copy': {
      const summary = `${t().selectionSummary}\n${selection.map(line => `${products.find(p => p.id === line.id)[lang]} × ${line.quantity}`).join('\n')}\n@alshami.flowers`;
      try { await navigator.clipboard.writeText(summary); notify(t().copied); } catch {
        const fallback = document.querySelector('#copy-fallback');
        fallback.innerHTML = `<p>${t().copyFail}</p><textarea aria-label="${t().bag}" readonly></textarea>`;
        fallback.querySelector('textarea').value = summary; fallback.querySelector('textarea').select();
      }
      break;
    }
  }
});

document.addEventListener('input', event => {
  if (event.target.id === 'search-input') document.querySelector('#search-results').innerHTML = searchResults(event.target.value);
});
document.addEventListener('close', event => {
  if (event.target.id === 'overlay') { document.body.classList.remove('dialog-open'); returnFocus?.isConnected && returnFocus.focus(); }
}, true);
document.addEventListener('click', event => {
  if (event.target.id === 'overlay') {
    const rect = event.target.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
  }
});
reducedMotion.addEventListener('change', render);
render();
