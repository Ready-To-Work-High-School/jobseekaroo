
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { JobDetailSidebar } from '../JobDetailSidebar';
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
  isRemote: false,
  isFlexible: true
};

const formatDate = (date: string) => new Date(date).toLocaleDateString();
const formatPayRange = (min: number, max: number, period: string) => `$${min}-$${max} ${period}`;

describe('JobDetailSidebar', () => {
  const renderSidebar = () => {
    return render(
      <BrowserRouter>
        <JobDetailSidebar 
          job={mockJob} 
          formatDate={formatDate}
          formatPayRange={formatPayRange}
        />
      </BrowserRouter>
    );
  };

  it('renders job details section', () => {
    renderSidebar();
    expect(screen.getByText('Job Details')).toBeInTheDocument();
  });

  it('displays company name', () => {
    renderSidebar();
    expect(screen.getByText(mockJob.company.name)).toBeInTheDocument();
  });

  it('shows formatted posted date', () => {
    renderSidebar();
    const formattedDate = formatDate(mockJob.postedDate);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('displays experience level', () => {
    renderSidebar();
    expect(screen.getByText('Entry Level')).toBeInTheDocument();
  });

  it('shows formatted pay rate', () => {
    renderSidebar();
    expect(screen.getByText('$20-$30 hourly')).toBeInTheDocument();
  });

  it('renders tips section', () => {
    renderSidebar();
    expect(screen.getByText('Tips for Applicants')).toBeInTheDocument();
    expect(screen.getByText('View More Resources')).toBeInTheDocument();
  });
});
