
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuth } from '@/hooks/useAuth';
import ApplicationForm from '../ApplicationForm';

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: {
      id: 'test-user',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2023-01-01T00:00:00.000Z',
      email: 'test@example.com',
      phone: null,
      confirmed_at: '2023-01-01T00:00:00.000Z',
      last_sign_in_at: '2023-01-01T00:00:00.000Z',
      role: 'authenticated',
      updated_at: '2023-01-01T00:00:00.000Z'
    },
    userProfile: null,
    session: null,
    isLoading: false,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    signInWithGoogle: vi.fn(),
    signInWithApple: vi.fn(),
    updateProfile: vi.fn(),
    refreshProfile: vi.fn(),
    getSavedJobs: vi.fn(),
    createApplication: vi.fn(),
    updateApplicationStatus: vi.fn(),
    deleteApplication: vi.fn(),
    saveJob: vi.fn(),
    unsaveJob: vi.fn(),
    isSavedJob: vi.fn(),
    getApplications: vi.fn(),
  })),
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
      user: {
        id: 'test-user',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: '2023-01-01T00:00:00.000Z',
        email: 'test@example.com',
        phone: null,
        confirmed_at: '2023-01-01T00:00:00.000Z',
        last_sign_in_at: '2023-01-01T00:00:00.000Z',
        role: 'authenticated',
        updated_at: '2023-01-01T00:00:00.000Z'
      },
      userProfile: null,
      session: null,
      isLoading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      signInWithGoogle: vi.fn(),
      signInWithApple: vi.fn(),
      updateProfile: vi.fn(),
      refreshProfile: vi.fn(),
      getSavedJobs: vi.fn(),
      createApplication: createApplicationMock,
      updateApplicationStatus: vi.fn(),
      deleteApplication: vi.fn(),
      saveJob: vi.fn(),
      unsaveJob: vi.fn(),
      isSavedJob: vi.fn(),
      getApplications: vi.fn(),
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
