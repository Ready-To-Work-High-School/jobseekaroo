
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth/AuthProvider';
import JobApplicationFlow from '@/components/job/JobApplicationFlow';

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
  company: {
    name: 'Test Company',
    logoUrl: undefined
  },
  location: {
    city: 'Test City',
    state: 'Test State',
    zipCode: '12345'
  },
  type: 'full-time' as const,
  payRate: {
    min: 15,
    max: 25,
    period: 'hourly' as const
  },
  description: 'Test job description',
  requirements: ['Test requirement'],
  experienceLevel: 'entry-level' as const,
  postedDate: '2024-01-01',
  logoUrl: undefined,
  isRemote: false,
  isFlexible: true,
  applicationUrl: undefined,
  contactEmail: undefined
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
    renderWithProviders(<JobApplicationFlow job={mockJob} onClose={() => {}} />);
    expect(screen.getByText('Apply for Position')).toBeInTheDocument();
  });
});
