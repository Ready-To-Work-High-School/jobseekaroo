
import { Page } from '@playwright/test';

export const loginAsTestUser = async (page: Page) => {
  await page.goto('/sign-in');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="password"]', 'ValidPassword123!');
  await page.click('button[type="submit"]');
  
  // Wait for dashboard redirect to ensure login is complete
  await page.waitForURL('/dashboard');
};

export const createTestUser = async (page: Page) => {
  await page.goto('/sign-up');
  const uniqueEmail = `test-${Date.now()}@example.com`;
  
  await page.fill('input[name="firstName"]', 'Test');
  await page.fill('input[name="lastName"]', 'User');
  await page.fill('input[name="email"]', uniqueEmail);
  await page.fill('input[name="password"]', 'ValidPassword123!');
  await page.check('input[name="agreeToTerms"]');
  
  await page.click('button[type="submit"]');
  
  return { email: uniqueEmail, password: 'ValidPassword123!' };
};
