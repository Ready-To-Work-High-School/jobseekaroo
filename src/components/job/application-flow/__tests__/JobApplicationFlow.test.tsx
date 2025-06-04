
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth/AuthProvider';
import { JobApplicationFlow } from '../JobApplicationFlow';

// Mock the useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
    userProfile: null,
    createApplication: vi.fn(),
    getSavedJobs: vi.fn().mockResolvedValue([]),
  }),
}));

// Mock react-router-dom hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: 'test-job-id' }),
  };
});

const mockJob = {
  id: 'test-job-id',
  title: 'Test Job',
  company: { name: 'Test Company' },
  description: 'Test job description',
  location: 'Test Location',
  type: 'full-time' as const,
  salary_min: 50000,
  salary_max: 70000,
  posted_date: '2024-01-01',
  requirements: ['Test requirement'],
  benefits: ['Test benefit'],
  remote_friendly: false,
  category: 'technology'
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('JobApplicationFlow', () => {
  it('renders application flow', () => {
    renderWithProviders(<JobApplicationFlow job={mockJob} />);
    expect(screen.getByText('Apply for Test Job')).toBeInTheDocument();
  });
});
