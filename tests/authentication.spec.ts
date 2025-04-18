
import { test, expect } from './helpers/setup';
import { createTestUser } from './helpers/auth';

test.describe('Authentication Flow', () => {
  test('user can sign up successfully', async ({ page }) => {
    const { email } = await createTestUser(page);
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText(email)).toBeVisible();
  });

  test('user can log in successfully', async ({ page }) => {
    await test.step('Login', async () => {
      await page.goto('/sign-in');
      await page.fill('input[name="email"]', 'testuser@example.com');
      await page.fill('input[name="password"]', 'ValidPassword123!');
      await page.click('button[type="submit"]');
    });
    
    await expect(page).toHaveURL('/dashboard');
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await test.step('Attempt login with invalid credentials', async () => {
      await page.goto('/sign-in');
      await page.fill('input[name="email"]', 'invalid@example.com');
      await page.fill('input[name="password"]', 'WrongPassword');
      await page.click('button[type="submit"]');
    });
    
    await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
  });

  test('forgot password flow shows success message', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.click('button:has-text("Reset Password")');
    
    await expect(page.getByText(/reset link sent/i)).toBeVisible();
  });

  test('password requirements are enforced', async ({ page }) => {
    await page.goto('/sign-up');
    await page.fill('input[name="password"]', 'weak');
    await page.click('button[type="submit"]');
    
    await expect(page.getByText(/password must be at least/i)).toBeVisible();
  });
});
