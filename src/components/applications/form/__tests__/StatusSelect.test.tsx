
import { render, screen, fireEvent } from '@testing-library/react';
import { StatusSelect } from '../StatusSelect';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationFormSchema } from '../validation';
import { ApplicationStatus } from '@/types/application';

const TestWrapper = () => {
  const form = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      status: 'applied' as ApplicationStatus,
      job_title: '',
      company: '',
      applied_date: '',
      notes: '',
      contact_name: '',
      contact_email: '',
      next_step: '',
      next_step_date: '',
    }
  });

  return <StatusSelect form={form} />;
};

describe('StatusSelect', () => {
  it('renders with default status', () => {
    render(<TestWrapper />);
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('shows all status options', async () => {
    render(<TestWrapper />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    const statuses = ['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn'];
    statuses.forEach(status => {
      expect(screen.getByRole('option', { name: new RegExp(status, 'i') })).toBeInTheDocument();
    });
  });
});
