# Ali Haider Portfolio — Editable Source Package

This is a source-code-only package based on the existing portfolio. It preserves the original visual identity and the original Projects section. Large original media files are intentionally excluded so the ZIP stays easy to download. Restore the original `assets` folder by following `ASSETS_SETUP.md`.

## Run locally

1. Extract this ZIP.
2. Copy your complete original `assets` folder into this project folder (same level as `index.html`).
3. Open the folder in VS Code.
4. Start a local server, for example with the VS Code Live Server extension, or run `python -m http.server 8000` in this folder.
5. Open `http://localhost:8000`.

A local server is recommended because the project loads `projects.json` and `text-content/skill-showcases.json` with `fetch()`.

## Beginner-friendly editing map

| Want to change | Open this file |
|---|---|
| Existing page text and headings | `index.html` |
| New skill showcase headings, descriptions, bullet points, video names and paths | `text-content/skill-showcases.json` |
| Main theme colors and green accent | `colors/theme.css` |
| Shared layout width and corner radius | `spacing/layout.css` |
| Font families | `typography/type.css` |
| Additional showcase / hover / mobile styles | `styles/components.css` |
| Original full site styling | `styles.css` |
| Existing Projects cards and their content | `projects.json` |
| Project gallery interactions | `script.js` |
| Skill showcase rendering behavior | `components/skill-showcases.js` |

## Important

- The original Projects section has been retained. The new skill-based showcase is a separate section directly underneath it.
- The six new showcase groups use the 18 video paths present in the supplied reference asset archive. If you replace or rename a video, update its `src` in `text-content/skill-showcases.json`.
- The source ZIP does not contain the actual photos, videos, posters, hero artwork or CV PDF. These must be restored from your original `assets` folder.
- The original project has other media beyond the 18 videos used in these showcases; those files remain in your original asset folder and are not deleted or repackaged here.
