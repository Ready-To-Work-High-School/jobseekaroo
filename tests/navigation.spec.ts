
import { test, expect } from './helpers/setup';

test.describe('Navigation', () => {
  test('unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('navigation menu works correctly', async ({ authenticatedPage: page }) => {
    await test.step('Navigate to Jobs', async () => {
      await page.click('a:has-text("Jobs")');
      await expect(page).toHaveURL('/jobs');
    });

    await test.step('Navigate to Schools', async () => {
      await page.click('a:has-text("Schools")');
      await expect(page).toHaveURL('/school-integration');
    });
  });

  test('mobile navigation works correctly', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    await test.step('Login', async () => {
      await page.goto('/sign-in');
      await page.fill('input[name="email"]', 'testuser@example.com');
      await page.fill('input[name="password"]', 'ValidPassword123!');
      await page.click('button[type="submit"]');
    });

    await test.step('Use mobile navigation', async () => {
      // Check that mobile nav is visible
      await expect(page.locator('nav.grid-cols-5')).toBeVisible();
      
      // Test navigation items
      await page.click('a:has-text("Jobs")');
      await expect(page).toHaveURL('/jobs');
      
      await page.click('a:has-text("Profile")');
      await expect(page).toHaveURL('/profile');
    });
  });
});
