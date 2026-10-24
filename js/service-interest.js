/** Carry selected planned service through to the customer waitlist safely. */
(() => {
 'use strict';
 const form=document.getElementById('customer-signup'); if(!form)return;
 const params=new URLSearchParams(location.search);
 const raw=(params.get('service')||'').trim();const category=(params.get('category')||'').trim();
 if(!raw || raw.length>80 || !/^[\p{L}\p{N} &.,'()\/-]+$/u.test(raw))return;
 const interest=document.createElement('div');interest.className='sx-selected-interest';interest.setAttribute('role','status');
 const name=document.createElement('strong');name.textContent='Your service interest: '+raw;
 const note=document.createElement('small');note.textContent='Pre-launch enquiry only. Booking is not available yet.';
 interest.append(name,note);const first=form.querySelector('label');if(first) form.insertBefore(interest,first);else form.prepend(interest);
 const hidden=document.createElement('input');hidden.type='hidden';hidden.name='serviceInterest';hidden.value=raw;form.append(hidden);
 const cat=document.createElement('input');cat.type='hidden';cat.name='serviceCategory';cat.value=category.slice(0,40);form.append(cat);
})();
