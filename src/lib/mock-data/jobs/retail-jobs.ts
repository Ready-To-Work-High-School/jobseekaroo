import { Job } from '../../../types/job';

export const retailJobs: Job[] = [
  {
    id: '1',
    title: 'Retail Sales Associate',
    company: {
      name: 'Jacksonville Electronics'
    },
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zip: '32256',
    },
    type: 'part-time',
    payRate: {
      min: 15,
      max: 18,
      period: 'hourly',
    },
    description: 'Join our dynamic retail team helping customers find the perfect electronics. Learn about cutting-edge technology while building valuable customer service and sales skills in a fun, supportive environment.',
    requirements: [
      'No prior experience required',
      'Interest in technology and electronics',
      'Strong communication skills',
      'Availability for weekend shifts',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-15',
    logoUrl: 'https://images.unsplash.com/photo-1563770660941-10b3dc965c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: true,
  },
  {
    id: '9',
    title: 'Hotel Front Desk Trainee',
    company: {
      name: 'Jacksonville Waterfront Hotel'
    },
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zip: '32202',
    },
    type: 'part-time',
    payRate: {
      min: 15,
      max: 17,
      period: 'hourly',
    },
    description: 'Entry-level position at our upscale hotel. Learn hospitality operations including check-in/out procedures, reservation management, and delivering exceptional guest service.',
    requirements: [
      'High school diploma',
      'Customer service aptitude',
      'Availability for evening and weekend shifts',
      'Professional appearance',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-08-28',
    logoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: true,
  },
];
