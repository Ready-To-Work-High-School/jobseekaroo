
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EnhancedSearchForm from '../EnhancedSearchForm';
import { AuthProvider } from '@/contexts/auth/AuthProvider';

// Mock the auth context
const MockAuthProvider = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('EnhancedSearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  const renderWithAuth = (component: React.ReactElement) => {
    return render(
      <MockAuthProvider>
        {component}
      </MockAuthProvider>
    );
  };

  it('renders search form elements', () => {
    renderWithAuth(<EnhancedSearchForm onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search jobs...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Location')).toBeInTheDocument();
    expect(screen.getByText('Job Type')).toBeInTheDocument();
    expect(screen.getByText('Pay Range')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', () => {
    renderWithAuth(<EnhancedSearchForm onSearch={mockOnSearch} />);
    
    const searchButton = screen.getByRole('button', { name: /search jobs/i });
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith({
      query: '',
      location: '',
      jobType: '',
      payRange: '',
      experienceLevel: '',
    });
  });

  it('updates search query when typing', () => {
    renderWithAuth(<EnhancedSearchForm onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search jobs...');
    fireEvent.change(searchInput, { target: { value: 'software engineer' } });
    
    const searchButton = screen.getByRole('button', { name: /search jobs/i });
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith({
      query: 'software engineer',
      location: '',
      jobType: '',
      payRange: '',
      experienceLevel: '',
    });
  });

  it('shows loading state when isLoading is true', () => {
    renderWithAuth(<EnhancedSearchForm onSearch={mockOnSearch} isLoading={true} />);
    
    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  it('updates location when typing', () => {
    renderWithAuth(<EnhancedSearchForm onSearch={mockOnSearch} />);
    
    const locationInput = screen.getByPlaceholderText('Location');
    fireEvent.change(locationInput, { target: { value: 'New York' } });
    
    const searchButton = screen.getByRole('button', { name: /search jobs/i });
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith({
      query: '',
      location: 'New York',
      jobType: '',
      payRange: '',
      experienceLevel: '',
    });
  });
});
