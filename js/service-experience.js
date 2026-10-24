/** Loqelo V11: only filters the current static service-card grid. */
(() => {
 'use strict';
 const root=document.querySelector('.sx-page');
 if (!root) return;
 const buttons=[...root.querySelectorAll('[data-sx-filter]')];
 const cards=[...root.querySelectorAll('[data-sx-grid] .sx-service-card')];
 const feedback=root.querySelector('[data-sx-result]');
 if (!buttons.length || !cards.length) return;
 // The photo button and View details control reveal the same accessible details.
 cards.forEach(card => {
   const detail=card.querySelector('.sx-service-card__details');
   if (!detail) return;
   const controls=[...card.querySelectorAll('[data-sx-open-details]')];
   const sync=()=>controls.forEach(el=>{el.setAttribute('aria-expanded',String(detail.open));if(el.classList.contains('sx-service-card__details-button'))el.textContent=detail.open?'Hide details −':'View details +';});
   const toggle=()=>{detail.open=!detail.open;sync();};
   controls.forEach(control=>control.addEventListener('click',toggle));
   detail.addEventListener('toggle',sync);sync();
   // Card background or heading click also reveals its own full details.
   card.addEventListener('click',event=>{
     if(event.target.closest('a,button,summary,details'))return;
     toggle();
   });
 });
 const update=(group) => {
  let count=0;
  cards.forEach(card=>{
    const matches=group==='all'||card.dataset.sxCategory===group;
    card.hidden=!matches;
    if(matches) count++;
  });
  buttons.forEach(button=>{
    const active=button.dataset.sxFilter===group;
    button.classList.toggle('is-active',active);
    button.setAttribute('aria-pressed', String(active));
  });
  if(feedback) feedback.textContent=group==='all' ? `Showing all ${count} service ideas` : `Showing ${count} service ideas`;
 };
 buttons.forEach(button=>button.addEventListener('click',()=>update(button.dataset.sxFilter)));
 // On direct links from the directory, restore the corresponding filter after scrolling.
 const target=decodeURIComponent(location.hash.slice(1));
 if(target) {
  const item=cards.find(card=>card.id===target);
  if(item) { update(item.dataset.sxCategory); requestAnimationFrame(()=>item.scrollIntoView({block:'center'})); }
  else update('all');
 } else update('all');
})();
