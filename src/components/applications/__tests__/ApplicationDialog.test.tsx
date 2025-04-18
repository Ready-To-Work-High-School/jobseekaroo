
import { render, screen, fireEvent } from '@testing-library/react';
import { ApplicationDialog } from '../ApplicationDialog';

describe('ApplicationDialog', () => {
  const mockOnOpenChange = vi.fn();
  const mockSetShowSavedJobs = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnOpenChange.mockClear();
    mockSetShowSavedJobs.mockClear();
    mockOnSuccess.mockClear();
  });

  it('renders dialog when open', () => {
    render(
      <ApplicationDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        showSavedJobs={false}
        setShowSavedJobs={mockSetShowSavedJobs}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Add New Application')).toBeInTheDocument();
  });

  it('shows saved jobs section when showSavedJobs is true', () => {
    render(
      <ApplicationDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        showSavedJobs={true}
        setShowSavedJobs={mockSetShowSavedJobs}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText('Select from saved jobs:')).toBeInTheDocument();
  });

  it('shows application form when showSavedJobs is false', () => {
    render(
      <ApplicationDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        showSavedJobs={false}
        setShowSavedJobs={mockSetShowSavedJobs}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText('Job Title')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });
});
