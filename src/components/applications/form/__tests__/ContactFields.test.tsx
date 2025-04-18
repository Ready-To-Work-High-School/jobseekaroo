
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactFields } from '../ContactFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationFormSchema } from '../validation';

const TestWrapper = () => {
  const form = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      contact_name: '',
      contact_email: ''
    }
  });

  return <ContactFields form={form} />;
};

describe('ContactFields', () => {
  it('renders contact name and email fields', () => {
    render(<TestWrapper />);
    expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact email/i)).toBeInTheDocument();
  });

  it('accepts input in contact fields', () => {
    render(<TestWrapper />);
    const nameInput = screen.getByLabelText(/contact name/i);
    const emailInput = screen.getByLabelText(/contact email/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
  });
});
