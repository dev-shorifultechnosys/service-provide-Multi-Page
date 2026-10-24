/** Supplementary services: descriptive previews, never live inventory. */
(() => {
'use strict';
const content={
 installations:{title:'Installations & repairs',desc:'Explore electrical, plumbing and practical installation ideas for your property.',items:['Plumbing help','Electrical assistance','Fixture and fittings','Appliance installation'],image:'installations'},
 pets:{title:'Pet services',desc:'Everyday care possibilities for the animals who share your home.',items:['Pet sitting','Dog walking','Grooming care','Day-to-day pet support'],image:'pets'},
 vehicles:{title:'Vehicle care',desc:'From cleaning to routine maintenance ideas, discover ways to keep your vehicle looking its best.',items:['Vehicle washing','Interior detailing','Exterior care','Minor maintenance enquiries'],image:'vehicles'},
 construction:{title:'Construction & renovation',desc:'Plan an improvement project and explore future home and commercial support categories.',items:['Renovation planning','Carpentry & repairs','Small construction projects','Property improvements'],image:'construction'},
 care:{title:'Personal care',desc:'Explore everyday assistance and personalised support examples.',items:['Routine support','Personal assistance','At-home help','Appointment support'],image:'care'},
 moving:{title:'Moving & transport',desc:'Discover flexible ways to plan relocation and moving tasks.',items:['Home moves','Office relocation','Packing assistance','Delivery and transport'],image:'moving'},
 other:{title:'Other services',desc:'Do not see what you need? Share your interests ahead of launch.',items:['Home projects','Garden requests','Office services','Something else entirely'],image:'home'}
};
const key=new URLSearchParams(location.search).get('category')||'other';const cfg=content[key]||content.other;
document.title=cfg.title+' | Loqelo';document.getElementById('generic-heading').textContent=cfg.title;
document.getElementById('generic-description').textContent=cfg.desc;
document.getElementById('generic-intro').textContent='Example service types under consideration. Final coverage varies by location, providers and launch plans.';
const img=document.getElementById('generic-photo');img.src='assets/images/categories/'+cfg.image+'-900.webp';img.alt='Illustrative image for '+cfg.title;
const link=document.getElementById('generic-request');link.href='index.html?service='+encodeURIComponent(cfg.title)+'&category='+encodeURIComponent(key)+'#customer-signup';
const grid=document.getElementById('generic-items');cfg.items.forEach((item,i)=>{const article=document.createElement('article');article.className='sx-generic__item';const number=document.createElement('span');number.textContent=String(i+1).padStart(2,'0');const heading=document.createElement('h3');heading.textContent=item;const note=document.createElement('p');note.textContent='This is a planned service example, not a confirmed offering.';article.append(number,heading,note);grid.append(article)});
})();
