---
description: "Use when analyzing, fixing, or reviewing UI test failures in auth or tasks-ui spec files. Covers locator troubleshooting, dropdown/select issues, dialog handling, and beforeEach login flow analysis."
applyTo:
  - "use-case-2/tests/auth*.spec.ts"
  - "use-case-2/tests/tasks-ui*.spec.ts"
---

# UI Test Analysis Rules

## Rule: Locator Troubleshooting

When a locator timeout or element-not-found error occurs:

1. **Check Error Context** — review `error-context.md` in `test-results/` for the page snapshot
2. **Compare Selectors** — match the test code selector with the actual element in the snapshot
3. **Identify Mismatch** — e.g., test uses `[data-testid="login-btn"]` but snapshot shows `button "Sign In"` without that attribute
4. **Propose Fix** — use visible text, role-based, or correct `data-testid` as fallback
5. **Verify Uniqueness** — ensure the proposed selector matches exactly one element

## Rule: Dropdown/Select Issues

For `selectOption` errors ("does not have option with value X"):

1. **Extract Error** — note the value that was not found
2. **Check HTML** — verify actual `<option>` values in the application
3. **Common Mistakes**:
   - Using label text instead of value attribute
   - Wrong casing (e.g., `"inProgress"` vs `"in-progress"`)
4. **Fix** — use correct value, or switch to `{ label: 'In Progress' }` selection

## Rule: UI-Specific Analysis

- **Check `beforeEach` login flow first** — a broken login selector breaks ALL tests in the suite
- **Verify locators against page snapshots** in `error-context.md`
- **Async timing** — tasks loaded after navigation need explicit waits before assertions
- **Dialog handling** — browser `confirm()` dialogs need `page.once('dialog', ...)` BEFORE the triggering click
- **Prefer auto-wait assertions** — use `toHaveCount()` / `toBeVisible()` over raw `.count()` comparisons

## Handling Locator Failures

When test shows element not found:
1. **Check Page Snapshot** — in `error-context.md`, find actual element structure
2. **Match Alternative** — if `data-testid` missing, identify element by role/text from snapshot
3. **Propose Update** — suggest new locator based on available attributes
4. **Consider App Fix** — if possible, recommend adding `data-testid` to application code
