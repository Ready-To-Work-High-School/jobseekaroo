
import { test, expect } from './helpers/setup';

test.describe('Navigation', () => {
  test('unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('desktop navigation works correctly', async ({ authenticatedPage: page }) => {
    await test.step('Navigate to Jobs', async () => {
      await page.click('a:has-text("Jobs")');
      await expect(page).toHaveURL('/jobs');
    });

    await test.step('Navigate to Schools', async () => {
      await page.click('a:has-text("Schools")');
      await expect(page).toHaveURL('/school-integration');
    });
    
    await test.step('Navigate to Employers', async () => {
      await page.click('text=For Employers');
      await expect(page).toHaveURL('/for-employers');
    });
    
    await test.step('Navigate to Resources', async () => {
      await page.click('text=Resources');
      await page.click('a:has-text("Career Resources")');
      await expect(page).toHaveURL('/resources');
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
      
      // Test hamburger menu
      await page.click('button:has-text("Menu")');
      await page.click('a:has-text("Schools")');
      await expect(page).toHaveURL('/school-integration');
    });
  });
  
  test('navigation contains all primary links', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential navigation links
    await expect(page.locator('a:has-text("Home")')).toBeVisible();
    await expect(page.locator('a:has-text("Jobs"), a:has-text("For Job Seekers")')).toBeVisible();
    await expect(page.locator('a:has-text("Schools")')).toBeVisible();
    await expect(page.locator('a:has-text("For Employers"), a:has-text("Employers")')).toBeVisible();
    await expect(page.locator('a:has-text("Resources"), a:has-text("Career Resources")')).toBeVisible();
    
    // Check auth links
    await expect(page.locator('a:has-text("Sign In")')).toBeVisible();
    await expect(page.locator('a:has-text("Sign Up")')).toBeVisible();
  });
});
