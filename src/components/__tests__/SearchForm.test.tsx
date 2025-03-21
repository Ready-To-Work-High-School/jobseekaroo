
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchForm from '../SearchForm';
import { vi } from 'vitest';

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

describe('SearchForm', () => {
  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <SearchForm {...props} />
      </BrowserRouter>
    );
  };

  it('renders correctly with default props', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Enter ZIP code')).toBeInTheDocument();
    expect(screen.getByText('Find Jobs')).toBeInTheDocument();
  });

  it('renders with minimal variant', () => {
    renderComponent({ variant: 'minimal' });
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('shows validation error for invalid ZIP code', async () => {
    renderComponent();
    const zipInput = screen.getByPlaceholderText('Enter ZIP code');
    
    // Enter invalid ZIP code
    fireEvent.change(zipInput, { target: { value: '123' } });
    
    // Click submit button
    const submitButton = screen.getByText('Find Jobs');
    fireEvent.click(submitButton);
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid 5-digit ZIP code')).toBeInTheDocument();
    });
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
    
    // Toggle it off
    const removeRadius = screen.getByText('Remove radius');
    fireEvent.click(removeRadius);
    
    // Should be hidden again
    expect(screen.queryByText('Search Radius:')).not.toBeInTheDocument();
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
