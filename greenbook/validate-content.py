#!/usr/bin/env python3
"""Content integrity and editorial release gate; no external dependencies."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
lessons = json.loads((ROOT / 'data.json').read_text())
audit = json.loads((ROOT / 'quality-audit.json').read_text())
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
    review = q['qualityReview']
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
if errors:
    raise SystemExit('\n'.join(errors))
print(f"PASS: {len(lessons)} bilingual exercises; review arithmetic/provenance/snapshots; threshold {audit['threshold']}; no current low-score records")
