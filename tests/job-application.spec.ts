
import { test, expect } from './helpers/setup';

test.describe('Job Application Flow', () => {
  test('user can view and apply to a job', async ({ authenticatedPage: page }) => {
    await test.step('Navigate to jobs', async () => {
      await page.goto('/jobs');
      await page.click('.job-card:first-child');
    });
    
    await test.step('Start application', async () => {
      await page.click('button:has-text("Apply")');
      await page.click('button:has-text("Next")');
      await page.click('button:has-text("Next")');
      await page.click('button:has-text("Submit Application")');
    });
    
    await expect(page.getByText('Application Submitted')).toBeVisible();
  });

  test('incomplete application shows validation errors', async ({ authenticatedPage: page }) => {
    await page.goto('/jobs');
    await page.click('.job-card:first-child');
    await page.click('button:has-text("Apply")');
    await page.click('button:has-text("Next")');
    
    // Try to submit without required fields
    await page.click('button:has-text("Submit Application")');
    
    await expect(page.getByText(/required field/i)).toBeVisible();
  });

  test('user can view saved and applied jobs', async ({ authenticatedPage: page }) => {
    await test.step('Check saved jobs', async () => {
      await page.goto('/saved');
      await expect(page).toHaveURL('/saved');
    });
    
    await test.step('Check applications', async () => {
      await page.goto('/applications');
      await expect(page).toHaveURL('/applications');
    });
  });
});
