
import { render, screen, fireEvent } from '@testing-library/react';
import FilterActions from '../FilterActions';
import { vi } from 'vitest';

describe('FilterActions', () => {
  const mockOnResetFilters = vi.fn();
  const mockOnApplyFilters = vi.fn();
  
  beforeEach(() => {
    mockOnResetFilters.mockClear();
    mockOnApplyFilters.mockClear();
  });

  it('renders Reset and Apply Filters buttons', () => {
    render(
      <FilterActions 
        onResetFilters={mockOnResetFilters} 
        onApplyFilters={mockOnApplyFilters} 
      />
    );
    
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Apply Filters')).toBeInTheDocument();
  });

  it('calls onResetFilters when Reset button is clicked', () => {
    render(
      <FilterActions 
        onResetFilters={mockOnResetFilters} 
        onApplyFilters={mockOnApplyFilters} 
      />
    );
    
    fireEvent.click(screen.getByText('Reset'));
    expect(mockOnResetFilters).toHaveBeenCalledTimes(1);
  });

  it('calls onApplyFilters when Apply Filters button is clicked', () => {
    render(
      <FilterActions 
        onResetFilters={mockOnResetFilters} 
        onApplyFilters={mockOnApplyFilters} 
      />
    );
    
    fireEvent.click(screen.getByText('Apply Filters'));
    expect(mockOnApplyFilters).toHaveBeenCalledTimes(1);
  });

  it('renders buttons with correct styling', () => {
    render(
      <FilterActions 
        onResetFilters={mockOnResetFilters} 
        onApplyFilters={mockOnApplyFilters} 
      />
    );
    
    const resetButton = screen.getByText('Reset').closest('button');
    expect(resetButton).toHaveClass('variant-ghost');
    
    const applyButton = screen.getByText('Apply Filters').closest('button');
    expect(applyButton).not.toHaveClass('variant-ghost');
  });
});
