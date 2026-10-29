# Greenbook Atelier / 绿皮书五题练习

A buildless Chinese/English learning and multiple-choice practice website based on the supplied, owner-authorized 2008 edition of Xinfeng Zhou's *A Practical Guide to Quantitative Finance Interviews*.

## Current experience

- All 158 study units have authored four-option questions. Calculation questions test results; proof and discussion questions test the argument that establishes the conclusion. Multiple original sub-questions may share a unit.
- Whole-book practice or a choice of one or more of seven modules; exactly five distinct questions per set. A module with fewer than five questions must be combined with another.
- Explicit choose → submit → feedback → next sequence, with shuffled options, 20 points per correct answer, current-set streaks, a fixed action bar, and a short transition within a stable scrolling card. No automatic advance.
- End-of-set score, answer review and optional current-set errors prioritized in another full five-question set.
- No accounts, saved progress, notes, bookmarks, long-term history or export/import. Session state exists only in JavaScript memory; refreshing clears it. No analytics, third-party scripts or backend.
- Correct answers have bilingual explanatory guides and complete corresponding original English analysis transcribed from the source. OCR can affect mathematical glyphs; normalized guide formulas accompany it. These guides are not a full sentence-by-sentence Chinese translation of the book.
- Native HTML/SVG diagrams replace scan images in the published site. The original PDF and rendered images remain available only in the local source workspace.
- Reduced-motion preferences are respected. The implementation does not autoplay sound. Videos are deferred as requested.

## Version 3: original comparison and visual explanations

The previous published edition is preserved by tag `greenbook-v2-20261029`. Each of the 158 units now includes an expandable English source comparison with page references, the adapted study prompt and a bilingual adaptation note. There are 189 source parts; ten units are source reference sections rather than question stems. Source text is OCR-transcribed, with selected mathematical stems normalized against the local scanned pages. No page images are published.

Explanations open in a bilingual step-by-step view. All units have reasoning steps; 23 topics also have dedicated native diagrams, including a switchable two-case six-person proof. Full bilingual guides and original English analysis remain available as separate tabs. Source comparison also appears in practice and answer review. The original three-color sock conditions and the Gaussian-integral bounds were corrected against the book.

## Files

`index.html`, `style.css`, `app.js`, `diagrams.js`, and `diagrams-extra.js` make up the application. `data.json` contains the bilingual study content, quiz prompts/options/answer indexes, original question parts, adaptation notes, reasoning steps, original-book analysis and source page references. `catalog.tsv` and `quiz-bank.tsv` are readable source companions. Printed main-text page numbers are the source PDF page minus sixteen.

The original copyright remains with its author; the owner confirmed public adaptation authorization. This repository does not grant a new reuse license.

## Preview and deployment

Serve the repository root and open `/greenbook/`; JSON fetches require HTTP rather than `file://`. The existing GitHub Pages branch is `main`, publishing at `https://x-lf.github.io/greenbook/`. The parent homepage and Jekyll configuration remain as they were.

## Validation

Verified all 158 unique bilingual question records and their original-analysis boundaries; whole-book/module selection and the minimum-five guard; unique five-question sets; shuffled answer mapping; correct/wrong feedback and a deterministic 4/5=80 score; locked submissions; no automatic advance; unchanged submit-button position across questions on desktop and mobile; keyboard controls; full source-analysis access; current-set retry; refresh resetting all practice state; absence of notes, scan images and persisted study records; native diagrams and reduced-motion handling. Browser checks use a separate profile.

Version 3 additionally verifies source comparisons on desktop/mobile, multiple-part mathematical stems, both six-person diagram cases, the stepper and analysis tabs, all 23 diagram topics, distinct SVG markers, fixed practice controls with expanded source text, and source access from results.
