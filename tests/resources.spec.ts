
import { test, expect } from '@playwright/test';

test('resources page loads correctly', async ({ page }) => {
  // Navigate to the resources page
  await page.goto('/resources');
  
  // Check that the header contains "Student Resources"
  const header = page.locator('text=Student Resources');
  await expect(header).toBeVisible();
  
  // Check that the gradient bar is present
  const gradientBar = page.locator('.bg-gradient-to-r.from-gold-400');
  await expect(gradientBar).toBeVisible();
});
