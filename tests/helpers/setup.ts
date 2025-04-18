
import { test as base } from '@playwright/test';
import { loginAsTestUser } from './auth';

// Extend the base test to include common setup
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await loginAsTestUser(page);
    await use(page);
  }
});

export { expect } from '@playwright/test';
