import { render, screen } from '@testing-library/react';
import JobDetailSidebar from '../JobDetailSidebar';
import { Job } from '@/types/job';

describe('JobDetailSidebar Component', () => {
  // Update the test job's location to use 'zip' instead of 'zipCode'
  const testJob: Job = {
    id: '1',
    title: 'Software Engineer',
    company_name: 'Test Corp',
    description: 'Test description',
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
    requirements: ['JavaScript', 'React'],
    posted_date: '2024-01-01',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  };

  it('renders the JobDetailSidebar component with job details', () => {
    render(<JobDetailSidebar job={testJob} />);

    // Check if job title is rendered
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();

    // Check if company name is rendered
    expect(screen.getByText('Test Corp')).toBeInTheDocument();

    // Check if location is rendered
    expect(screen.getByText('Jacksonville, FL')).toBeInTheDocument();
  });
});
