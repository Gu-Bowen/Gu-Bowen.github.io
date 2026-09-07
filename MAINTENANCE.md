# Website Maintenance Guide

The visual layout is separated from frequently updated academic content. For routine updates, **do not edit `index.html`** unless you are changing page structure.

## Where to edit

- `data/publications.js` — journal articles, conference papers, Chinese-language papers
- `data/news.js` — recent updates
- `data/projects.js` — research projects
- `data/service.js` — editorial service, TPC service, memberships, reviewer service, honors
- `files/Bowen_Gu_CV.pdf` — replace this file to update the CV (keep the filename)
- `assets/profile.jpg` — replace this file to update the portrait (keep the filename)
- `assets/style.css` — visual design only
- `assets/main.js` — rendering / bilingual interaction; normally do not edit

## Add a journal paper
Open `data/publications.js`. Under `journals`, copy one complete `{ ... }` item, paste it in the desired position, and change `year`, `title`, `authorsHtml`, `venueHtml`, `label`, and `links`. Use `<strong>B. Gu</strong>` or `<strong>B. Gu*</strong>` in `authorsHtml`. Set `label` to `SELECTED`, `FEATURED SURVEY`, or an empty string.

Example:
```js
{
  "year": "2027",
  "title": "Paper Title",
  "authorsHtml": "A. Author, <strong>B. Gu*</strong>, and C. Author",
  "venueHtml": "<em>IEEE Transactions on ...</em>, 2027.",
  "label": "",
  "links": [{"label":"DOI","url":"https://doi.org/..."}]
}
```

## Add news
Open `data/news.js`, copy one item, put the newest item first, and edit `date`, `enHtml`, and `zhHtml`. Keep roughly 5–8 recent items on the homepage.

## Add a project
Open `data/projects.js`, copy one project object and edit the bilingual fields.

## Update academic service
Open `data/service.js`. The four editable groups are `editorial`, `conference`, `memberships`, and `honors`; reviewer text is stored in `reviewerEn` / `reviewerZh`.

## Publish changes
1. Save files in VS Code.
2. Open GitHub Desktop and review **Changes**.
3. Commit to `master`.
4. Push origin.
5. GitHub Actions deploys automatically.

## Important
Keep JavaScript commas/brackets intact. If adding an item, the safest method is to copy an existing complete object and edit its values.


## Publication filters and topics

V5.4 adds front-end filtering without changing the page layout. Each publication may contain a `topics` array, for example:

```javascript
"topics": ["backscatter", "mec"]
```

Currently used topic keys include `backscatter`, `mec`, `reconfigurable`, `ai`, `6g`, `active-passive`, `isac`, and `wireless`. The visible filter bar uses the main categories.

- `label: "SELECTED"` or another non-empty label makes a paper appear in the **Selected** filter.
- `year` automatically populates the year selector.
- The search box searches the rendered title, authors, and venue.
- When adding a new paper, copy the closest existing entry and update `topics` as well.

Do not edit the filter logic in `assets/main.js` for routine publication updates.


## Academic Activities / 学术活动

Academic activities are maintained in `data/activities.js`. Add a new object at the top so the newest activity appears first.

```javascript
{
  date: "2027.05.10–05.12",
  year: 2027,
  cityEn: "Beijing",
  cityZh: "北京",
  eventEn: "Conference Name",
  eventZh: "会议名称",
  type: "conference",
  roleEn: "Conference Participation",
  roleZh: "参会",
  talkTitle: "",
  url: ""
}
```

For an invited talk, keynote, tutorial, panel, or session chair activity, change `type` and `roleEn` / `roleZh`, and add the talk title in `talkTitle` when applicable. Ordinary conference participation should remain `type: "conference"`. Keep `url` empty unless an official event or program page is available.
