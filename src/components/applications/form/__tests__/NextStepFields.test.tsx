
import { render, screen, fireEvent } from '@testing-library/react';
import { NextStepFields } from '../NextStepFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationFormSchema } from '../validation';

const TestWrapper = () => {
  const form = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      next_step: '',
      next_step_date: ''
    }
  });

  return <NextStepFields form={form} />;
};

describe('NextStepFields', () => {
  it('renders next step and date fields', () => {
    render(<TestWrapper />);
    expect(screen.getByLabelText(/next step/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next step date/i)).toBeInTheDocument();
  });

  it('accepts input in next step fields', () => {
    render(<TestWrapper />);
    const stepInput = screen.getByLabelText(/next step/i);
    const dateInput = screen.getByLabelText(/next step date/i);

    fireEvent.change(stepInput, { target: { value: 'Phone Interview' } });
    fireEvent.change(dateInput, { target: { value: '2025-04-20' } });

    expect(stepInput).toHaveValue('Phone Interview');
    expect(dateInput).toHaveValue('2025-04-20');
  });
});
