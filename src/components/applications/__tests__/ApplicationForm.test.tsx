
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ApplicationForm from '../ApplicationForm';
import { Job } from '@/types/job';

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    createApplication: vi.fn().mockResolvedValue({}),
    user: { id: 'test-user-id' },
  }),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('ApplicationForm', () => {
  it('renders form fields correctly', () => {
    render(
      <ApplicationForm />
    );

    expect(screen.getByLabelText(/position title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/application date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/application status/i)).toBeInTheDocument();
  });

  it('pre-fills form when job data is provided', () => {
    render(
      <ApplicationForm
        jobTitle="Frontend Developer"
        companyName="Tech Company"
      />
    );

    expect(screen.getByDisplayValue('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tech Company')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(
      <ApplicationForm />
    );

    fireEvent.change(screen.getByLabelText(/position title/i), {
      target: { value: 'Test Job' },
    });
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: 'Test Company' },
    });

    fireEvent.click(screen.getByText('Track Application'));

    await waitFor(() => {
      expect(screen.getByText('Tracking...')).toBeInTheDocument();
    });
  });
});
