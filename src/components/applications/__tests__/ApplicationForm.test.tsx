
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ApplicationForm } from '../ApplicationForm';
import { Job } from '@/types/job';

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    createApplication: vi.fn().mockResolvedValue({}),
  }),
}));

describe('ApplicationForm', () => {
  const mockOnCancel = vi.fn();
  const mockOnShowSavedJobs = vi.fn();
  const mockOnSuccess = vi.fn();
  const mockSetIsAdding = vi.fn();

  beforeEach(() => {
    mockOnCancel.mockClear();
    mockOnShowSavedJobs.mockClear();
    mockOnSuccess.mockClear();
    mockSetIsAdding.mockClear();
  });

  it('renders form fields correctly', () => {
    render(
      <ApplicationForm
        selectedJob={null}
        isAdding={false}
        setIsAdding={mockSetIsAdding}
        onCancel={mockOnCancel}
        onShowSavedJobs={mockOnShowSavedJobs}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/application date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('pre-fills form when selectedJob is provided', () => {
    const selectedJob: Partial<Job> = {
      id: '1',
      title: 'Frontend Developer',
      company: {
        name: 'Tech Company',
      },
      location: {
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
      },
      type: 'full-time',
      payRate: {
        min: 50000,
        max: 100000,
        period: 'monthly',
      },
      description: 'Job description',
      requirements: ['React', 'TypeScript'],
      experienceLevel: 'entry-level',
      postedDate: '2023-01-01',
      isRemote: false,
      isFlexible: true,
    };

    render(
      <ApplicationForm
        selectedJob={selectedJob as Job}
        isAdding={false}
        setIsAdding={mockSetIsAdding}
        onCancel={mockOnCancel}
        onShowSavedJobs={mockOnShowSavedJobs}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByDisplayValue('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tech Company')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(
      <ApplicationForm
        selectedJob={null}
        isAdding={false}
        setIsAdding={mockSetIsAdding}
        onCancel={mockOnCancel}
        onShowSavedJobs={mockOnShowSavedJobs}
        onSuccess={mockOnSuccess}
      />
    );

    fireEvent.change(screen.getByLabelText(/job title/i), {
      target: { value: 'Test Job' },
    });
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: 'Test Company' },
    });

    fireEvent.click(screen.getByText('Add Application'));

    await waitFor(() => {
      expect(mockSetIsAdding).toHaveBeenCalledWith(true);
    });
  });

  it('disables form submission while adding', () => {
    render(
      <ApplicationForm
        selectedJob={null}
        isAdding={true}
        setIsAdding={mockSetIsAdding}
        onCancel={mockOnCancel}
        onShowSavedJobs={mockOnShowSavedJobs}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText('Adding...')).toBeDisabled();
  });
});
