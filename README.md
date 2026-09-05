# Bowen Gu Academic Homepage — Maintainable Bilingual Edition

Static bilingual academic homepage for GitHub Pages.

## Routine content maintenance
Academic content is separated from page markup:

- `data/publications.js`
- `data/news.js`
- `data/projects.js`
- `data/service.js`

See **MAINTENANCE.md** for step-by-step editing instructions.

## Deployment
The included GitHub Actions workflow deploys pushes to the `master` branch to GitHub Pages.


### V5.4 publication discovery
The Publications section now supports Selected/topic/year filters and text search. Publication metadata remains editable in `data/publications.js`.
