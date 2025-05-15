
import { Job } from '../../../types/job';

export const officeJobs: Job[] = [
  {
    id: '3',
    title: 'Office Assistant',
    company: {
      name: 'River City Legal'
    },
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32202',
    },
    type: 'part-time',
    payRate: {
      min: 15,
      max: 17,
      period: 'hourly',
    },
    description: 'Entry-level position supporting our legal office with administrative tasks, filing, client communication, and basic data entry. Great opportunity to learn about the legal field.',
    requirements: [
      'High school diploma or equivalent',
      'Basic computer skills',
      'Professional demeanor',
      'Detail-oriented mindset',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-12',
    logoUrl: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: true,
  },
  {
    id: '7',
    title: 'Banking Associate Trainee',
    company: {
      name: 'First Jacksonville Bank'
    },
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32202',
    },
    type: 'full-time',
    payRate: {
      min: 17,
      max: 19,
      period: 'hourly',
    },
    description: 'Start your career in financial services. This entry-level position provides comprehensive training in customer service, banking products, and financial transactions.',
    requirements: [
      'High school diploma required',
      'Basic math skills',
      'Professional appearance',
      'Strong customer service orientation',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-02',
    logoUrl: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: false,
  },
];
