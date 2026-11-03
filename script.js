(() => {
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const grid=$('#project-grid'),filters=$$('#project-category-nav .filter'),resultCount=$('#project-results-count'),prev=$('.carousel-prev'),next=$('.carousel-next'),stage=$('#portfolio-stage');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let projects=[],visible=[],active=0,dragStart=null,lastX=0,dragMoved=false;
const categoryCopy={
 'all':['Selected creative and digital work','Explore projects across fashion, beauty, food, commercials, content, creative concepts and web.'],
 'Fashion & Lifestyle':['Fashion & lifestyle','Visual storytelling, product presentation and campaign content for fashion and lifestyle brands.'],
 'Beauty & Personal Care':['Beauty & personal care','Product-focused visuals and promotional storytelling that present features, packaging and brand identity clearly.'],
 'Food & FMCG':['Food & FMCG','Appetising product presentation, promotional concepts and short-form content for everyday consumer products.'],
 'TV Commercials':['TV commercials','Campaign-led video concepts, scripts and product storytelling shaped for commercial communication.'],
 'Content Creation':['Content creation','Short-form digital content, creative scripting and social-first visual communication.'],
 'Creative Concepts':['Creative concepts','Original visual directions and campaign ideas developed to communicate a clear creative message.'],
 'Web & Software':['Web & software','Published web presence, WordPress interface customization and desktop software currently in development.'],
 'Web & Digital Presence':['Web & digital presence','A published personal website presenting the AJADS creative brand and advertising work.'],
 'WordPress UI Customization':['WordPress UI customization','AI-assisted refinement of an existing WordPress interface using a supplied visual reference and iterative feedback.'],
 'Desktop Software · In Development':['Desktop software','A gym administration software project in development, planned around memberships, payments, staff, inventory and reporting.']
};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function card(p,i){
 const video=!!p.video,media=video?`<div class="project-video-frame" style="--media-ratio:${esc(p.ratio||'16/9')}"><video controls preload="none" playsinline${p.image?` poster="${esc(p.image)}"`:''}><source src="${esc(p.video)}">Your browser does not support this video.</video></div>`:p.image?`<div class="project-image-frame"><img src="${esc(p.image)}" alt="${esc(p.imageAlt||p.title+' project preview')}" loading="lazy" decoding="async"></div>`:`<div class="project-image-frame project-media-placeholder"><span>PROJECT PREVIEW</span></div>`;
 const link=p.link?`<a class="project-link" href="${esc(p.link)}" ${/^https?:/i.test(p.link)?'target="_blank" rel="noopener noreferrer"':''}>${esc(p.linkLabel||'View project')} ↗</a>`:'';
 const detail=(label,value)=>value?`<p class="project-detail"><strong>${label}</strong>${esc(value)}</p>`:'';
 return `<article class="project-card project-card-modern" data-index="${i}"><div class="project-media project-media-modern">${media}<span class="project-category">${esc(p.category)}</span><span class="project-number">${String(i+1).padStart(2,'0')}</span></div><div class="project-content"><div class="project-card-topline">${video?'MOTION / FILM':'PROJECT / CASE STUDY'}</div><h3>${esc(p.title)}</h3><p>${esc(p.description||'')}</p>${detail('MY CONTRIBUTION',p.contribution)}${detail('OBJECTIVE',p.objective)}${detail('DELIVERABLE',p.deliverable)}${detail('STACK',p.stack)}${detail('PROJECT STATUS',p.note)}<div class="project-bottom">${link}<span class="card-index">${video?'VIDEO':'PROJECT'}</span></div></div></article>`;
}
function update(){const cards=$$('.project-card',grid),n=cards.length;cards.forEach((el,i)=>{let d=i-active;if(d>n/2)d-=n;if(d< -n/2)d+=n;const abs=Math.abs(d),mobile=innerWidth<=650;const x=d*(mobile?78:62),z=abs===0?0:(abs===1?-145:(abs===2?-285:-390)),rotate=d*(mobile?24:29),scale=abs===0?1:(abs===1?.82:(abs===2?.68:.56)),opacity=abs>2?0:(abs===2?.42:1);if(i!==active)$$('video',el).forEach(v=>{if(!v.paused)v.pause()});el.style.setProperty('--card-x',`${x}%`);el.style.setProperty('--card-z',`${z}px`);el.style.setProperty('--card-rotate',`${rotate}deg`);el.style.setProperty('--card-scale',scale);el.style.setProperty('--card-opacity',opacity);el.style.zIndex=String(20-abs);el.classList.toggle('is-active',i===active);el.setAttribute('aria-hidden',String(abs>2));el.tabIndex=abs>1?-1:0;});
 const current=$('#carousel-current'),total=$('#carousel-total'),fill=$('#carousel-progress-fill');if(current)current.textContent=n?String(active+1).padStart(2,'0'):'00';if(total)total.textContent=String(n).padStart(2,'0');if(fill)fill.style.width=n?`${((active+1)/n)*100}%`:'0%';if(prev)prev.disabled=n<2;if(next)next.disabled=n<2;}
function go(step){if(!visible.length)return;active=(active+step+visible.length)%visible.length;update();}
function isWebSoftwareProject(p){return ['Web & Digital Presence','WordPress UI Customization','Desktop Software · In Development','Web & Software'].includes(p.category)||p.kind==='web';}
function render(filter='all'){visible=projects.filter(p=>filter==='all'||(filter==='Web & Software'?isWebSoftwareProject(p):p.category===filter));active=0;const intro=$('#project-category-intro');if(intro){const copy=categoryCopy[filter]||categoryCopy.all;intro.innerHTML=`<h3>${esc(copy[0])}</h3><p>${esc(copy[1])}</p>`;}grid.innerHTML=visible.length?visible.map(card).join(''):`<div class="project-empty"><span>// YOUR WORKSPACE</span><h3>Projects will appear here.</h3><p>Add your real project details and media to <code>projects.json</code>. Nothing has been fabricated or published as sample work.</p><a href="README.md">Read the asset setup guide ↗</a></div>`;if(resultCount)resultCount.textContent=`${visible.length} PROJECT${visible.length===1?'':'S'} ${visible.length?'AVAILABLE':'ADDED'}`;$$('.filter-count').forEach(el=>{const f=el.closest('button').dataset.filter;const n=f==='all'?projects.length:projects.filter(p=>f==='Web & Software'?isWebSoftwareProject(p):p.category===f).length;el.textContent=n?String(n).padStart(2,'0'):'';});update();}
prev?.addEventListener('click',()=>go(-1));next?.addEventListener('click',()=>go(1));grid?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(e.key==='ArrowRight'?1:-1);}});grid?.addEventListener('click',e=>{const el=e.target.closest('.project-card');if(el&&!e.target.closest('a,button,video')){const i=Number(el.dataset.index);if(Number.isInteger(i)){active=i;update();}}});
stage?.addEventListener('pointerdown',e=>{if(e.target.closest('a,button,video'))return;dragStart=e.clientX;lastX=e.clientX;dragMoved=false;});stage?.addEventListener('pointermove',e=>{if(dragStart===null)return;lastX=e.clientX;if(Math.abs(lastX-dragStart)>8)dragMoved=true;});function endDrag(){if(dragStart===null)return;const delta=lastX-dragStart;if(Math.abs(delta)>38)go(delta<0?1:-1);dragStart=null;setTimeout(()=>dragMoved=false,80);}stage?.addEventListener('pointerup',endDrag);stage?.addEventListener('pointercancel',endDrag);
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});render(btn.dataset.filter);}));
const menuButton=$('.menu-toggle'),nav=$('#main-nav');menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open navigation');}));
// Consistent neon-green selection state for relevant informational cards.
const selectableCards=$$('.expertise-card, .skill-detail-grid article, .why-grid article');
selectableCards.forEach(card=>{
  card.setAttribute('role','button');
  card.setAttribute('tabindex','0');
  card.setAttribute('aria-pressed','false');
  const toggle=()=>{
    const selected=!card.classList.contains('is-selected');
    card.classList.toggle('is-selected',selected);
    card.setAttribute('aria-pressed',String(selected));
  };
  card.addEventListener('click',e=>{if(e.target.closest('a,button,input,video'))return;toggle();});
  card.addEventListener('keydown',e=>{
    if(e.target!==card)return;
    if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}
  });
});
const year=$('#year');if(year)year.textContent=new Date().getFullYear();
fetch('projects.json').then(r=>{if(!r.ok)throw new Error('projects.json unavailable');return r.json();}).then(data=>{projects=Array.isArray(data.projects)?data.projects:[];render();}).catch(()=>{projects=[];render();if(resultCount)resultCount.textContent='PROJECT DATA NOT FOUND — CHECK projects.json';});
window.addEventListener('resize',update,{passive:true});
// Keep the existing hero's role typing effect, but respect reduced-motion preferences.
function initHeroTyping(){const typed=$('.hero-role-typed');if(!typed||reduced.matches)return;const roles=['IT Technician','AI Prompt Engineer','Content Creator'];let ri=0,ci=0,del=false;function tick(){if(document.hidden){setTimeout(tick,400);return;}const phrase=roles[ri];ci+=del?-1:1;typed.textContent=phrase.slice(0,ci);const delay=!del&&ci===phrase.length?(del=true,1350):del&&ci===0?(del=false,ri=(ri+1)%roles.length,320):del?38:75;setTimeout(tick,delay);}setTimeout(tick,900);}initHeroTyping();
})();
