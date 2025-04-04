
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
      setSession: vi.fn(),
      signOut: vi.fn(),
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
    useLocation: () => ({
      hash: '#access_token=valid_token',
    }),
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
    // Mock the necessary functions
    vi.mocked(supabase.auth.setSession).mockResolvedValue({ 
      data: { session: null, user: null }, 
      error: null 
    });
    vi.mocked(supabase.auth.updateUser).mockResolvedValue({ 
      data: { user: null }, 
      error: null 
    });
    vi.mocked(supabase.auth.signOut).mockResolvedValue({
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
    
    // Check if all the functions were called in order
    await waitFor(() => {
      expect(supabase.auth.setSession).toHaveBeenCalledWith({
        access_token: 'valid_token',
        refresh_token: '',
      });
      expect(supabase.auth.updateUser).toHaveBeenCalledWith({
        password: 'Password123'
      });
      expect(onSuccess).toHaveBeenCalled();
      expect(supabase.auth.signOut).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Password reset successful',
        })
      );
    });
  });

  test('handles error during password update', async () => {
    const onSuccess = vi.fn();
    
    // Mock setSession success
    vi.mocked(supabase.auth.setSession).mockResolvedValue({ 
      data: { session: null, user: null }, 
      error: null 
    });
    
    // Mock updateUser failure
    const mockError = {
      message: 'Something went wrong',
      name: 'AuthError',
      status: 400,
      code: 'invalid_argument',
    } as AuthError;
    
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
      expect(supabase.auth.setSession).toHaveBeenCalled();
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
