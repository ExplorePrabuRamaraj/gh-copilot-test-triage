# Project Guidelines

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `use-case-2/tests/` | Playwright test specs (3 files: auth, tasks-ui, tasks-api) |
| `test-results/` | Test failure artifacts (error-context.md, screenshots, .last-run.json) |
| `use-case-2/failure-reports/` | Generated analysis reports (summary-report.md, test-output.txt) |
| `use-case-3/` | Test gap analysis kata (thin-test-cases.md) |

## Test File Classification

| Category | Spec Files | Characteristics |
|----------|-----------|-----------------|
| **UI** | `auth.broken.spec.ts`, `tasks-ui.broken.spec.ts` | Uses `page`, browser interactions, locators, navigation, screenshots |
| **API** | `tasks-api.broken.spec.ts` | Uses `request`, HTTP methods, status codes, JSON response parsing |

## Build & Test Commands

```bash
npm run test:uc2          # Run use-case-2 tests
npm run test:headed       # Run with browser visible
npm run test:report       # Open HTML report
npx playwright test       # Run all tests
```

## Playwright Configuration

- **Base URL**: `https://gh-copilot-usecase1.vercel.app`
- **Test directory**: `./use-case-2/tests`
- **Browser**: Chromium (Desktop Chrome)
- **Timeout**: 30,000ms
- **Retries**: 0
- **Workers**: 1
- **Screenshots**: Only on failure
- **Reporter**: list + HTML

## Engineering Standards

- **No arbitrary waits**: Never use `page.waitForTimeout()` — use explicit waits or assertion auto-waits instead
- **Assertions as waits**: Playwright assertions auto-wait (e.g., `toBeVisible()`, `toHaveText()`, `toHaveCount()`)
- **Locator priority**: `data-testid` > role-based > label/placeholder > visible text > CSS selectors
- **Type safety**: Always `await` async Playwright methods (`.count()`, `.textContent()`, `.getAttribute()`)
- **Test isolation**: Each test must be independent — no shared mutable state between tests
