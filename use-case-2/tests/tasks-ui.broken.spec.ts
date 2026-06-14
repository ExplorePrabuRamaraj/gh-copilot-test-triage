import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gh-copilot-usecase1.vercel.app';

test.describe('Task List & Filtering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-testid="username-input"]', 'admin');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL(`${BASE_URL}/dashboard`);
  });

  // TC-UI-005: View All Tasks on Dashboard
  test('TC-UI-005 - View All Tasks on Dashboard', async ({ page }) => {
    const taskCount = page.locator('[data-testid="task-card"]').count();
    expect(taskCount).toBeGreaterThanOrEqual(5);
  });

  // TC-UI-006: Filter Tasks by Status — To Do
  test('TC-UI-006 - Filter Tasks by Status: To Do', async ({ page }) => {
    await page.click('[data-testid="filter-to-do"]');
    const tasks = page.locator('[data-testid="task-status"]');
    const count = await tasks.count();
    for (let i = 0; i < count; i++) {
      await expect(tasks.nth(i)).toContainText('To Do');
    }
  });

  // TC-UI-010: Create a New Task
  test('TC-UI-010 - Create a New Task', async ({ page }) => {
    await page.click('[data-testid="add-task-button"]');
    await page.fill('[data-testid="task-title-input"]', 'Automate regression suite');
    await page.fill('[data-testid="task-description-input"]', 'Use Playwright to automate all regression scenarios');
    await page.selectOption('[data-testid="task-status-select"]', 'inProgress');
    await page.selectOption('[data-testid="task-priority-select"]', 'high');
    await page.fill('[data-testid="task-assignee-input"]', 'admin');
    await page.click('[data-testid="task-submit-button"]');

    await expect(page.locator('[data-testid="task-modal"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="task-list"]')).toContainText('Automate regression suite');
  });

  // TC-UI-013: Delete a Task
  test('TC-UI-013 - Delete a Task', async ({ page }) => {
    const initialCount = await page.locator('[data-testid="task-card"]').count();
    await page.locator('[data-testid="delete-task-button"]').first().click();
    const newCount = await page.locator('[data-testid="task-card"]').count();
    expect(newCount).toBe(initialCount - 1);
  });

});
