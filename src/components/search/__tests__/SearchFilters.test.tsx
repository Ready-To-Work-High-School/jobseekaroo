
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilters from '../SearchFilters';
import { vi } from 'vitest';

describe('SearchFilters', () => {
  const defaultProps = {
    jobType: 'all' as const,
    setJobType: vi.fn(),
    experienceLevel: 'all' as const,
    setExperienceLevel: vi.fn(),
    isRemote: null,
    setIsRemote: vi.fn(),
    isFlexible: null,
    setIsFlexible: vi.fn(),
    onResetFilters: vi.fn(),
    onApplyFilters: vi.fn(),
  };

  it('renders all filter sections correctly', () => {
    render(<SearchFilters {...defaultProps} />);
    
    // Check headings
    expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
    expect(screen.getByText('Job Type')).toBeInTheDocument();
    expect(screen.getByText('Experience Level')).toBeInTheDocument();
    expect(screen.getByText('Job Features')).toBeInTheDocument();
    
    // Check specific options
    expect(screen.getByText('All Types')).toBeInTheDocument();
    expect(screen.getByText('Full Time')).toBeInTheDocument();
    expect(screen.getByText('Part Time')).toBeInTheDocument();
    expect(screen.getByText('Internship')).toBeInTheDocument();
    
    expect(screen.getByText('All Levels')).toBeInTheDocument();
    expect(screen.getByText('No Experience')).toBeInTheDocument();
    expect(screen.getByText('Entry Level')).toBeInTheDocument();
    
    expect(screen.getByText('Remote Work')).toBeInTheDocument();
    expect(screen.getByText('Flexible Schedule')).toBeInTheDocument();
    
    // Check buttons
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Apply Filters')).toBeInTheDocument();
  });

  it('renders sort options when sortBy prop is provided', () => {
    render(<SearchFilters {...defaultProps} sortBy="relevance" setSortBy={vi.fn()} />);
    expect(screen.getByText('Sort Results By')).toBeInTheDocument();
    expect(screen.getByText('Relevance')).toBeInTheDocument();
    expect(screen.getByText('Date Posted')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Distance')).toBeInTheDocument();
  });

  it('selects job type when clicked', () => {
    render(<SearchFilters {...defaultProps} />);
    fireEvent.click(screen.getByText('Full Time'));
    expect(defaultProps.setJobType).toHaveBeenCalledWith('full-time');
  });

  it('selects experience level when clicked', () => {
    render(<SearchFilters {...defaultProps} />);
    fireEvent.click(screen.getByText('Entry Level'));
    expect(defaultProps.setExperienceLevel).toHaveBeenCalledWith('entry-level');
  });

  it('toggles remote work checkbox', () => {
    render(<SearchFilters {...defaultProps} />);
    const remoteCheckbox = screen.getByLabelText('Remote Work');
    fireEvent.click(remoteCheckbox);
    expect(defaultProps.setIsRemote).toHaveBeenCalledWith(true);
  });

  it('calls onResetFilters when Reset button is clicked', () => {
    render(<SearchFilters {...defaultProps} />);
    fireEvent.click(screen.getByText('Reset'));
    expect(defaultProps.onResetFilters).toHaveBeenCalled();
  });

  it('calls onApplyFilters when Apply Filters button is clicked', () => {
    render(<SearchFilters {...defaultProps} />);
    fireEvent.click(screen.getByText('Apply Filters'));
    expect(defaultProps.onApplyFilters).toHaveBeenCalled();
  });
});
