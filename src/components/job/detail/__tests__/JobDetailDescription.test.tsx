
import { render, screen } from '@testing-library/react';
import { JobDetailDescription } from '../JobDetailDescription';
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
  requirements: ["Bachelor's degree", "3+ years experience"],
  experienceLevel: "entry-level",
  postedDate: "2025-04-18",
  isRemote: false,
  isFlexible: true
};

describe('JobDetailDescription', () => {
  const renderDescription = () => {
    return render(<JobDetailDescription job={mockJob} />);
  };

  it('renders job description', () => {
    renderDescription();
    expect(screen.getByText(mockJob.description)).toBeInTheDocument();
  });

  it('displays all job requirements', () => {
    renderDescription();
    mockJob.requirements.forEach(requirement => {
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
