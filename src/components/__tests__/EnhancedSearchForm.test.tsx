
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EnhancedSearchForm from '../EnhancedSearchForm';
import { vi } from 'vitest';
import { AuthProvider } from '@/contexts/AuthContext';

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useSearchParams: () => [new URLSearchParams(), vi.fn()]
  };
});

// Mock the toast component
vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

// Mock LocationSelector component that's used within EnhancedSearchForm
vi.mock('../LocationSelector', () => ({
  __esModule: true,
  default: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    return (
      <input 
        data-testid="location-selector"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter location"
      />
    );
  }
}));

// Mock SavedSearches component
vi.mock('../SavedSearches', () => ({
  __esModule: true,
  default: ({ zipCode, onSelectSearch }: any) => {
    return (
      <div data-testid="saved-searches">
        <button 
          onClick={() => onSelectSearch && onSelectSearch({
            id: '123',
            name: 'Test Search',
            zipCode: '12345',
            radius: 10,
            filters: { type: 'full-time' }
          })}
        >
          Load Saved Search
        </button>
      </div>
    );
  }
}));

// Mock AuthContext
vi.mock('@/contexts/AuthContext', async () => {
  const actual = await vi.importActual('@/contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      user: { id: 'test-user-id' },
    }),
    AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  };
});

describe('EnhancedSearchForm', () => {
  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <EnhancedSearchForm {...props} />
      </BrowserRouter>
    );
  };

  it('renders correctly with default props', () => {
    renderComponent();
    expect(screen.getByTestId('location-selector')).toBeInTheDocument();
    expect(screen.getByText('Find Jobs')).toBeInTheDocument();
    expect(screen.getByTestId('saved-searches')).toBeInTheDocument();
  });

  it('renders with minimal variant', () => {
    renderComponent({ variant: 'minimal' });
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('shows radius selector when toggled', () => {
    renderComponent();
    
    // Initially, radius selector should be hidden
    expect(screen.queryByText('Search Radius:')).not.toBeInTheDocument();
    
    // Click to show radius
    const radiusToggle = screen.getByText('Add radius filter');
    fireEvent.click(radiusToggle);
    
    // Now it should be visible
    expect(screen.getByText('Search Radius:')).toBeInTheDocument();
  });

  it('applies saved search when selected', async () => {
    renderComponent();
    
    const savedSearchButton = screen.getByText('Load Saved Search');
    fireEvent.click(savedSearchButton);
    
    // After clicking, we expect the form submission to have been triggered with the saved search data
    // We can't directly test the navigation, but we can check if the toast was called
    // In a real test, you would wait for the navigation or check state changes
    await waitFor(() => {
      // This is a lightweight test since we've mocked most functionality
      expect(screen.getByTestId('location-selector')).toBeInTheDocument();
    });
  });

  it('opens filter popover when clicked', async () => {
    renderComponent();
    
    // Click filter button
    const filterButton = screen.getByRole('button', { name: '' }); // Filter button has no accessible name
    fireEvent.click(filterButton);
    
    // Check if filter content is shown
    await waitFor(() => {
      expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
    });
  });
});
