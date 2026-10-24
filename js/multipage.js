/** Loqelo subpage UX: no JS framework, no external dependencies. */
(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.site-header__menu-toggle');
  const nav = header?.querySelector('.site-nav');
  const setOpen = open => {
    if (!header || !toggle) return;
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  toggle?.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  nav?.addEventListener('click', () => setOpen(false));
  document.addEventListener('click', event => { if (header && !header.contains(event.target)) setOpen(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });

  // Manual selector persists across pages. Additional languages require
  // owner-approved translations, so missing body copy is never mislabeled.
  const select = document.getElementById('language');
  const navText = {
    en: ['Home','How it works','Services','For Customers','For Providers','FAQ','Log in','Join the waitlist'],
    de: ['Startseite','So funktioniert’s','Services','Für Kunden','Für Anbieter','FAQ','Anmelden','Zur Warteliste'],
    fr: ['Accueil','Fonctionnement','Services','Pour les clients','Prestataires','FAQ','Connexion','Liste d’attente'],
    pl: ['Strona główna','Jak to działa','Usługi','Dla klientów','Dla wykonawców','FAQ','Zaloguj się','Lista oczekujących']
  };
  const navKeys = ['home','how','services','customers','providers','faq','login','join'];
  function applyLanguage(lang) {
    const active = Object.hasOwn(navText,lang) ? lang : 'en';
    select.value=active;
    document.documentElement.lang = active;
    // Screen readers must still read untranslated long-form page copy in English.
    document.querySelector('main')?.setAttribute('lang','en');
    document.querySelector('footer')?.setAttribute('lang','en');
    navKeys.forEach((key,index)=>{
      const element=document.querySelector('[data-nav-key="'+key+'"]');
      if (!element) return;
      const span=element.querySelector('span');
      if (span) span.textContent=navText[active][index];
      else if (key==='join') { element.firstChild.textContent=navText[active][index]+' '; }
      else element.textContent=navText[active][index];
    });
    // New marketing-page long copy is currently English draft, deliberately
    // not represented as a finished DE/FR/PL translation.
  }
  let stored='en';
  try {stored=localStorage.getItem('loqelo-language') || (navigator.language||'en').slice(0,2);}catch(_){}
  applyLanguage(stored);
  select?.addEventListener('change', event=>{
    applyLanguage(event.target.value);
    try {localStorage.setItem('loqelo-language',select.value);}catch(_){}
  });

  // Accounts are not live before launch; don't redirect to a fake login form.
  const loginDialog=document.getElementById('mp-login-dialog');
  document.querySelector('[data-login-preview]')?.addEventListener('click',()=>loginDialog?.showModal());
  loginDialog?.querySelector('[data-dialog-close]')?.addEventListener('click',()=>loginDialog.close());
  loginDialog?.addEventListener('click', event=> { if(event.target===loginDialog) loginDialog.close(); });
  document.querySelectorAll('[data-social-pending]').forEach(control=>control.addEventListener('click',()=>{
    const status=document.querySelector('.mp-social-feedback');
    if(status) {status.hidden=false;status.textContent='Official Loqelo social URLs are awaiting confirmation.';}
  }));

  const newsletter=document.getElementById('mp-newsletter');
  newsletter?.addEventListener('submit',event=>{
    event.preventDefault();
    const field=newsletter.querySelector('input[type="email"]');
    if (!field?.reportValidity()) return;
    try {sessionStorage.setItem('loqelo-prefill-email',field.value.trim());}catch(_){}
    window.location.href='index.html#customer-signup';
  });

  const contact=document.getElementById('mp-contact-form');
  contact?.addEventListener('submit', async event=>{
    event.preventDefault();
    const status=document.getElementById('mp-contact-status');
    const submit=contact.querySelector('[type="submit"]');
    if (!contact.reportValidity()) return;
    status.textContent='Submitting your enquiry…';
    submit.disabled=true;
    try {
      const tokenResponse=await fetch('api/token.php',{credentials:'same-origin',cache:'no-store'});
      if (!tokenResponse.ok) throw new Error('Backend unavailable');
      const token=await tokenResponse.json();
      if (!token.csrfToken) throw new Error('Missing token');
      const data=new FormData(contact);
      const body={csrfToken:token.csrfToken,website:String(data.get('website')||''),name:String(data.get('name')||''),email:String(data.get('email')||''),topic:String(data.get('topic')||''),message:String(data.get('message')||''),privacyConsent:data.get('privacy')==='on'};
      const response=await fetch('api/contact.php',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',cache:'no-store',body:JSON.stringify(body)});
      const json=await response.json().catch(()=>({}));
      if (!response.ok || json.success!==true) throw new Error(json.message||'Could not store enquiry');
      status.textContent='Thank you. Your enquiry has been recorded. No live chat or email reply is guaranteed.';
      contact.reset();
    }catch(error){status.textContent='The contact form is not available yet. Please try again after the site backend is configured.';}
    finally{submit.disabled=false;}
  });
})();
