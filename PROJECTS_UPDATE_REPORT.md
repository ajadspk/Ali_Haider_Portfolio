# Projects Update Report

## Restored entries

1. **AJADS Website** — category: Web & Digital Presence; image: `assets/images/ajads-logo.png`; external link: `https://ajadspk.github.io/AJADSPK/`.
2. **Pure Harvest Natural** — category: WordPress UI Customization; image: `assets/images/case-1.png`; external link: `https://pureharvestnatural.com/`. The card explicitly notes that this was customization of an existing site, not a from-scratch build.
3. **Life Psycle Gym Management** — category: Desktop Software · In Development; image: `assets/posters/project-13.jpg`; action: Discuss Project. The card clearly states that the project is in development.

## Display behavior

- All three entries are at the beginning of `projects.json`, so they appear immediately in the existing project carousel.
- Their categories are available through the existing **Web & Software** filter only if the project data category matches that filter; the exact supplied categories are preserved, and the general All Projects view includes all three.
- External website links open in a new tab. The Life Psycle action points to the contact section.
- Stack and status notes are displayed on their project cards.

## Asset note

The three image paths were confirmed in the original reference ZIP. The lightweight source-only package does not include the images; copy the original `assets` folder beside `index.html` as documented in `ASSETS_SETUP.md`.

## Validation

- `projects.json`: JSON parse passed.
- Project titles: all three restored exactly once.
- Required image paths: present in the original reference ZIP.
- JavaScript syntax: checked with Node.js when available; browser rendering and live website navigation are not claimed as tested.
