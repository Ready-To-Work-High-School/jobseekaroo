
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ApplicationDialog from '../ApplicationDialog';

describe('ApplicationDialog', () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSuccess.mockClear();
  });

  it('renders dialog when open', () => {
    render(
      <ApplicationDialog
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Track Your Application')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ApplicationDialog
        open={false}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
