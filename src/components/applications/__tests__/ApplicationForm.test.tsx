import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ApplicationForm from '../ApplicationForm';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { JobApplication } from '@/types/application';

const mockApplication: JobApplication = {
  id: '1',
  job_id: '123',
  user_id: '456',
  job_title: 'Software Engineer',
  company: 'Tech Corp',
  status: 'applied',
  applied_date: '2024-01-01',
  contact_name: 'John Doe',
  contact_email: 'john.doe@example.com',
  next_step: 'Interview',
  next_step_date: '2024-01-15',
  notes: 'Follow up after the interview',
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
};

describe('ApplicationForm', () => {
  it('renders the form with initial values', () => {
    render(
      <AuthProvider>
        <ApplicationForm application={mockApplication} onSubmit={() => {}} />
      </AuthProvider>
    );

    expect(screen.getByLabelText('Job Title')).toHaveValue(mockApplication.job_title);
    expect(screen.getByLabelText('Company')).toHaveValue(mockApplication.company);
    expect(screen.getByLabelText('Applied Date')).toHaveValue(mockApplication.applied_date);
    expect(screen.getByLabelText('Contact Name')).toHaveValue(mockApplication.contact_name || '');
    expect(screen.getByLabelText('Contact Email')).toHaveValue(mockApplication.contact_email || '');
    expect(screen.getByLabelText('Next Step')).toHaveValue(mockApplication.next_step || '');
    expect(screen.getByLabelText('Notes')).toHaveValue(mockApplication.notes || '');
  });

  it('calls onSubmit with the correct values when the form is submitted', async () => {
    const onSubmit = jest.fn();
    render(
      <AuthProvider>
        <ApplicationForm application={mockApplication} onSubmit={onSubmit} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText('Job Title'), { target: { value: 'Senior Software Engineer' } });
    fireEvent.change(screen.getByLabelText('Company'), { target: { value: 'New Tech Corp' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        job_title: 'Senior Software Engineer',
        company: 'New Tech Corp',
        applied_date: '2024-01-01',
        contact_name: 'John Doe',
        contact_email: 'john.doe@example.com',
        next_step: 'Interview',
        next_step_date: '2024-01-15',
        notes: 'Follow up after the interview',
        status: 'applied',
        job_id: '123',
      });
    });
  });
});
