#!/usr/bin/env python3
"""Content integrity and editorial release gate; no external dependencies."""
import json
import argparse
import math
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent
lessons = json.loads((ROOT / 'data.json').read_text())
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--review-dir', type=Path, required=True, help='Private local review directory; do not publish it')
REVIEW_DIR = parser.parse_args().review_dir
audit = json.loads((REVIEW_DIR / 'quality-audit.json').read_text())
records = {r['id']: r for r in audit['records']}
errors = []


def check(ok, message):
    if not ok:
        errors.append(message)


check(audit['threshold'] == 80, 'Unexpected review threshold')
check(len({q['id'] for q in lessons}) == len(lessons), 'Duplicate question IDs')
check(set(records) == {q['id'] for q in lessons}, 'Audit/content IDs differ')
for q in lessons:
    key = q['id']
    r = records.get(key)
    if r is None:
        continue
    review = r
    check(r['after'] == review['after'] >= audit['threshold'], f'{key}: below threshold or audit mismatch')
    check(r['after'] == 100 - sum(x['points'] for x in r['remainingIssues']), f'{key}: current score arithmetic')
    check(r['current'] == {'prompt': q['prompt'], 'quiz': q['quiz']}, f'{key}: stale audit snapshot')
    check(len(q['quiz']['options']) == 4 and len(set(q['quiz']['options'])) == 4, f'{key}: four distinct options required')
    check(isinstance(q['quiz']['answer'], int) and 0 <= q['quiz']['answer'] < 4, f'{key}: invalid answer index')
    check(len(q['reasoningSteps']['zh']) == len(q['reasoningSteps']['en']) > 0, f'{key}: unpaired steps')
    for lang in ('zh', 'en'):
        for field in ('title', 'prompt', 'hint', 'solution'):
            check(bool(q[field][lang].strip()), f'{key}: empty {lang} {field}')
        steps = ''.join(q['reasoningSteps'][lang]).replace(' ', '')
        check(steps == q['solution'][lang].replace(' ', ''), f'{key}: explanation missing from steps')
    if q['sourceType'] == 'supplement':
        check(q['parentId'] in records and q['parentId'] != key, f'{key}: invalid parent')
        check(q.get('originalQuestion') is None and not q['originalAnalysis'], f'{key}: invented source attribution')
        check(r['before'] is None and r['status'] == 'new', f'{key}: invented prior score')
    else:
        check(bool(q['originalQuestion']['parts'] and q['originalAnalysis']), f'{key}: missing source')
        check(r['before'] == max(0, 100 - sum(x['points'] for x in r['beforeIssues'])), f'{key}: prior score arithmetic')
        check(r['before'] >= 80 or r['status'] == 'revised', f'{key}: low score not revised')
stats = audit['stats']
check(stats['totalQuestions'] == len(lessons), 'Total count mismatch')
check(stats['sourceUnits'] == sum(q['sourceType'] == 'adapted' for q in lessons), 'Source count mismatch')
check(stats['supplements'] == sum(q['sourceType'] == 'supplement' for q in lessons), 'Companion count mismatch')
check(stats['belowThresholdBefore'] == sum(r['before'] is not None and r['before'] < 80 for r in records.values()), 'Prior low-count mismatch')
check(stats['belowThresholdAfter'] == sum(r['after'] < 80 for r in records.values()) == 0, 'Current low-count mismatch')
check(stats['revised'] == sum(r['status'] == 'revised' for r in records.values()), 'Revision count mismatch')
explanation_audit = json.loads((REVIEW_DIR / 'explanation-audit.json').read_text())
explanation_records = {r['id']: r for r in explanation_audit['records']}
check(set(explanation_records) == set(records), 'Explanation audit IDs differ')
formula_count = 0
for q in lessons:
    key = q['id']
    er = explanation_records[key]
    check(q['approved'] is True and records[key]['after'] >= 80 and er['after'] >= 80, f'{key}: explanation below threshold')
    check(er['before'] == max(0, 100 - sum(x['points'] for x in er['beforeIssues'])), f'{key}: prior explanation score arithmetic')
    check(er['after'] == 100 - sum(x['points'] for x in er['remainingIssues']), f'{key}: current explanation score arithmetic')
    check(q['explanation']['layout'] == 'continuous', f'{key}: fragmented layout')
    check(er['current']['solution'] == q['solution'], f'{key}: stale explanation snapshot')
    check(er['current']['formulas'] == [f['tex'] for f in q['explanation']['formulas']], f'{key}: stale formula snapshot')
    for f in q['explanation']['formulas']:
        formula_count += 1
        root = ET.fromstring(f['mathml'])
        annotation = root.find('.//{http://www.w3.org/1998/Math/MathML}annotation')
        check(annotation is not None and annotation.text == f['tex'], f'{key}: MathML does not match LaTeX')
        check('<script' not in f['mathml'] and '<img' not in f['mathml'], f'{key}: unexpected formula markup')
    table = q['explanation']['table']
    if table:
        check(bool(table['rows']), f'{key}: empty table')
        check(all(len(row) == len(table['headers']) for row in table['rows']), f'{key}: malformed table')
    plot = q['explanation']['plot']
    if plot:
        check(all(plot.get(k) for k in ('title', 'xLabel', 'yLabel', 'caption', 'series')), f'{key}: plot missing units/context')
        check(all(len(s['points']) > 1 and all(math.isfinite(v) for pair in s['points'] for v in pair) for s in plot['series']), f'{key}: invalid plot data')
check(formula_count == explanation_audit['stats']['formulaCount'], 'Formula count mismatch')
check(explanation_audit['stats']['belowBefore'] == sum(r['before'] < 80 for r in explanation_records.values()), 'Explanation low-count mismatch')
check(explanation_audit['stats']['belowAfter'] == sum(r['after'] < 80 for r in explanation_records.values()) == 0, 'Unresolved explanation scores')
if errors:
    raise SystemExit('\n'.join(errors))
print(f"PASS: {len(lessons)} bilingual exercises; review arithmetic/provenance/snapshots; threshold {audit['threshold']}; no current low-score records; {formula_count} rendered LaTeX formulas")
