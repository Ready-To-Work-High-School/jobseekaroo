
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import PasswordResetForm from '../PasswordResetForm';
import { AuthError } from '@supabase/supabase-js';

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

describe('PasswordResetForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
