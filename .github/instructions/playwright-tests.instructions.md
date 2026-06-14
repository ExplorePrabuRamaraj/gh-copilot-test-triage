---
description: "Use when writing, fixing, or reviewing Playwright test files. Covers locator strategies, async/await patterns, assertion best practices, and wait methods."
applyTo: "use-case-2/tests/**/*.ts"
---

# Playwright Test Standards

> **Code examples**: see `.github/skills/failure-triage/references/playwright-patterns.md` — load that file only when writing or fixing code, not during read-only analysis.

## Locator Strategy Priority

1. `data-testid` attributes — most stable
2. Role-based selectors (`getByRole`)
3. Label / Placeholder (`getByLabel`, `getByPlaceholder`)
4. Visible text (`getByText`)
5. CSS selectors — last resort, fragile

## Async/Await Validation

These Playwright methods return Promises and **must** be awaited:
- `.count()` → `Promise<number>`
- `.textContent()` → `Promise<string>`
- `.getAttribute()` → `Promise<string | null>`
- `.inputValue()` → `Promise<string>`
- `.isVisible()` → `Promise<boolean>`

## Assertion Best Practices

Use Playwright's auto-waiting assertions instead of manual waits:
- `toBeVisible()` over `isVisible()` checks
- `toHaveText()` over `textContent()` comparisons
- `toHaveCount()` over raw `count()` comparisons
- `toHaveURL()` over `page.url()` comparisons
- Never use `page.waitForTimeout()` — use explicit waits or assertion auto-waits

## Wait Methods

| Scenario | Method |
|----------|--------|
| Navigation | `page.waitForURL(expectedUrl)` |
| Network | `page.waitForResponse(...)` |
| DOM changes | `page.waitForSelector(...)` |
| Page state | `page.waitForLoadState('networkidle')` |

## Dialog Handling

Register `page.once('dialog', ...)` **before** the click that triggers the dialog.

## Code Quality

- **DRY**: Extract repeated login/setup logic to fixtures or helper functions
- **Type safety**: Ensure proper TypeScript typing, especially for async operations
- **Isolation**: Each test must be independent — no shared mutable state
- **Cleanup**: Restore state after tests (logout, clear data) when needed
- **Auto-retry**: Leverage Playwright's built-in retry via auto-waiting assertions
