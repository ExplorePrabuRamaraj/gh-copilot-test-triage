import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gh-copilot-usecase1.vercel.app';

test.describe('Authentication', () => {

  // TC-UI-001: Successful Login
  test('TC-UI-001 - Successful Login', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-btn"]');
    await expect(page).toHaveURL(`${BASE_URL}/dashboard`);
    await expect(page.locator('[data-testid="logged-in-user"]')).toContainText('Admin User');
  });

  // TC-UI-002: Login with Invalid Credentials
  test('TC-UI-002 - Login with Invalid Credentials', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-error"]')).toContainText('Invalid credentials');
    await expect(page).toHaveURL(`${BASE_URL}/home`);
  });

  // TC-UI-004: Successful Logout
  test('TC-UI-004 - Successful Logout', async ({ page }) => {
    // Login first
    await page.goto(BASE_URL);
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL(`${BASE_URL}/dashboard`);

    // Perform logout
    await page.click('[data-testid="logout-button"]');
    await expect(page).toHaveURL(`${BASE_URL}/login`);

    // Verify token is cleared from localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();
  });

});
