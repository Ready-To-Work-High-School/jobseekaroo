
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ApplicationList } from '../ApplicationList';
import { JobApplication } from '@/types/application';

describe('ApplicationList', () => {
  const mockApplications: JobApplication[] = [
    {
      id: '1',
      job_title: 'Software Engineer',
      company: 'Tech Corp',
      status: 'applied',
      applied_date: '2024-04-18',
      user_id: '123',
      job_id: 'job123',
      created_at: '2024-04-18',
      updated_at: '2024-04-18'
    }
  ];

  const mockOnUpdate = vi.fn();
  const mockOnAddFirst = vi.fn();

  beforeEach(() => {
    mockOnUpdate.mockClear();
    mockOnAddFirst.mockClear();
  });

  it('renders loading state', () => {
    render(
      <ApplicationList
        applications={[]}
        isLoading={true}
        onUpdate={mockOnUpdate}
        totalCount={0}
        onAddFirst={mockOnAddFirst}
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders empty state with no applications', () => {
    render(
      <ApplicationList
        applications={[]}
        isLoading={false}
        onUpdate={mockOnUpdate}
        totalCount={0}
        onAddFirst={mockOnAddFirst}
      />
    );

    expect(screen.getByText('No applications found')).toBeInTheDocument();
    expect(screen.getByText("You haven't added any job applications to track yet.")).toBeInTheDocument();
  });

  it('renders applications when data is available', () => {
    render(
      <ApplicationList
        applications={mockApplications}
        isLoading={false}
        onUpdate={mockOnUpdate}
        totalCount={1}
        onAddFirst={mockOnAddFirst}
      />
    );

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });
});
