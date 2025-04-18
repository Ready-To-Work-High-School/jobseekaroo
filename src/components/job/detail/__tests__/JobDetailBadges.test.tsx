
import { render, screen } from '@testing-library/react';
import { JobDetailBadges } from '../JobDetailBadges';
import { Job } from '@/types/job';

const mockJob: Job = {
  id: "1",
  title: "Software Engineer",
  company: {
    name: "Tech Corp",
  },
  location: {
    city: "San Francisco",
    state: "CA",
    zipCode: "94105"
  },
  type: "full-time",
  payRate: {
    min: 20,
    max: 30,
    period: "hourly"
  },
  description: "Example job description",
  requirements: ["Requirement 1"],
  experienceLevel: "entry-level",
  postedDate: "2025-04-18",
  isRemote: true,
  isFlexible: true
};

const formatPayRange = (min: number, max: number, period: string) => {
  return `$${min}-$${max} ${period}`;
};

describe('JobDetailBadges', () => {
  it('renders location badge', () => {
    render(<JobDetailBadges job={mockJob} formatPayRange={formatPayRange} />);
    expect(screen.getByText(`${mockJob.location.city}, ${mockJob.location.state} ${mockJob.location.zipCode}`)).toBeInTheDocument();
  });

  it('renders pay range badge', () => {
    render(<JobDetailBadges job={mockJob} formatPayRange={formatPayRange} />);
    expect(screen.getByText(`$20-$30 hourly`)).toBeInTheDocument();
  });

  it('renders job type badge', () => {
    render(<JobDetailBadges job={mockJob} formatPayRange={formatPayRange} />);
    expect(screen.getByText('Full Time')).toBeInTheDocument();
  });

  it('shows remote badge when job is remote', () => {
    render(<JobDetailBadges job={mockJob} formatPayRange={formatPayRange} />);
    expect(screen.getByText('Remote')).toBeInTheDocument();
  });

  it('shows flexible schedule badge when job is flexible', () => {
    render(<JobDetailBadges job={mockJob} formatPayRange={formatPayRange} />);
    expect(screen.getByText('Flexible Schedule')).toBeInTheDocument();
  });
});
