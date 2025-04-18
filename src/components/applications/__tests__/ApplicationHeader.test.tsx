
import { render, screen, fireEvent } from '@testing-library/react';
import { ApplicationHeader } from '../ApplicationHeader';

describe('ApplicationHeader', () => {
  const mockOnAddClick = vi.fn();
  const mockOnRefreshClick = vi.fn();

  beforeEach(() => {
    mockOnAddClick.mockClear();
    mockOnRefreshClick.mockClear();
  });

  it('renders header text correctly', () => {
    render(
      <ApplicationHeader 
        onAddClick={mockOnAddClick}
        onRefreshClick={mockOnRefreshClick}
      />
    );

    expect(screen.getByText('Applications')).toBeInTheDocument();
    expect(screen.getByText('Track and manage your job applications')).toBeInTheDocument();
  });

  it('calls onAddClick when add button is clicked', () => {
    render(
      <ApplicationHeader 
        onAddClick={mockOnAddClick}
        onRefreshClick={mockOnRefreshClick}
      />
    );

    fireEvent.click(screen.getByText('Add Application'));
    expect(mockOnAddClick).toHaveBeenCalledTimes(1);
  });

  it('calls onRefreshClick when refresh button is clicked', () => {
    render(
      <ApplicationHeader 
        onAddClick={mockOnAddClick}
        onRefreshClick={mockOnRefreshClick}
      />
    );

    fireEvent.click(screen.getByText('Refresh'));
    expect(mockOnRefreshClick).toHaveBeenCalledTimes(1);
  });
});
