
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ApplicationForm from '../ApplicationForm';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock the auth context and toast hooks
vi.mock('@/contexts/auth/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn(),
}));

describe('ApplicationForm', () => {
  const mockCreateApplication = vi.fn();
  const mockToast = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    (useAuth as any).mockReturnValue({
      user: { id: 'test-user' },
      userProfile: { first_name: 'Test', last_name: 'User' },
      createApplication: mockCreateApplication,
    });
    
    (useToast as any).mockReturnValue({
      toast: mockToast,
    });
  });
  
  it('renders form fields correctly', () => {
    render(
      <BrowserRouter>
        <ApplicationForm
          jobId="test-job"
          jobTitle="Test Job"
          companyName="Test Company"
          isAdding={true}
          onCancel={() => {}}
          onSuccess={() => {}}
          onShowSavedJobs={() => {}}
          setIsAdding={() => {}}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/cover letter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/availability/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/how did you hear/i)).toBeInTheDocument();
    expect(screen.getByText(/submit application/i)).toBeInTheDocument();
  });
  
  it('shows login message when user is not authenticated', () => {
    (useAuth as any).mockReturnValue({
      user: null,
      createApplication: mockCreateApplication,
    });
    
    render(
      <BrowserRouter>
        <ApplicationForm
          jobId="test-job"
          jobTitle="Test Job"
          companyName="Test Company"
          isAdding={true}
          onCancel={() => {}}
          onSuccess={() => {}}
          onShowSavedJobs={() => {}}
          setIsAdding={() => {}}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/please sign in to apply for jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });
  
  it('submits the form with correct data', async () => {
    render(
      <BrowserRouter>
        <ApplicationForm
          jobId="test-job"
          jobTitle="Test Job"
          companyName="Test Company"
          isAdding={true}
          onCancel={() => {}}
          onSuccess={() => {}}
          onShowSavedJobs={() => {}}
          setIsAdding={() => {}}
          selectedJob={{
            id: 'test-job',
            title: 'Test Job',
            company: { name: 'Test Company' },
            location: { city: 'Test City', state: 'TS', zip: '12345' },
            payRate: { min: 15, max: 20, period: 'hourly' },
            type: 'full-time',
            experienceLevel: 'entry-level',
            description: 'Test job description',
            requirements: ['Requirement 1', 'Requirement 2'],
            postedDate: '2023-05-15',
            created_at: '2023-05-15',
            updated_at: '2023-05-15'
          }}
        />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText(/cover letter/i), {
      target: { value: 'This is my application' },
    });
    
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '123-456-7890' },
    });
    
    fireEvent.change(screen.getByLabelText(/availability/i), {
      target: { value: 'Available weekdays' },
    });
    
    fireEvent.change(screen.getByLabelText(/how did you hear/i), {
      target: { value: 'School counselor' },
    });
    
    fireEvent.click(screen.getByText(/submit application/i));
    
    await waitFor(() => {
      expect(mockCreateApplication).toHaveBeenCalledWith({
        job_id: 'test-job',
        job_title: 'Test Job',
        company: 'Test Company',
        status: 'applied',
        applied_date: expect.any(String),
        notes: 'This is my application',
        contact_name: '',
        contact_email: '',
      });
      
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Application submitted!',
        description: expect.stringContaining('Test Job'),
      });
    });
  });
});
