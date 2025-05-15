import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { JobDetailHeader } from '../JobDetailHeader';
import { Job } from '@/types/job';

const mockJob: Job = {
  id: "1",
  title: "Software Engineer",
  company: {
    name: "Tech Corp",
    logoUrl: "https://example.com/logo.png"
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
  requirements: ["Requirement 1", "Requirement 2"],
  experienceLevel: "entry-level",
  postedDate: "2025-04-18",
  isRemote: false,
  isFlexible: true
};

const testJob: Job = {
  id: "1",
  title: "Software Engineer",
  company: {
    name: "Tech Corp",
    logoUrl: "https://example.com/logo.png"
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
  requirements: ["Requirement 1", "Requirement 2"],
  experienceLevel: "entry-level",
  postedDate: "2025-04-18",
  isRemote: false,
  isFlexible: true
};

describe('JobDetailHeader', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <JobDetailHeader job={mockJob} />
      </BrowserRouter>
    );
  };

  it('renders company logo when provided', () => {
    renderHeader();
    const logo = screen.getByAltText(`${mockJob.company.name} logo`);
    expect(logo).toBeInTheDocument();
  });

  it('renders company initial when no logo provided', () => {
    const jobWithoutLogo = { ...mockJob, company: { ...mockJob.company, logoUrl: undefined } };
    render(
      <BrowserRouter>
        <JobDetailHeader job={jobWithoutLogo} />
      </BrowserRouter>
    );
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('displays job title and company name', () => {
    renderHeader();
    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company.name)).toBeInTheDocument();
  });
});
