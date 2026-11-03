# Changelog

## Skill showcase and maintainability update

- Kept the existing Projects section markup and its project data / carousel behavior intact.
- Added a separate skill-based showcase section immediately after Projects.
- Added six evidence-based categories: Fashion & Lifestyle, Beauty & Personal Care, Food & FMCG, TV Commercials & Brand Films, Content Creation & Social Video, and Creative Concepts & Educational Content.
- Connected 18 video paths already present in the supplied original asset archive.
- Added responsive video grids, native video controls, and pause-other-videos behavior.
- Added a consistent neon-green hover treatment to Professional Snapshot cards and the education card.
- Tightened the narrow-screen Explore My Work action layout so its text and arrow remain inside the button bounds.
- Split editable design tokens into `colors/`, `spacing/`, and `typography/` stylesheets.
- Added `text-content/skill-showcases.json` so the new showcase copy and video paths can be edited without changing JavaScript.
- Added `styles/components.css` and `components/skill-showcases.js` for the new component.
- Kept the package source-only; the original `assets` folder is restored separately using `ASSETS_SETUP.md`.

## Not changed

- Existing hero markup, artwork references and hero animation behavior.
- Existing Projects section content, filtering, carousel, and `projects.json`.
- Existing page copy outside the new showcase section.

## Project archive correction — 2026-11-02

- Restored AJADS Website, Pure Harvest Natural, and Life Psycle Gym Management using the exact project details and relative image paths supplied by the portfolio owner.
- Added stack and project-status metadata to project cards.
- Added category-specific introductory copy for the three restored project categories.
- Kept Life Psycle clearly labeled as in development; no claim that it is a finished application.
