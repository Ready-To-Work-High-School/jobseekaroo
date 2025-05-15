import { Job } from '../../../types/job';

export const techJobs: Job[] = [
  {
    id: '2',
    title: 'IT Help Desk Apprentice',
    company: {
      name: 'TechSolutions Jacksonville'
    },
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zip: '32202'  // Changed from zipCode to zip
    },
    type: 'apprenticeship',
    payRate: {
      min: 16,
      max: 19,
      period: 'hourly',
    },
    description: 'Exciting opportunity to start your IT career with our structured apprenticeship program. Learn technical support, troubleshooting, and customer service skills while earning.',
    requirements: [
      'High school diploma or equivalent',
      'Basic computer knowledge',
      'Eagerness to learn IT concepts',
      'Strong problem-solving abilities',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-10',
    logoUrl: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: false,
    isFeatured: true,
  },
];
