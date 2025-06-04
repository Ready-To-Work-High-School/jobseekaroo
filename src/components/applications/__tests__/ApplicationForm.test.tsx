import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ApplicationForm from '../ApplicationForm';

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'test-user' },
    createApplication: vi.fn(),
  }),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('ApplicationForm', () => {
  it('renders the form with default values', () => {
    render(<ApplicationForm />);
    expect(screen.getByLabelText('Position Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Company')).toBeInTheDocument();
    expect(screen.getByLabelText('Application Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Application Date')).toBeInTheDocument();
  });

  it('allows the user to fill out the form', () => {
    render(<ApplicationForm />);
    const positionInput = screen.getByLabelText('Position Title');
    const companyInput = screen.getByLabelText('Company');
    const notesTextarea = screen.getByLabelText('Notes');

    // Simulate user input
    fireEvent.change(positionInput, { target: { value: 'Software Engineer' } });
    fireEvent.change(companyInput, { target: { value: 'Tech Corp' } });
    fireEvent.change(notesTextarea, { target: { value: 'Excited about this opportunity!' } });

    expect(positionInput).toHaveValue('Software Engineer');
    expect(companyInput).toHaveValue('Tech Corp');
    expect(notesTextarea).toHaveValue('Excited about this opportunity!');
  });

  it('calls createApplication on submit', async () => {
    const createApplicationMock = vi.fn();
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'test-user' },
      createApplication: createApplicationMock,
    });

    render(<ApplicationForm jobId="123" jobTitle="Software Engineer" companyName="Tech Corp" />);
    const submitButton = screen.getByRole('button', { name: /Track Application/i });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Wait for the createApplication mock to be called
    await waitFor(() => {
      expect(createApplicationMock).toHaveBeenCalledTimes(1);
      expect(createApplicationMock).toHaveBeenCalledWith("123", expect.objectContaining({
        job_id: "123",
        job_title: "Software Engineer",
        company: "Tech Corp",
        status: "applied",
        applied_date: expect.any(String),
        notes: "",
        follow_up_date: undefined,
        priority: "medium"
      }));
    });
  });
});
