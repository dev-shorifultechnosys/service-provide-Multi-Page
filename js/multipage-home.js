/** Loqelo multi-page links. Approved homepage markup/styles remain unchanged.
 * This script only connects existing navigation and service-category controls
 * to new real HTML pages. The original hero/carousel/CTA handlers are intact.
 */
(() => {
  'use strict';
  const routes = {
    how: 'how-it-works.html',
    services: 'services.html',
    customers: 'for-customers.html',
    providers: 'for-providers.html'
  };
  // Navigation buttons already have scroll listeners attached by the original
  // homepage. Capture click events so link-based navigation wins without a
  // redesign and without duplicate popups.
  document.querySelectorAll('.site-nav [data-next]').forEach(button => {
    const destination = routes[button.dataset.next];
    if (!destination) return;
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(destination);
    }, true);
  });
  const faqLink = document.querySelector('.site-nav a[href="#faq"]');
  if (faqLink) faqLink.href = 'faq.html';
  const footerRoutes = {
    how:'how-it-works.html', services:'services.html', customers:'for-customers.html', providers:'for-providers.html', about:'about.html'
  };
  document.querySelectorAll('.site-footer__links a[data-footer-i18n]').forEach(link=>{
    const key=link.dataset.footerI18n;
    if (footerRoutes[key]) link.href=footerRoutes[key];
  });
  // Keep a dedicated About link in the footer; FAQ is already in the top nav.
  const footerAbout = document.querySelector('.site-footer__links a[data-footer-i18n="about"]');
  const language = document.getElementById('language');
  function updateAboutLabel() {
    if (!footerAbout) return;
    footerAbout.textContent=({en:'About',de:'Über Loqelo',fr:'À propos',pl:'O Loqelo'})[language?.value||'en']||'About';
  }
  language?.addEventListener('change',updateAboutLabel);
  updateAboutLabel();
  document.querySelector('.site-footer__links [data-footer-i18n="contact"]')?.addEventListener('click',event=>{
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href='contact.html';
  },true);
  const brandLink = document.querySelector('.site-header__brand');
  if (brandLink) brandLink.href = 'index.html';

  // Three priority categories open their individual service information pages.
  const serviceRoutes = { home:'home-services.html', garden:'garden-services.html', office:'office-services.html' };
  for (const [key, href] of Object.entries(serviceRoutes)) {
    const card = document.querySelector('.categories__item[data-category="' + key + '"] .category-card');
    card?.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(href);
    }, true);
  }
  // Other seven categories have lightweight, clearly pre-launch details pages.
  ['installations','pets','vehicles','construction','care','moving','other'].forEach(key => {
    const card=document.querySelector('.categories__item[data-category="'+key+'"] .category-card');
    card?.addEventListener('click',event=>{
      event.preventDefault();event.stopImmediatePropagation();
      window.location.assign('service-info.html?category='+encodeURIComponent(key));
    },true);
  });
  // Restore a submitted email on the same device only; never put it in a URL.
  try {
    const pending = sessionStorage.getItem('loqelo-prefill-email');
    if (pending) {
      const field = document.querySelector('#customer-signup input[type="email"]');
      if (field) field.value = pending;
      sessionStorage.removeItem('loqelo-prefill-email');
    }
  } catch (_) { /* optional convenience only */ }
})();
