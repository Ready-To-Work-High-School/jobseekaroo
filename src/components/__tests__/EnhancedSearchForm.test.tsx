
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import EnhancedSearchForm from '../EnhancedSearchForm';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth/AuthProvider';

// Mock the useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    userProfile: null,
  }),
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
    }),
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('EnhancedSearchForm', () => {
  it('renders search input', () => {
    renderWithProviders(<EnhancedSearchForm />);
    expect(screen.getByPlaceholderText(/search for jobs/i)).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    renderWithProviders(<EnhancedSearchForm />);
    const searchInput = screen.getByPlaceholderText(/search for jobs/i);
    
    fireEvent.change(searchInput, { target: { value: 'developer' } });
    expect(searchInput).toHaveValue('developer');
  });
});
