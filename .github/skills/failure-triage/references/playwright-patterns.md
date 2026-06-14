# Playwright Patterns Reference

Concrete code examples for the standards defined in `playwright-tests.instructions.md`.
Load this file only when writing or fixing test code — not during read-only analysis.

---

## Locator Examples

```typescript
// data-testid (preferred)
page.locator('[data-testid="login-button"]')

// Role-based
page.getByRole('button', { name: 'Sign In' })

// Label / Placeholder
page.getByLabel('Username')
page.getByPlaceholder('Enter email')

// Visible text
page.getByText('Welcome back')

// CSS — last resort
page.locator('button.submit-btn')
```

---

## Async/Await — Common Mistakes

```typescript
// ❌ Missing await — receives Promise, not number
const count = page.locator('.item').count();
expect(count).toBeGreaterThan(5); // TypeError

// ✅ Correct
const count = await page.locator('.item').count();
expect(count).toBeGreaterThan(5);
```

---

## Assertion Auto-Wait Patterns

```typescript
// ❌ Manual wait + raw value comparison
await page.click('[data-testid="submit"]');
await page.waitForTimeout(2000);
expect(await page.locator('.success').textContent()).toBe('Saved');

// ✅ Auto-wait assertion
await page.click('[data-testid="submit"]');
await expect(page.locator('.success')).toHaveText('Saved');
```

Preferred matchers:
- `toBeVisible()` over `isVisible()`
- `toHaveText()` over `textContent()`
- `toHaveCount()` over raw `count()` comparisons
- `toHaveURL()` over `page.url()`

---

## Wait Method Selection

| Scenario | Method |
|----------|--------|
| Navigation | `await page.waitForURL(expectedUrl)` |
| Network | `await page.waitForResponse(url => url.includes('/api/'))` |
| DOM changes | `await page.waitForSelector('[data-testid="result"]')` |
| Page state | `await page.waitForLoadState('networkidle')` |
| Task list loaded | `await expect(page.locator('[data-testid="task-card"]').first()).toBeVisible()` |

---

## Dialog Handling

```typescript
// Register handler BEFORE the click that triggers the dialog
page.once('dialog', dialog => dialog.accept());
await page.locator('[data-testid="delete-button"]').first().click();
```

---

## Select / Dropdown

```typescript
// ❌ Wrong — uses internal value that may not match
await page.selectOption('[data-testid="status-select"]', 'inProgress');

// ✅ Use label — immune to value attribute changes
await page.selectOption('[data-testid="status-select"]', { label: 'In Progress' });
```
