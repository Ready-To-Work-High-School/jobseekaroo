
import { test, expect } from '@playwright/test';

test.describe('Job Application Flow', () => {
  // Assumes there's a logged-in test user
  test.beforeEach(async ({ page }) => {
    // Login steps (you might want to create a helper function for this)
    await page.goto('/sign-in');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'ValidPassword123!');
    await page.click('button[type="submit"]');
  });

  test('user can view and apply to a job', async ({ page }) => {
    // Navigate to jobs page
    await page.goto('/jobs');
    
    // Select first job
    await page.click('.job-card:first-child');
    
    // Start application
    await page.click('button:has-text("Apply")');
    
    // Go through application steps
    await page.click('button:has-text("Next")');
    await page.click('button:has-text("Next")');
    await page.click('button:has-text("Submit Application")');
    
    // Verify application submission
    await expect(page.getByText('Application Submitted')).toBeVisible();
  });

  test('user can view saved and applied jobs', async ({ page }) => {
    await page.goto('/saved');
    await expect(page).toHaveURL('/saved');
    
    await page.goto('/applications');
    await expect(page).toHaveURL('/applications');
  });
});

