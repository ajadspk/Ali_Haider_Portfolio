(() => {
'use strict';
const grid=document.querySelector('#project-grid');
const filters=[...document.querySelectorAll('#project-category-nav .filter')];
const resultCount=document.querySelector('#project-results-count');
const prev=document.querySelector('.carousel-prev');
const next=document.querySelector('.carousel-next');
const stage=document.querySelector('#portfolio-stage');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let projects=[],visible=[],active=0,autoTimer=null,dragStart=null,dragMoved=false,lastX=0;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function card(p,i){
 const isVideo=!!p.video,ratio=p.ratio||'16/9';
 const media=isVideo?`<div class="project-video-frame" style="--media-ratio:${esc(ratio)}"><video controls preload="none" playsinline poster="${esc(p.image||'')}"><source src="${esc(p.video)}" type="video/mp4">Your browser does not support embedded video.</video><span class="video-play-hint" aria-hidden="true">▶</span></div>`:`<div class="project-image-frame"><img src="${esc(p.image||'')}" alt="${esc(p.title)}" loading="lazy"></div>`;
 const link=p.link?`<a class="project-link" href="${esc(p.link)}" ${p.link.startsWith('http')?'target="_blank" rel="noopener noreferrer"':''}>${esc(p.linkLabel||'View project')} <span>↗</span></a>`:`<span class="project-link">${isVideo?'Creative production':'Independent project'}</span>`;
 return `<article class="project-card project-card-modern reveal" data-index="${i}" aria-label="${esc(p.title)}"><div class="project-media project-media-modern">${media}<span class="project-category">${esc(p.category)}</span><span class="project-number">${String(i+1).padStart(2,'0')}</span></div><div class="project-content"><div class="project-card-topline">${isVideo?'MOTION / FILM':'WEB / SOFTWARE'}</div><h3>${esc(p.title)}</h3><p>${esc(p.description||'')}</p><div class="project-stack">${esc(p.stack||'')}</div><div class="project-bottom">${link}<span class="card-index">${isVideo?'PLAY / VIEW':'CASE STUDY'}</span></div>${p.note?`<div class="project-note">${esc(p.note)}</div>`:''}</div></article>`;
}
function wrap(i){return (i+visible.length)%visible.length}
function updateCarousel(){
 const cards=[...grid.children],n=cards.length;
 cards.forEach((el,i)=>{
   let d=i-active;
   if(d>n/2)d-=n;if(d< -n/2)d+=n;
   const abs=Math.abs(d),mobile=innerWidth<=650;
   // X is a percentage of each card's own width. Keep side cards
   // partially visible inside the clipped stage, like a 3D coverflow.
   const x=d*(mobile?78:62);
   const z=abs===0?0:(abs===1?-145:(abs===2?-285:-390));
   const rotate=d*(mobile?24:29);
   const scale=abs===0?1:(abs===1?.82:(abs===2?.68:.56));
   const opacity=abs>2?0:(abs===2?.42:1);
   if(i!==active)el.querySelectorAll('video').forEach(v=>{if(!v.paused)v.pause()});
   el.style.setProperty('--card-x',`${x}%`);
   el.style.setProperty('--card-z',`${z}px`);
   el.style.setProperty('--card-rotate',`${rotate}deg`);
   el.style.setProperty('--card-scale',scale);
   el.style.setProperty('--card-opacity',opacity);
   el.style.zIndex=String(20-abs);
   el.classList.toggle('is-active',i===active);
   el.setAttribute('aria-hidden',String(abs>2));
   el.tabIndex=abs>1?-1:0;
 });
 const current=document.querySelector('#carousel-current'),total=document.querySelector('#carousel-total'),fill=document.querySelector('#carousel-progress-fill');
 if(current)current.textContent=String(active+1).padStart(2,'0');
 if(total)total.textContent=String(n).padStart(2,'0');
 if(fill)fill.style.width=`${n?((active+1)/n)*100:0}%`;
 prev.disabled=next.disabled=n<2;
}
function go(step){if(!visible.length)return;active=wrap(active+step);updateCarousel();}
function selectCard(el){if(dragMoved)return;const i=Number(el.dataset.index);if(Number.isInteger(i)&&i!==active){active=i;updateCarousel();}}
function render(filter='all'){
 visible=projects.filter(p=>filter==='all'||(filter==='Web & Software'?!p.video:p.category===filter));
 active=0;
 grid.innerHTML=visible.map(card).join('');
 resultCount.textContent=`${visible.length} PROJECT${visible.length===1?'':'S'} DISPLAYED`;
 document.querySelectorAll('.filter-count').forEach(el=>{const b=el.closest('button'),f=b.dataset.filter;const count=f==='all'?projects.length:(f==='Web & Software'?projects.filter(p=>!p.video).length:projects.filter(p=>p.category===f).length);el.textContent=count?String(count).padStart(2,'0'):'';});
 updateCarousel();observeReveals();restartAuto();
}
function stopAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null;}}
function restartAuto(){stopAuto();if(reduced.matches||visible.length<3)return;autoTimer=setInterval(()=>{if(!document.hidden&&!stage.matches(':hover')&&!stage.contains(document.activeElement))go(1)},6500);}
prev.addEventListener('click',()=>{stopAuto();go(-1);restartAuto()});
next.addEventListener('click',()=>{stopAuto();go(1);restartAuto()});
grid.addEventListener('click',e=>{const card=e.target.closest('.project-card');if(card&&!e.target.closest('a,button,video'))selectCard(card)});
grid.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();stopAuto();go(e.key==='ArrowRight'?1:-1);restartAuto()}});
stage.addEventListener('pointerdown',e=>{if(e.target.closest('a,button,video'))return;dragStart=e.clientX;lastX=e.clientX;dragMoved=false;stage.setPointerCapture?.(e.pointerId);stopAuto()});
stage.addEventListener('pointermove',e=>{if(dragStart===null)return;if(Math.abs(e.clientX-dragStart)>8)dragMoved=true;lastX=e.clientX});
function endDrag(){if(dragStart===null)return;const delta=lastX-dragStart;if(Math.abs(delta)>38)go(delta<0?1:-1);dragStart=null;setTimeout(()=>{dragMoved=false},80);restartAuto()}
stage.addEventListener('pointerup',endDrag);stage.addEventListener('pointercancel',endDrag);
stage.addEventListener('mouseenter',stopAuto);stage.addEventListener('mouseleave',restartAuto);
stage.addEventListener('focusin',stopAuto);stage.addEventListener('focusout',restartAuto);
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.toggle('active',b===btn));render(btn.dataset.filter)}));
const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation')}));
document.querySelector('#year').textContent=new Date().getFullYear();
let revealObserver;
function observeReveals(){
 const els=document.querySelectorAll('.reveal:not(.observed)');
 if(!('IntersectionObserver'in window)){els.forEach(el=>el.classList.add('in-view'));return;}
 if(!revealObserver)revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.08});
 els.forEach(el=>{el.classList.add('observed');revealObserver.observe(el)});
}
observeReveals();
const motionTargets=document.querySelectorAll('.hero-copy > *, .section-heading, .expertise-card, .about-copy > *, .timeline-item, .education-card, .skills-label, .skill-columns > div, .contact-copy > *, .contact-details > *');
if(!reduced.matches && 'IntersectionObserver' in window){
 document.body.classList.add('motion-ready');
 const motionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('motion-in');motionObserver.unobserve(entry.target)}}),{threshold:.12});
 motionTargets.forEach((el,i)=>{el.classList.add('motion-reveal');el.style.transitionDelay=`${Math.min(i%4,3)*75}ms`;motionObserver.observe(el)});
}else{motionTargets.forEach(el=>el.classList.add('motion-in'))}
const navLinks=[...document.querySelectorAll('.nav-link')],sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver'in window){const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>navObserver.observe(s));}
fetch('projects.json').then(r=>{if(!r.ok)throw new Error('Project data could not be loaded');return r.json()}).then(data=>{projects=data;render()}).catch(()=>{grid.innerHTML='<p class="section-intro">Project details could not be loaded. Please run this site using the included local server instructions.</p>';});
window.addEventListener('resize',updateCarousel,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAuto();else restartAuto()});
reduced.addEventListener?.('change',restartAuto);

// Hero continuous typing effect only; all original site interactions remain unchanged.
function initHeroTyping(){
  const typed = document.querySelector('.hero-role-typed');
  if (!typed || reduced.matches) return;
  const roles = ['IT Technician', 'AI Prompt Engineer', 'Content Creator'];
  let roleIndex = 0, charIndex = 0, deleting = false;
  const tick = () => {
    if (document.hidden) { window.setTimeout(tick, 400); return; }
    const phrase = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typed.textContent = phrase.slice(0, charIndex);
    const delay = !deleting && charIndex === phrase.length ? (deleting = true, 1350)
      : deleting && charIndex === 0 ? (deleting = false, roleIndex = (roleIndex + 1) % roles.length, 320)
      : deleting ? 38 : 75;
    window.setTimeout(tick, delay);
  };
  window.setTimeout(tick, 900);
}
initHeroTyping();

/* Heading-only cinematic typography motion.
   Existing layout, content, colors and non-heading elements remain untouched. */
function initHeadingTypographyMotion() {
  const headingSelector = 'h1, h2, h3, h4, h5, h6, .about-stats strong';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;

  let headingObserver;
  if ('IntersectionObserver' in window) {
    headingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('heading-motion-in');
          headingObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -28px 0px' });
  }

  function prepareHeading(el) {
    if (!(el instanceof HTMLElement) || el.dataset.headingMotionReady) return;
    el.dataset.headingMotionReady = 'true';

    let letterIndex = 0;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      if (!node.nodeValue || !node.nodeValue.trim()) return;
      const fragment = document.createDocumentFragment();
      const words = node.nodeValue.split(/(\s+)/);

      words.forEach((word) => {
        if (!word) return;
        if (/^\s+$/.test(word)) {
          fragment.appendChild(document.createTextNode(word));
          return;
        }

        const wordWrap = document.createElement('span');
        wordWrap.className = 'heading-motion-word';
        Array.from(word).forEach((character) => {
          const letter = document.createElement('span');
          letter.className = 'heading-motion-letter';
          letter.textContent = character;
          letter.style.setProperty('--heading-letter-index', letterIndex++);
          wordWrap.appendChild(letter);
        });
        fragment.appendChild(wordWrap);
      });
      node.parentNode.replaceChild(fragment, node);
    });

    if (headingObserver) headingObserver.observe(el);
    else el.classList.add('heading-motion-in');
  }

  function scanHeadings(scope) {
    if (!scope) return;
    if (scope.matches && scope.matches(headingSelector)) prepareHeading(scope);
    if (scope.querySelectorAll) scope.querySelectorAll(headingSelector).forEach(prepareHeading);
  }

  scanHeadings(document);
  // Project titles are inserted after the project data loads; animate those headings too.
  if ('MutationObserver' in window && document.body) {
    const headingMutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) scanHeadings(node);
        });
      });
    });
    headingMutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  reduceMotion.addEventListener?.('change', (event) => {
    if (event.matches) {
      document.querySelectorAll('.heading-motion-letter').forEach((letter) => {
        letter.style.transition = 'none';
        letter.style.opacity = '1';
        letter.style.filter = 'none';
        letter.style.clipPath = 'inset(0)';
        letter.style.transform = 'none';
      });
    }
  });
}
initHeadingTypographyMotion();

})();
