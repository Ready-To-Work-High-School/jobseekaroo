
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('unauthenticated user is redirected to login', async ({ page }) => {
    // Try to access protected route
    await page.goto('/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('navigation menu works correctly', async ({ page }) => {
    // Login first
    await page.goto('/sign-in');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'ValidPassword123!');
    await page.click('button[type="submit"]');

    // Test desktop navigation
    await page.click('a:has-text("Jobs")');
    await expect(page).toHaveURL('/jobs');

    await page.click('a:has-text("Schools")');
    await expect(page).toHaveURL('/school-integration');
  });
});

