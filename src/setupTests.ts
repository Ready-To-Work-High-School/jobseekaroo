
import '@testing-library/jest-dom';
import { expect, afterEach, vi, describe, it } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add the custom jest-dom matchers
expect.extend(matchers);

// Explicitly export Vitest globals to make them available to tests
declare global {
  // Extend global namespace to include Vitest functions
  export const expect: typeof import('vitest')['expect'];
  export const describe: typeof import('vitest')['describe'];
  export const it: typeof import('vitest')['it'];
  export const vi: typeof import('vitest')['vi'];
  export const beforeEach: typeof import('vitest')['beforeEach'];
  export const afterEach: typeof import('vitest')['afterEach'];
  export const beforeAll: typeof import('vitest')['beforeAll'];
  export const afterAll: typeof import('vitest')['afterAll'];
}

// Add missing properties from the window
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock IntersectionObserver
  class MockIntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }
    callback: IntersectionObserverCallback;
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  });
}

// Automatically unmount and cleanup DOM after each test
afterEach(() => {
  cleanup();
});

// Add additional mocks or setup for testing
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// This helps with animations
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.scrollTo = vi.fn();
