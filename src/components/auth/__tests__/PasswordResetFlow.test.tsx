
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import PasswordResetForm from '../PasswordResetForm';
import PasswordResetSuccess from '../PasswordResetSuccess';
import PasswordResetTokenValidator from '../PasswordResetTokenValidator';
import ResetPassword from '@/pages/ResetPassword';
import { AuthError, User } from '@supabase/supabase-js';

// Mock dependencies
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      updateUser: vi.fn(),
    },
  },
}));

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

describe('Password Reset Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('PasswordResetTokenValidator Component', () => {
    test('handles valid token correctly', () => {
      // Mock location with valid token
      const mockLocation = {
        hash: '#access_token=valid_token',
        pathname: '/reset-password',
        search: '',
      };

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

  describe('PasswordResetForm Component', () => {
    test('validates password requirements', async () => {
      const onSuccess = vi.fn();
      
      render(
        <BrowserRouter>
          <PasswordResetForm onSuccess={onSuccess} />
        </BrowserRouter>
      );

      // Try submitting with an empty form
      fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
      await waitFor(() => {
        expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
      });
      
      // Try a password that's too short
      fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'Short1' } });
      fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Short1' } });
      fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
      });
      
      // Try a password without uppercase
      fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/password must contain at least one uppercase letter/i)).toBeInTheDocument();
      });
      
      // Try with mismatched passwords
      fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'Password123' } });
      fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password456' } });
      fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
      });
    });

    test('submits valid form successfully', async () => {
      const onSuccess = vi.fn();
      // Fix the type issue - provide proper object with user property to match Supabase's expected return type
      vi.mocked(supabase.auth.updateUser).mockResolvedValue({ 
        data: { user: null }, 
        error: null 
      });
      
      render(
        <BrowserRouter>
          <PasswordResetForm onSuccess={onSuccess} />
        </BrowserRouter>
      );
      
      // Fill the form with valid data
      fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'Password123' } });
      fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123' } });
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
      
      // Check if updateUser was called with correct parameters
      await waitFor(() => {
        expect(supabase.auth.updateUser).toHaveBeenCalledWith({
          password: 'Password123'
        });
        expect(onSuccess).toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Password reset successful',
          })
        );
      });
    });

    test('handles error during password update', async () => {
      const onSuccess = vi.fn();
      
      // Create a properly mocked error by using a class-like structure
      const mockError = {
        message: 'Something went wrong',
        name: 'AuthError',
        status: 400,
        code: 'invalid_argument',
        // Remove the __isAuthError property as it's protected
      } as AuthError; // Cast to AuthError type
      
      // Mock the updateUser function with a proper return type
      vi.mocked(supabase.auth.updateUser).mockResolvedValue({ 
        data: { user: null }, 
        error: mockError 
      });
      
      render(
        <BrowserRouter>
          <PasswordResetForm onSuccess={onSuccess} />
        </BrowserRouter>
      );
      
      // Fill the form with valid data
      fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'Password123' } });
      fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123' } });
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
      
      // Check error handling
      await waitFor(() => {
        expect(supabase.auth.updateUser).toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith(
          expect.objectContaining({
            variant: 'destructive',
            title: 'Password reset failed',
          })
        );
      });
    });
  });

  describe('PasswordResetSuccess Component', () => {
    test('renders success message correctly', () => {
      render(<PasswordResetSuccess />);
      
      expect(screen.getByText(/your password has been reset successfully/i)).toBeInTheDocument();
    });
  });

  describe('ResetPassword Page', () => {
    test('renders the reset password page with form initially', () => {
      render(
        <MemoryRouter initialEntries={['/reset-password#access_token=valid_token']}>
          <ResetPassword />
        </MemoryRouter>
      );
      
      expect(screen.getByText(/reset your password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
    });
    
    test('displays success component after successful password reset', async () => {
      // Fix the type issue - provide proper object with user property
      vi.mocked(supabase.auth.updateUser).mockResolvedValue({ 
        data: { user: null }, 
        error: null 
      });
      
      render(
        <MemoryRouter initialEntries={['/reset-password#access_token=valid_token']}>
          <ResetPassword />
        </MemoryRouter>
      );
      
      // Fill and submit the form
      fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'Password123' } });
      fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123' } });
      fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
      
      // Check if success component is shown
      await waitFor(() => {
        expect(screen.getByText(/your password has been reset successfully/i)).toBeInTheDocument();
      });
    });
  });
});
