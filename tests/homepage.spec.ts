
import { test, expect } from '@playwright/test';

test('homepage has correct title and resources section', async ({ page }) => {
  await page.goto('/');
  
  // Check page title
  await expect(page).toHaveTitle(/Job Seekers 4 High Schools/);
  
  // Check that the resources section exists
  const resourcesSection = page.locator('h2:has-text("Resources to Help You Succeed")');
  await expect(resourcesSection).toBeVisible();
  
  // Additional check for common elements
  const heroSection = page.locator('section:has-text("Find the perfect entry level job")');
  await expect(heroSection).toBeVisible();
});
