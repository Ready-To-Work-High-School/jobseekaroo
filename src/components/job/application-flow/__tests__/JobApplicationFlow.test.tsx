
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobApplicationFlow from '../../JobApplicationFlow';
import { AuthProvider } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Job } from '@/types/job';

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

// Mock useAuth hook
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    user: { id: 'test-user-id', email: 'test@example.com' },
    createApplication: vi.fn().mockResolvedValue({}),
    getApplications: vi.fn().mockResolvedValue([])
  })),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn()
}));

const mockJob: Job = {
  id: 'test-job-1',
  title: 'Test Job',
  company: {
    name: 'Test Company',
    logoUrl: '/test-logo.png'
  },
  location: {
    city: 'Test City',
    state: 'TS',
    zipCode: '12345'
  },
  description: 'This is a test job description',
  payRate: {
    min: 15,
    max: 25,
    period: 'hourly'
  },
  requirements: ['Test requirement 1', 'Test requirement 2'],
  postedDate: '2023-01-01',
  expiresDate: '2023-12-31',
  type: 'full-time',
  isRemote: true,
  isFlexible: true,
  benefits: ['Health Insurance', 'Paid Time Off'],
  experienceLevel: 'entry-level',
  skills: ['Test Skill 1', 'Test Skill 2'],
  applicationUrl: 'https://example.com/apply',
  contactEmail: 'hr@example.com'
};

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <JobApplicationFlow 
        job={mockJob}
        onClose={vi.fn()}
      />
    </BrowserRouter>
  );
};

describe('JobApplicationFlow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the job application flow with step 1 initially', () => {
    renderComponent();
    
    // Check that the dialog title is present
    expect(screen.getByText('Apply for Position')).toBeInTheDocument();
    
    // Check that step 1 content is visible
    expect(screen.getByText('Job Overview')).toBeInTheDocument();
    
    // Check that the progress bar shows step 1 of 3
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('navigates to step 2 when Next button is clicked', async () => {
    renderComponent();
    
    // Click the Next button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    // Check that we moved to step 2
    await waitFor(() => {
      expect(screen.getByText('Confirm Your Details')).toBeInTheDocument();
    });
    
    // Check that the progress updates
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  });

  it('allows navigation back to the previous step', async () => {
    renderComponent();
    
    // Go to step 2
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Confirm Your Details')).toBeInTheDocument());
    
    // Go back to step 1
    fireEvent.click(screen.getByText('Back'));
    await waitFor(() => expect(screen.getByText('Job Overview')).toBeInTheDocument());
  });
  
  it('navigates through all steps to completion and submits application', async () => {
    renderComponent();
    
    // Go to step 2
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Confirm Your Details')).toBeInTheDocument());
    
    // Go to step 3
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Submit Your Application')).toBeInTheDocument());
    
    // Submit the application
    const submitButton = screen.getByText('Submit Application');
    fireEvent.click(submitButton);
    
    // Check that the success toast was shown
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Application submitted successfully!");
    });
    
    // Check that we see the completion screen
    await waitFor(() => {
      expect(screen.getByText('Application Submitted!')).toBeInTheDocument();
    });
  });
  
  it('renders the completion screen with the correct job info', async () => {
    renderComponent();
    
    // Go through all steps
    fireEvent.click(screen.getByText('Next')); // Step 1 -> 2
    await waitFor(() => expect(screen.getByText('Confirm Your Details')).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Next')); // Step 2 -> 3
    await waitFor(() => expect(screen.getByText('Submit Your Application')).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Submit Application')); // Submit
    
    // Check the completion screen has the job title and company
    await waitFor(() => {
      expect(screen.getByText(/Test Job/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Company/i)).toBeInTheDocument();
      expect(screen.getByText('Application Submitted!')).toBeInTheDocument();
    });
  });
});
