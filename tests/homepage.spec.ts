
import { test, expect } from '@playwright/test';

test('homepage has correct title and resources section', async ({ page }) => {
  await page.goto('/');
  
  // Check page title
  await expect(page).toHaveTitle(/Career Center/);
  
  // Check that the resources section exists
  const resourcesSection = page.locator('text=Resources to Help You Succeed');
  await expect(resourcesSection).toBeVisible();
});
