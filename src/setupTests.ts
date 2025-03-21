
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add the custom jest-dom matchers
expect.extend(matchers);

// Automatically unmount and cleanup DOM after each test
afterEach(() => {
  cleanup();
});
