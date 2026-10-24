/** Accessible, lightweight Loqelo language selector. No icon fonts or dependencies. */
(() => {
  'use strict';
  const picker=document.querySelector('.language-picker');
  const select=picker?.querySelector('#language');
  if(!picker||!select||picker.querySelector('.language-picker__trigger'))return;
  const codes=[['en','EN','English'],['de','DE','Deutsch'],['fr','FR','Français'],['pl','PL','Polski']];
  const trigger=document.createElement('button');trigger.type='button';trigger.className='language-picker__trigger';trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-label','Change language');
  const label=document.createElement('span');label.textContent=(select.value||'en').toUpperCase();
  trigger.append(label);
  const chevron=document.createElementNS('http://www.w3.org/2000/svg','svg');chevron.setAttribute('viewBox','0 0 24 24');chevron.setAttribute('aria-hidden','true');chevron.innerHTML='<path d="m6 9 6 6 6-6"/>';trigger.append(chevron);
  const menu=document.createElement('div');menu.className='language-picker__menu';menu.setAttribute('role','listbox');menu.setAttribute('aria-label','Select language');menu.hidden=true;
  const options=[];
  codes.forEach(([value,short,name])=>{const b=document.createElement('button');b.type='button';b.className='language-picker__option';b.setAttribute('role','option');b.dataset.langOption=value;
    const shortSpan=document.createElement('span');shortSpan.className='language-picker__short';shortSpan.textContent=short;
    const nameSpan=document.createElement('span');nameSpan.textContent=name;b.append(shortSpan,nameSpan);menu.append(b);options.push(b);
    b.addEventListener('click',()=>{select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}));close();trigger.focus()});
  });
  if(document.body.classList.contains('mp-page')){const note=document.createElement('div');note.className='language-picker__note';note.textContent='Detailed service content is currently in English.';menu.append(note)}
  picker.append(trigger,menu);picker.classList.add('lang-enhanced');
  const sync=()=>{const active=codes.some(i=>i[0]===select.value)?select.value:'en';label.textContent=active.toUpperCase();options.forEach(b=>b.setAttribute('aria-selected',String(b.dataset.langOption===active)))};
  const close=()=>{menu.hidden=true;trigger.setAttribute('aria-expanded','false')};
  const open=()=>{sync();menu.hidden=false;trigger.setAttribute('aria-expanded','true');options.find(b=>b.dataset.langOption===select.value)?.focus()};
  trigger.addEventListener('click',()=>menu.hidden?open():close());
  document.addEventListener('pointerdown',e=>{if(!picker.contains(e.target))close()});
  picker.addEventListener('keydown',e=>{if(e.key==='Escape'){close();trigger.focus()}else if(!menu.hidden&&(e.key==='ArrowDown'||e.key==='ArrowUp')){e.preventDefault();const idx=options.indexOf(document.activeElement);options[(idx+(e.key==='ArrowDown'?1:-1)+options.length)%options.length].focus()}});
  select.addEventListener('change',sync);sync();
})();
