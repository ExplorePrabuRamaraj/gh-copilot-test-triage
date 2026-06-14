# Analysis Rules Reference

Detailed diagnostic rules for the failure-triage skill. Each rule targets a specific failure category.

---

## Rule 1: Locator Troubleshooting

When a locator timeout or element-not-found error occurs:

1. **Check Error Context** — review `error-context.md` for the page snapshot
2. **Compare Selectors** — match test code selector with actual element in snapshot
3. **Identify Mismatch**:
   - Test uses: `[data-testid="login-btn"]`
   - Actual element: `button "Sign In"` without data-testid
4. **Propose Fix** — use visible text, role-based, or correct `data-testid` as fallback
5. **Verify Uniqueness** — ensure proposed selector matches exactly one element

---

## Rule 2: Async/Await Validation

For TypeErrors or unexpected values:

1. **Scan Code** — identify all async Playwright methods
2. **Common Culprits**:
   - `.count()` returns `Promise<number>`, must be awaited
   - `.textContent()` returns `Promise<string>`
   - `.getAttribute()` returns `Promise<string | null>`
3. **Fix Pattern** — add `await` keyword before method calls
4. **Validate** — ensure variable receives actual value, not Promise object

---

## Rule 3: Assertion Analysis

For assertion failures:

1. **Compare Expected vs Received** — extract both values from error message
2. **Check Logic** — verify assertion makes sense given test objective
3. **Validate URLs** — ensure expected URL matches application routing
4. **Data Structure** — for API tests, verify response shape matches expectations

---

## Rule 4: API Test Diagnostics

For API test failures:

1. **HTTP Status Errors** — check method (GET/POST/PUT/DELETE) matches endpoint; `PATCH` is often not supported
2. **Request Validation** — verify all required fields are included in body; field names must exactly match API spec
3. **Response Parsing** — ensure correct path to access nested data (e.g., `body.data.tasks` vs `body.data` vs `body.tasks`)
4. **Authentication** — confirm auth tokens/headers are properly set

---

## Rule 5: Dropdown/Select Issues

For selectOption errors:

1. **Extract Error** — "does not have option with value X"
2. **Check HTML** — verify actual option values in application
3. **Common Mistakes**:
   - Using label text instead of value attribute
   - Wrong casing (e.g., `"inProgress"` vs `"in-progress"`)
4. **Fix** — use correct value or switch to label-based selection: `{ label: 'In Progress' }`

---

## Rule 6: Cross-Pattern Upfront Analysis

Before proposing any individual fix, perform a cross-test sweep:

1. **Scan `beforeEach`/`beforeAll`** — bugs here cascade to every test in the block; fix first
2. **Identify Duplicate Selectors** — search all test files for the same broken selector string; fix all occurrences simultaneously
3. **Batch API Fixes** — if response shape is wrong in one API test, check all other API tests for the same structural assumption
4. **Group by Root Cause** — present fixes grouped by root cause, not by test, to highlight shared issues clearly
5. **Estimate Blast Radius** — for each root cause, list all affected tests before proposing the fix

---

## Rule 7: UI vs API Test Analysis

### UI Tests
- Check `beforeEach` login flow first — a broken login selector breaks all tests in the suite
- Verify locators against page snapshots in `error-context.md`
- Watch for async timing: tasks loaded after navigation need explicit waits before assertions
- Dialog handling: browser `confirm()` dialogs need `page.once('dialog', ...)` before the triggering click
- Use `toHaveCount()` / `toBeVisible()` over raw `.count()` comparisons for auto-wait behavior

### API Tests
- Verify HTTP method matches endpoint (GET/POST/PUT/DELETE — `PATCH` is often not supported)
- Check request body field names exactly match what the API expects (e.g., `title` vs `taskTitle`)
- Validate response shape: `body.data` vs `body.data.tasks` vs `body.tasks`
- Confirm expected status codes: creation endpoints often return `201`, not `200`
- Never hardcode resource IDs (e.g., `t1`, `t3`) — fetch a real ID dynamically from a list call first
- Ensure `beforeAll` auth token is captured correctly before any test runs
