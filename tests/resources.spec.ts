
import { test, expect } from '@playwright/test';

test('resources page loads correctly', async ({ page }) => {
  // Navigate to the resources page
  await page.goto('/resources');
  
  // Check that the header contains "Student Resources"
  const header = page.locator('h1:has-text("Student Resources")');
  await expect(header).toBeVisible();
  
  // Check for resource tabs
  const resourceTabs = page.locator('button:has-text("Resume Writing")');
  await expect(resourceTabs).toBeVisible();
  
  // Check that the gradient bar is present
  const gradientBar = page.locator('.from-gold-400');
  await expect(gradientBar).toBeVisible();
});
