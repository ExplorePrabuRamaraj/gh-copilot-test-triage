# Summary Report Template

The summary document at `use-case-2/failure-reports/summary-report.md` must include these sections in order.

---

## Section 1: Results by Category

```markdown
## 1. Results by Category

| Category | Spec File | Total | ✓ Passed | ✗ Failed | Final Status |
|----------|-----------|-------|----------|----------|--------------|
| UI – Auth | auth.broken.spec.ts | 3 | 3 | 0 | ✅ All Passed |
| UI – Tasks | tasks-ui.broken.spec.ts | 4 | 4 | 0 | ✅ All Passed |
| API – Tasks | tasks-api.broken.spec.ts | 4 | 4 | 0 | ✅ All Passed |
| **Total** | | **11** | **11** | **0** | **✅ All Passed** |
```

---

## Section 2: Failure Analysis Details

### 2a. Cross-Pattern Analysis (Shared Root Causes)

```markdown
## 2. Failure Analysis

### 2a. Cross-Pattern Analysis (Shared Root Causes)

| # | Root Cause | Category | Affected Tests | Fix Strategy |
|---|------------|----------|---------------|--------------|
| 1 | Wrong selector `login-btn` vs `login-button` | UI | TC-UI-001 | Corrected data-testid attribute name |
| 2 | Wrong post-action URL expectations | UI | TC-UI-002, TC-UI-004 | Fixed expected URLs to match actual app routing |
| 3 | Hardcoded task IDs (`t1`, `t3`) | API | TC-API-011, TC-API-013 | Replaced with dynamic ID lookup |
```

### 2b. Individual Test Failure Details

For each failed test, provide:
- Test ID and name
- Spec file and line number
- Error type and message (truncated)
- Page snapshot evidence (what was found vs expected)
- Category: UI or API

---

## Section 3: Fix Log

```markdown
## 3. Fix Log

| SI.No | Test ID | Spec File | Line(s) | Root Cause | Changes Made | Improvement Type |
|-------|---------|-----------|---------|------------|--------------|-----------------|
| 1 | TC-UI-001 | auth.broken.spec.ts | L12 | Wrong data-testid `login-btn` | Changed to `login-button` | Assertion fix |
| 2 | TC-UI-002 | auth.broken.spec.ts | L25 | Wrong expected URL `/home` | Changed to `/` | Assertion fix |
| 3 | TC-UI-005 | tasks-ui.broken.spec.ts | L17-18 | Missing `await` on `.count()` | Added `await` + visibility wait | Wait improvement |
```

**Improvement Type** must be one of: `Assertion fix`, `Wait improvement`, `Selector fix`, `HTTP method fix`, `Request body fix`, `Dynamic ID lookup`, `Dialog handling`, or a combination.

---

## Section 4: Reasoning

For each fix (numbered to match Fix Log SI.No), explain:
- What error evidence was examined (error message, page snapshot, call log)
- How the root cause was identified
- Why the chosen fix is correct
- Any alternative approaches considered and why they were rejected

---

## Section 5: Iteration Summary

```markdown
## 5. Iteration Summary

**Total Iterations**: N of MAX_ITERATIONS

### Iteration 1
- **Tests Executed**: [list all test IDs run]
- **Command**: `npx playwright test use-case-2/tests/ --workers=2`
- **Results**: X passed, Y failed
- **Fixes Applied**: [list fix SI.No references]
- **Duration**: X.Xs

### Iteration 2 (if applicable)
- ...
```

---

## Section 6: Timeline & Time Breakdown

```markdown
## 6. Timeline & Time Breakdown

| Phase | Description | Duration |
|-------|-------------|----------|
| 1. Discovery | Read test-results/ directory, identify failed tests | ~Xs |
| 2. Error Analysis | Read all error-context.md files, extract error details | ~Xs |
| 3. Cross-Analysis | Identify shared root causes across all failures | ~Xs |
| 4. Code Review | Read test source files, compare with page snapshots | ~Xs |
| 5. Fix Proposal | Generate analysis report with proposed fixes | ~Xs |
| 6. Fix Application | Apply all code changes to spec files | ~Xs |
| 7. Test Execution | Run targeted test suite (per iteration) | ~Xs |
| 8. Report Generation | Generate this summary document | ~Xs |
| **Total** | | **~Xs** |
```

---

## Section 7: Effort Savings Analysis

```markdown
## 7. Effort Savings Analysis

### Comparison Matrix

| Activity | Manual Effort | AI Chat (Non-Agentic) | Agentic Approach |
|----------|--------------|----------------------|------------------|
| Read & parse error reports | ~15-20 min | ~5 min (copy-paste) | ~10 sec (automated) |
| Cross-analyze shared root causes | ~20-30 min | ~5-10 min | ~5 sec (automated) |
| Diagnose each failure | ~45-60 min | ~15-20 min | ~15 sec (automated) |
| Write fix code for all tests | ~30-45 min | ~10-15 min (manual apply) | ~10 sec (auto-applied) |
| Execute tests & verify | ~5-10 min | ~5-10 min (manual run) | ~60 sec (automated) |
| Iterate on remaining failures | ~20-30 min/iter | ~10-15 min/iter | ~90 sec/iter |
| Generate summary report | ~15-20 min | N/A | ~5 sec (automated) |
| **Total Estimated** | **~2.5-3.5 hours** | **~50-75 min** | **~3-5 min** |

### Key Advantages of Agentic Approach
- **End-to-end automation**: No manual copy-paste or context switching
- **Cross-pattern detection**: Identifies shared root causes before individual fixes
- **Iterative self-correction**: Re-runs, re-analyzes, re-fixes without human intervention
- **Zero context loss**: Maintains full state across iterations
- **Consistent methodology**: Same diagnostic rigor for every failure

### ROI Summary
- **Time saved vs manual**: ~X hours (~XX% reduction)
- **Time saved vs non-agentic AI**: ~X minutes (~XX% reduction)
- **Fix accuracy**: X/Y fixes correct on first attempt (XX%)
- **Iterations needed**: N (vs estimated M manual debug cycles)
```

---

---

## Section 8: Context & Token Usage

```markdown
## 8. Context & Token Usage

### Files Read This Session

| File | Purpose | Token Impact |
|------|---------|-------------|
| `test-results/failure-digest.json` | Primary triage source — all failures in one read | Low (compact) |
| `test-results/<folder>/error-context.md` | Snapshot analysis (UI locator failures only) | Medium per file |
| `use-case-2/tests/*.spec.ts` | Source context for fix proposals | Medium per file |
| `.github/skills/failure-triage/SKILL.md` | Triage procedure | Low |
| `.github/skills/summary-report/SKILL.md` | Report generation procedure | Low |
| `.github/instructions/*.instructions.md` | Auto-loaded on file edits | Low (trimmed) |

### Digest Hook Effectiveness

| Metric | Value |
|--------|-------|
| `failure-digest.json` used for triage | Yes / No |
| `error-context.md` files opened individually | N of Y total (list which ones) |
| Sections skipped per reading rules | e.g. "Skipped `# Test source` and `# Page snapshot` for all API tests" |
| Estimated tokens saved vs full reads | ~N lines (~XX%) |

### Optimisation Notes

Document any cases where the reading rules could not be followed and why, so the rules can be improved:
- e.g. "Had to read full snapshot for TC-UI-006 because locator mismatch required DOM element inspection"
- e.g. "Digest was absent — fell back to 11 individual reads"
```

---

## Document Footer

```markdown
---
*Generated by failure-analysis agent | Date: [ISO date] | Playwright version: [version] | Total test execution time: [duration]*
```
