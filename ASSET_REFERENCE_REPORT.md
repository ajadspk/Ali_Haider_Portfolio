# Asset reference report

## Asset packaging

The ZIP is source-only. It contains `assets/README.md` and the lightweight `assets/asset-manifest.json`, but does not include original photos, posters, hero artwork, CV PDF or videos. Restore the complete original `assets` folder using `ASSETS_SETUP.md`.

## Expected asset groups

| Asset group | Expected location | Purpose |
|---|---|---|
| CV | `assets/Ali-Haider-CV.pdf` | Download CV buttons |
| Hero animation | `assets/hero-animation/` | Existing hero background, role, name and portrait artwork |
| Portfolio images | `assets/images/` | Existing image references |
| Project posters | `assets/posters/` | Existing poster / thumbnail references |
| Videos | `assets/videos/` | Original video library |
| Categorized videos | `assets/videos/category-work/` | Original categorized project videos and new skill showcases |

## Skill showcase video references

The new `text-content/skill-showcases.json` file uses 18 existing video files in these six groups:

- Fashion & Lifestyle — 7 videos
- Beauty & Personal Care — 2 videos
- Food & FMCG — 2 videos
- TV Commercials & Brand Films — 2 videos
- Content Creation & Social Video — 2 videos
- Creative Concepts & Educational Content — 3 videos

All 18 configured paths were matched against the supplied original ZIP. No path was missing in that archive. This is a filename/path audit, not a claim that every video has been played in a browser.

## Existing media not added to the new showcase

The original asset archive contains additional videos and images beyond these 18 category showcase items. They remain part of your original assets folder and are not deleted or modified by this source-only package. The existing Projects section continues to use `projects.json` for its current set of project cards.

## Path rules

- Paths are relative to the project root and begin with `assets/`.
- Preserve filename capitalization, spaces, punctuation and nested folders.
- If you rename or move a video, update its path in `text-content/skill-showcases.json` (for the new showcase) and/or `projects.json` (for the original Projects section).
