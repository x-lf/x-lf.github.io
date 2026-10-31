# Greenbook Atelier / 绿皮书五题练习

A buildless Chinese/English learning and multiple-choice practice website based on the supplied, owner-authorized 2008 edition of Xinfeng Zhou's *A Practical Guide to Quantitative Finance Interviews*.

## Current experience

- There are 190 authored four-option exercises: 158 source study units and 32 original concept companions. Calculation questions test results; proof and discussion questions test the argument that establishes the conclusion. Multiple original sub-questions may share a unit.
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

`index.html`, `style.css`, `app.js`, `diagrams.js`, `diagrams-extra.js`, and `quality.js` make up the application. `data.json` contains the bilingual study content, quiz prompts/options/answer indexes, original question parts, adaptation notes, reasoning steps, original-book analysis and source page references. `catalog.tsv` and `quiz-bank.tsv` are readable source companions. Printed main-text page numbers are the source PDF page minus sixteen.

The original copyright remains with its author; the owner confirmed public adaptation authorization. This repository does not grant a new reuse license.

## Preview and deployment

Serve the repository root and open `/greenbook/`; JSON fetches require HTTP rather than `file://`. The existing GitHub Pages branch is `main`, publishing at `https://x-lf.github.io/greenbook/`. The parent homepage and Jekyll configuration remain as they were.

## Validation

Verified all 158 unique bilingual question records and their original-analysis boundaries; whole-book/module selection and the minimum-five guard; unique five-question sets; shuffled answer mapping; correct/wrong feedback and a deterministic 4/5=80 score; locked submissions; no automatic advance; unchanged submit-button position across questions on desktop and mobile; keyboard controls; full source-analysis access; current-set retry; refresh resetting all practice state; absence of notes, scan images and persisted study records; native diagrams and reduced-motion handling. Browser checks use a separate profile.

Version 3 additionally verifies source comparisons on desktop/mobile, multiple-part mathematical stems, both six-person diagram cases, the stepper and analysis tabs, all 23 diagram topics, distinct SVG markers, fixed practice controls with expanded source text, and source access from results.


## Version 4: editorial review and concept practice

All 158 source units received a question-by-question editorial review. The public rubric starts at 100 and deducts explicit penalties for changing the source objective, replacing a requested result with a rationale, revealing answers, missing conditions, incomplete arguments, weak distractors, unit errors and partial sub-question coverage. Scores below 80 require revision. On this rubric, 127 prior units were below threshold; 137 units were revised, including optional improvements above the threshold. All current exercises are at or above 80. These are editorial judgments, not calibrated learner-performance scores or independent panel ratings.

`#quality` exposes every prior/current score, issues, scope and revision finding. `quality-audit.json` also preserves the previous prompts and choices alongside current ones. New concept exercises have no fictitious prior scores and are labeled original companions, with links to related book units. They cover definitions, assumptions, counterexamples and applications. Practice can include all records, source adaptations only, or the 32 concept companions, combined with existing module selection. Only records scoring at least 80 enter the practice pool.

Numerical/result problems now usually ask directly for the value, formula, date, allocation or executable algorithm. Proof questions retain substantive arguments as choices. Restored tasks include the two 0.8-correlation range methods, specific calculus/ODE computations, share-count hedging units, the inverse floater, and Fibonacci timing. Some source units still group multiple sub-questions; individual review records explicitly note selected-part coverage. The two correlation-range units are two methods for the same original problem, not two distinct original book questions.

Release gate: run `python3 greenbook/validate-content.py` from the repository root. It checks score arithmetic, audit/content agreement, source/companion provenance, complete bilingual explanation steps and the 80-point threshold. It does not claim to prove every mathematical answer automatically. Browser QA additionally renders/submits all 190 records, tests quality filters and companion-only module practice, preserves five-question scoring and fixed controls, and checks mobile layout and keyboard behavior.
