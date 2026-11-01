# Ali Haider Portfolio — Premium 3D Carousel Update

## Included
- `index.html`
- `styles.css` — updated from the supplied portfolio stylesheet, with carousel containment and responsive 3D styling
- `script.js` — updated 3D coverflow positioning, bounded side cards, and pause for inactive videos
- `projects.json` — original project data and original relative media paths

## Important: preserve your existing assets
This ZIP contains the site code and project data, not the actual `assets/` directory or MP4 files.
Copy the `assets/` folder from your existing portfolio into this extracted folder without renaming or moving it.
Keep `assets/` and `projects.json` beside `index.html`, `styles.css`, and `script.js`.

## Run on Windows
1. Extract this ZIP.
2. Copy your original `assets` folder into the extracted folder.
3. Open PowerShell in that folder.
4. Run: `py -m http.server 8000`
5. Open: `http://localhost:8000`
6. Stop the server with `Ctrl+C`.

## Carousel controls
- Use the left/right arrow controls.
- Drag with a mouse or swipe on touch screens.
- Focus the carousel and use left/right keyboard arrows.
- Auto-advance pauses while the stage is hovered/focused or the page is hidden.
- Reduced-motion settings disable automatic movement.

## Notes
All project titles, descriptions, links, and media paths in `projects.json` are preserved.
The 3D carousel is clipped to its own project-stage area so cards cannot spill into the footer.
