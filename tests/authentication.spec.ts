
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can sign up successfully', async ({ page }) => {
    await page.goto('/sign-up');
    
    // Fill out sign-up form
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'StrongPassword123!');
    await page.check('input[name="agreeToTerms"]');
    
    await page.click('button[type="submit"]');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('user can log in successfully', async ({ page }) => {
    await page.goto('/sign-in');
    
    // Use a test user
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'ValidPassword123!');
    
    await page.click('button[type="submit"]');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/sign-in');
    
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'WrongPassword');
    
    await page.click('button[type="submit"]');
    
    // Check for error message
    await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
  });
});

