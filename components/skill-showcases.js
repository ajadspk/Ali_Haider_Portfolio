/* Renders the editable, category-based video showcases from text-content/skill-showcases.json. */
(() => {
  'use strict';
  const host = document.getElementById('skill-showcase-list');
  if (!host) return;

  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  function renderShowcase(item, index) {
    const videos = Array.isArray(item.videos) ? item.videos : [];
    const capabilityList = (item.capabilities || []).map((skill) => `<li>${escapeHTML(skill)}</li>`).join('');
    const videoCards = videos.map((video) => `
      <figure class="showcase-video-card">
        <div class="showcase-video-frame">
          <video controls preload="none" playsinline
            ${video.image ? `poster="${escapeHTML(video.image)}"` : ''}
            aria-label="${escapeHTML(video.title)} video">
            <source src="${escapeHTML(video.src)}" type="video/mp4">
            Your browser does not support HTML video.
          </video>
        </div>
        <figcaption>${escapeHTML(video.title)}</figcaption>
      </figure>`).join('');
    const details = `
      <div class="showcase-copy">
        <p class="eyebrow"><span class="eyebrow-mark">//</span> ${escapeHTML(item.eyebrow)}</p>
        <h3>${escapeHTML(item.title)}</h3>
        <p class="showcase-description">${escapeHTML(item.description)}</p>
        <h4>MY CAPABILITIES</h4>
        <ul>${capabilityList}</ul>
      </div>
      <div class="showcase-media" aria-label="${escapeHTML(item.title)} examples">${videoCards}</div>`;
    return `<article class="skill-showcase${index % 2 ? ' showcase-reverse' : ''}" id="showcase-${escapeHTML(item.id)}">
      <div class="showcase-number">${escapeHTML(item.number || String(index + 1).padStart(2, '0'))}</div>${details}
    </article>`;
  }

  fetch('text-content/skill-showcases.json')
    .then((response) => {
      if (!response.ok) throw new Error('Showcase content file was not found.');
      return response.json();
    })
    .then((data) => {
      const items = Array.isArray(data.showcases) ? data.showcases : [];
      host.innerHTML = items.length
        ? items.map(renderShowcase).join('')
        : '<p class="showcase-loading">No showcase categories have been added yet.</p>';
      // Keep video playback focused: pause other clips when a new clip starts.
      host.addEventListener('play', (event) => {
        if (event.target instanceof HTMLVideoElement) {
          host.querySelectorAll('video').forEach((video) => {
            if (video !== event.target) video.pause();
          });
        }
      }, true);
    })
    .catch((error) => {
      console.error('Skill showcases could not be loaded:', error);
      host.innerHTML = '<p class="showcase-loading">Showcase content could not be loaded. Check text-content/skill-showcases.json.</p>';
    });
})();
