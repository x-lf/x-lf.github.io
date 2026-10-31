# Greenbook Atelier / 绿皮书五题练习

A buildless Chinese/English practice website based on the supplied, owner-authorized 2008 edition of Xinfeng Zhou’s *A Practical Guide to Quantitative Finance Interviews*.

## Learning experience

- 190 exercises: 158 book study units and 32 labeled original concept companions. Source sub-questions may be grouped; two units teach different methods for the same correlation-range problem. This is not a count of distinct original book sub-questions.
- Whole-book, selected-module, book-only or concept-only practice; five distinct questions per set.
- Choose → submit → feedback → user-controlled next. Correct answers earn20 points. A fixed footer and scrollable question area preserve the page rhythm.
- “Not sure — show explanation” opens the full analysis without requiring a guess. It is recorded as “not yet” for this set, distinct from an incorrect choice, and earns no points. Both are eligible for current-set review. No study state persists after refresh.
- English original question comparisons, page references, adaptation notes and full original analysis remain available. Source text is transcribed; complex OCR notation may have errors. No source scans are published.
- Full bilingual explanations are displayed continuously. There is no clause-by-clause stepper. Short explanations stay short.
- LaTeX typesetting covers question stems, answer choices, inline prose and309 dedicated equation blocks across183 topics. Repeated identical numeric/formula choices appear once in bilingual mode.
- 42 reasoning/comparison tables and six model-computed charts supplement the retained23 native diagrams. Axes, units and assumptions are labeled. Wide formulas and tables scroll inside their own regions.
- No accounts, notes, saved history, analytics, third-party runtime scripts or backend. Videos remain deferred. Reduced motion is respected; no sound autoplays.

## Reading and mathematical typography

Question stems, answer choices and continuous explanations use document-style serif body text:20px on desktop and18px on small screens, with generous leading and darker English translations. Large expressions scroll within the option.

Slashes are semantic:binary0/1, date lists, units and code remain literal. Arithmetic fractions use a reviewed allowlist; compound fractions, radicals, powers, factorials and Monte Carlo sums have explicit authored LaTeX rules in `typography-rules.cjs`. Source OCR is not passed through numeric-fraction guessing. Bilingual answer delimiters accept missing spaces after the slash without changing canonical text.

## Local editorial review

Question and explanation reviews are private local artifacts and are not included in the published site. Review pages, links and downloadable audit JSON have been removed. The public question data carries only a release-approval boolean; no scores or previous low-quality drafts are shipped.

The release threshold is80 for both reviews. Scores are editorial judgments, not blind-panel or learner-performance calibration. The local explanation review covers all190 records;144 prior explanations fell below threshold. Current explanations retain explicit limitations for advanced proofs and lack of learner calibration.

From this checkout, run:

```
python3 greenbook/validate-content.py --review-dir ../greenbook-web/reviews/greenbook-v5
```

The validator checks local audit arithmetic, content snapshots, bilingual completeness, source/companion attribution, formula annotations, nonempty tables, finite chart data and both release thresholds. It does not prove every mathematical answer.

## Formula authoring

KaTeX0.16.11 is a build-time tool only. Generated native MathML is published; no browser library, font CDN or external formula request is required. With a local KaTeX module:

```
node greenbook/render-formulas.cjs /absolute/path/to/katex/dist/katex.js
node greenbook/render-typography.cjs /absolute/path/to/katex/dist/katex.js
```

The first command compiles dedicated derivation equations; the second builds the exact-string typesetting map for stems, choices and prose. Canonical question text and answer indexes remain unchanged. All source text is escaped and mathematical markup is generated with strict parsing and trust disabled. KaTeX is MIT-licensed; see [KaTeX](https://katex.org/).

## Preview and publication

Serve the repository root and open `/greenbook/`. JSON loading requires HTTP. GitHub Pages publishes `main` at `https://x-lf.github.io/greenbook/`. The parent homepage is unchanged. The previous edition is preserved in Git history and release tags. Copyright remains with the author; the owner confirmed public adaptation authorization. No new reuse license is granted.
