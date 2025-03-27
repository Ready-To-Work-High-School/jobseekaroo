
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { supabase } from '@/lib/supabase';
import ResetPassword from '@/pages/ResetPassword';

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

describe('ResetPassword Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
