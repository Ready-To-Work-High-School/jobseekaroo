
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CalendlyEmbed from '../CalendlyEmbed';

// Mock the useScript hook
vi.mock('@/hooks/useScript', () => ({
  useScript: vi.fn()
}));

// Define the global Calendly type
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: Element | null }) => void;
    };
  }
}

describe('CalendlyEmbed', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
    
    // Clear any mock implementations
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    // Mock script loading state
    const { useScript } = require('@/hooks/useScript');
    vi.mocked(useScript).mockReturnValue('loading');

    render(<CalendlyEmbed />);
    
    const loadingSpinner = screen.getByTestId('calendly-loading');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    // Mock script error state
    const { useScript } = require('@/hooks/useScript');
    vi.mocked(useScript).mockReturnValue('error');

    render(<CalendlyEmbed />);
    
    const errorMessage = screen.getByText(/Failed to load scheduling widget/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders missing configuration state when no URL and no environment variable', () => {
    // Mock script ready state but no URL
    const { useScript } = require('@/hooks/useScript');
    vi.mocked(useScript).mockReturnValue('ready');
    
    // Mock empty environment variable
    const originalEnv = process.env;
    process.env = { ...originalEnv, CALENDLY_CLIENT_ID: undefined };
    
    render(<CalendlyEmbed />);
    
    const missingConfig = screen.getByTestId('calendly-missing-config');
    expect(missingConfig).toBeInTheDocument();
    
    // Restore environment
    process.env = originalEnv;
  });

  it('renders Calendly widget when script is ready', () => {
    // Mock global Calendly object
    global.window.Calendly = {
      initInlineWidget: vi.fn()
    };

    // Mock script ready state
    const { useScript } = require('@/hooks/useScript');
    vi.mocked(useScript).mockReturnValue('ready');
    
    // Mock environment variable
    const originalEnv = process.env;
    process.env = { ...originalEnv, CALENDLY_CLIENT_ID: 'test-id' };

    render(<CalendlyEmbed />);
    
    const calendlyWidget = screen.getByTestId('calendly-widget');
    expect(calendlyWidget).toBeInTheDocument();
    
    // Restore environment
    process.env = originalEnv;
  });

  it('uses custom URL when provided', () => {
    const customUrl = 'https://calendly.com/custom-url';
    
    // Mock global Calendly object
    global.window.Calendly = {
      initInlineWidget: vi.fn()
    };

    // Mock script ready state
    const { useScript } = require('@/hooks/useScript');
    vi.mocked(useScript).mockReturnValue('ready');

    render(<CalendlyEmbed url={customUrl} />);
    
    expect(global.window.Calendly.initInlineWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        url: customUrl
      })
    );
  });
});
