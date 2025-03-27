
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { toast } from '@/components/ui/use-toast';
import PasswordResetTokenValidator from '../PasswordResetTokenValidator';

// Mock dependencies
vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('PasswordResetTokenValidator Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('handles valid token correctly', () => {
    const onError = vi.fn();

    render(
      <MemoryRouter initialEntries={['/reset-password#access_token=valid_token']}>
        <PasswordResetTokenValidator onError={onError} />
      </MemoryRouter>
    );

    // Check if toast was called with success message
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Reset link valid',
      })
    );
    expect(onError).not.toHaveBeenCalled();
  });

  test('handles expired token error', () => {
    // Mock location with expired token error
    render(
      <MemoryRouter initialEntries={['/reset-password#error=access_denied&error_description=Token+has+expired']}>
        <PasswordResetTokenValidator onError={vi.fn()} />
      </MemoryRouter>
    );

    // Check if toast was called with expired message
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Reset link expired',
        variant: 'destructive',
      })
    );
  });

  test('handles invalid request error', () => {
    render(
      <MemoryRouter initialEntries={['/reset-password#error=invalid_request&error_description=Invalid+request']}>
        <PasswordResetTokenValidator onError={vi.fn()} />
      </MemoryRouter>
    );

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Invalid request',
        variant: 'destructive',
      })
    );
  });

  test('handles server error', () => {
    render(
      <MemoryRouter initialEntries={['/reset-password#error=server_error&error_description=Server+error']}>
        <PasswordResetTokenValidator onError={vi.fn()} />
      </MemoryRouter>
    );

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Server error',
        variant: 'destructive',
      })
    );
  });

  test('handles missing token error', () => {
    render(
      <MemoryRouter initialEntries={['/reset-password']}>
        <PasswordResetTokenValidator onError={vi.fn()} />
      </MemoryRouter>
    );

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Invalid reset link',
        variant: 'destructive',
      })
    );
  });
});
