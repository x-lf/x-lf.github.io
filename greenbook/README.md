# Greenbook Atelier / 绿皮书练习室

A static Chinese/English practice website based on the owner's supplied 2008 edition of Xinfeng Zhou's *A Practical Guide to Quantitative Finance Interviews*. The owner confirmed permission for public adaptation in the project conversation.

## Content scope

- 158 bilingual study units across the original seven chapters. A unit may group multiple original sub-questions.
- Adapted Chinese/English study prompts, a hint, and a concise explanatory guide for every unit. These guides are not a sentence-by-sentence translation of the book.
- All 213 original PDF pages, including front matter, figures, complete exercises, solutions and index, preserved as scans.
- OCR reference text is explicitly secondary to the scan, particularly for mathematics.
- Selected multiple-choice checks; free-form notes are not automatically graded.
- An interactive two-ball floor-count exploration, bookmarks, progress, and JSON record export/import.
- No video, login, analytics, external dependencies or backend. Notes and progress remain in browser localStorage and do not synchronize automatically.

## Files and maintenance

`index.html`, `style.css`, and `app.js` are the interface. `data.json` holds learning units; each item has a stable ID, bilingual title/prompt/hint/solution, source PDF pages, optional quiz and source OCR. `book.json` has the OCR of all pages. `pages/001.jpg` through `pages/213.jpg` preserve the original scans. Printed page numbers equal PDF page minus 16 for the main book text.

Source illustrations are not replaced by OCR. Corrections and instructional clarifications (e.g. conditional-normal normalization and hedge-share units) are reflected in the guides while the original scans remain unchanged. Follow the owner's authorization for any further reuse; no new license is granted here.

## Preview and publish

Serve the repository root with a static web server, then open `/greenbook/`. Opening the HTML through `file://` does not support JSON fetching.

The parent repository already publishes GitHub Pages from `main`. Updates to this folder publish at `https://x-lf.github.io/greenbook/`. No change to the existing Jekyll theme or homepage is required.

## Validation

Checked desktop and 390px mobile layout; all chapter counts and 213 source image assets; language switching; hidden hints and answers; multiple-choice feedback; notes after reload; bookmarks and completion filters; export and invalid-file import; reader navigation; floor simulator at 1, 100 and 500 floors. An isolated browser reported no uncaught errors. Independently recomputed the dice-game and card-game Bellman values (6.1537379284 and 2.6244755490).
