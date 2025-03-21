
import { Job } from '../../../types/job';

export const tradeJobs: Job[] = [
  {
    id: '5',
    title: 'Electrical Apprentice',
    company: {
      name: 'Jacksonville Electric'
    },
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32207',
    },
    type: 'apprenticeship',
    payRate: {
      min: 17,
      max: 21,
      period: 'hourly',
    },
    description: 'Paid apprenticeship program to learn the electrical trade under experienced professionals. Gain hands-on skills in residential and commercial electrical installation and repair.',
    requirements: [
      'High school diploma or GED',
      'Reliable transportation',
      'Physical ability to lift 50+ pounds',
      'Interest in electrical work and willingness to learn',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-05',
    logoUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: false,
    isFeatured: true,
  },
  {
    id: '8',
    title: 'Carpentry Apprentice',
    company: {
      name: 'Jacksonville Builders'
    },
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32254',
    },
    type: 'apprenticeship',
    payRate: {
      min: 16,
      max: 20,
      period: 'hourly',
    },
    description: 'Learn the carpentry trade from the ground up in our structured apprenticeship program. Gain skills in woodworking, construction, and finishing while earning a competitive wage.',
    requirements: [
      'High school diploma or equivalent',
      'Valid driver\'s license',
      'Ability to lift 50+ pounds',
      'Reliable transportation to job sites',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-01',
    logoUrl: 'https://images.unsplash.com/photo-1598521145507-ea8659fd087a?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: false,
  },
  {
    id: '10',
    title: 'HVAC Apprentice',
    company: {
      name: 'Cool Air Solutions'
    },
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32246',
    },
    type: 'apprenticeship',
    payRate: {
      min: 17,
      max: 22,
      period: 'hourly',
    },
    description: 'Join our paid apprenticeship program to learn HVAC installation, maintenance, and repair. Work alongside experienced technicians in residential and commercial settings.',
    requirements: [
      'High school diploma or GED',
      'Valid driver\'s license',
      'Basic mechanical aptitude',
      'Ability to work in various weather conditions',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-08-25',
    logoUrl: 'https://images.unsplash.com/photo-1680595382543-0741ac55a054?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: false,
  },
];
