import { render, screen } from '@testing-library/react';
import { JobDetailDescription } from '../JobDetailDescription';
import { Job } from '@/types/job';

const testJob: Job = {
  id: "1",
  title: "Software Engineer",
  company: {
    name: "Tech Corp",
  },
  location: {
    city: 'Jacksonville',
    state: 'FL',
    zip: '32202'  // Changed from zipCode to zip
  },
  type: "full-time",
  payRate: {
    min: 20,
    max: 30,
    period: "hourly"
  },
  description: "Example job description",
  requirements: ["Bachelor's degree", "3+ years experience"],
  experienceLevel: "entry-level",
  postedDate: "2025-04-18",
  isRemote: false,
  isFlexible: true
};

describe('JobDetailDescription', () => {
  const renderDescription = () => {
    return render(<JobDetailDescription job={testJob} />);
  };

  it('renders job description', () => {
    renderDescription();
    expect(screen.getByText(testJob.description)).toBeInTheDocument();
  });

  it('displays all job requirements', () => {
    renderDescription();
    testJob.requirements.forEach(requirement => {
      expect(screen.getByText(requirement)).toBeInTheDocument();
    });
  });

  it('shows the high school student notice', () => {
    renderDescription();
    expect(screen.getByText(/This position is ideal for high school students/i)).toBeInTheDocument();
  });

  it('displays the how to apply section', () => {
    renderDescription();
    expect(screen.getByText('How to Apply')).toBeInTheDocument();
    expect(screen.getByText(/Interested in this position/i)).toBeInTheDocument();
  });
});
