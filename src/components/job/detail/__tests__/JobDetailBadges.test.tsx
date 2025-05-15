import { render, screen } from '@testing-library/react';
import JobDetailBadges from '../JobDetailBadges';
import { Job } from '@/types/job';

describe('JobDetailBadges Component', () => {
  // Update the test job's location to use 'zip' instead of 'zipCode'
  const testJob: Job = {
    id: '1',
    title: 'Software Engineer',
    company_name: 'Tech Corp',
    description: 'Exciting software engineering role',
    job_type: 'full-time',
    experience_level: 'mid-level',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zip: '32202'  // Changed from zipCode to zip
    },
    is_remote: false,
    pay_rate_min: 80000,
    pay_rate_max: 120000,
    pay_rate_period: 'yearly',
    hours_per_week: 40,
    is_flexible: true,
    requirements: ['JavaScript', 'React', 'Node.js'],
    posted_date: '2024-01-20',
    created_at: '2024-01-20',
    updated_at: '2024-01-20',
  };

  it('renders all job detail badges correctly', () => {
    render(<JobDetailBadges job={testJob} />);

    expect(screen.getByText('full-time')).toBeInTheDocument();
    expect(screen.getByText('mid-level')).toBeInTheDocument();
    expect(screen.getByText('Jacksonville, FL')).toBeInTheDocument();
    expect(screen.getByText('$80000 - $120000/yearly')).toBeInTheDocument();
    expect(screen.getByText('40 hrs/week')).toBeInTheDocument();
    expect(screen.getByText('Flexible Schedule')).toBeInTheDocument();
  });

  it('renders remote badge when is_remote is true', () => {
    const remoteJob = { ...testJob, is_remote: true };
    render(<JobDetailBadges job={remoteJob} />);
    expect(screen.getByText('Remote')).toBeInTheDocument();
  });

  it('does not render experience level badge when experience_level is null', () => {
    const noExperienceJob = { ...testJob, experience_level: null };
    render(<JobDetailBadges job={noExperienceJob} />);
    const experienceBadge = screen.queryByText('no-experience');
    expect(experienceBadge).toBeNull();
  });
});
