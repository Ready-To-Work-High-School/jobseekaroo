
import { render, screen, fireEvent } from '@testing-library/react';
import SortByFilter from '../SortByFilter';
import { vi } from 'vitest';

describe('SortByFilter', () => {
  const mockSetSortBy = vi.fn();
  
  beforeEach(() => {
    mockSetSortBy.mockClear();
  });

  it('renders correctly with all sort options', () => {
    render(<SortByFilter sortBy="relevance" setSortBy={mockSetSortBy} />);
    
    expect(screen.getByText('Sort Results By')).toBeInTheDocument();
    expect(screen.getByText('Relevance')).toBeInTheDocument();
    expect(screen.getByText('Date Posted')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Distance')).toBeInTheDocument();
  });

  it('highlights the selected sort option', () => {
    render(<SortByFilter sortBy="date" setSortBy={mockSetSortBy} />);
    
    // The "Date Posted" button should have the default variant (highlighted)
    const dateButton = screen.getByText('Date Posted').closest('button');
    expect(dateButton).toHaveClass('bg-primary');
    
    // The other buttons should have the outline variant (not highlighted)
    const relevanceButton = screen.getByText('Relevance').closest('button');
    expect(relevanceButton).not.toHaveClass('bg-primary');
  });

  it('calls setSortBy when a sort option is clicked', () => {
    render(<SortByFilter sortBy="relevance" setSortBy={mockSetSortBy} />);
    
    fireEvent.click(screen.getByText('Date Posted'));
    expect(mockSetSortBy).toHaveBeenCalledWith('date');
    
    fireEvent.click(screen.getByText('Salary'));
    expect(mockSetSortBy).toHaveBeenCalledWith('salary');
    
    fireEvent.click(screen.getByText('Distance'));
    expect(mockSetSortBy).toHaveBeenCalledWith('distance');
    
    fireEvent.click(screen.getByText('Relevance'));
    expect(mockSetSortBy).toHaveBeenCalledWith('relevance');
  });
});
