
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ApplicationFilters } from '../ApplicationFilters';

describe('ApplicationFilters', () => {
  const mockOnSearchChange = vi.fn();
  const mockOnTabChange = vi.fn();

  beforeEach(() => {
    mockOnSearchChange.mockClear();
    mockOnTabChange.mockClear();
  });

  it('renders search input and filters', () => {
    render(
      <ApplicationFilters
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        activeTab="all"
        onTabChange={mockOnTabChange}
      />
    );

    expect(screen.getByPlaceholderText('Search applications...')).toBeInTheDocument();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('updates search term on input change', () => {
    render(
      <ApplicationFilters
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        activeTab="all"
        onTabChange={mockOnTabChange}
      />
    );

    const input = screen.getByPlaceholderText('Search applications...');
    fireEvent.change(input, { target: { value: 'test search' } });
    expect(mockOnSearchChange).toHaveBeenCalled();
  });

  it('renders all status tabs', () => {
    render(
      <ApplicationFilters
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        activeTab="all"
        onTabChange={mockOnTabChange}
      />
    );

    expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /applied/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /interviewing/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /offered/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /accepted/i })).toBeInTheDocument();
  });
});
