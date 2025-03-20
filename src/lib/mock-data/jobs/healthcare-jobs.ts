
import { Job } from '../../../types/job';

export const healthcareJobs: Job[] = [
  {
    id: '4',
    title: 'Healthcare Receptionist',
    company: 'Jacksonville Medical Center',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32216',
    },
    type: 'full-time',
    payRate: {
      min: 16,
      max: 18,
      period: 'hourly',
    },
    description: 'Join our healthcare team as a front desk receptionist, welcoming patients, scheduling appointments, and handling basic administrative duties in a fast-paced medical environment.',
    requirements: [
      'High school diploma required',
      'Customer service experience preferred but not required',
      'Excellent communication and interpersonal skills',
      'Basic computer proficiency',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-08',
    logoUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: false,
  },
  {
    id: '6',
    title: 'Veterinary Assistant Trainee',
    company: 'Jacksonville Animal Care',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32225',
    },
    type: 'part-time',
    payRate: {
      min: 15,
      max: 18,
      period: 'hourly',
    },
    description: 'Learn to assist veterinarians with animal care in our entry-level position. Help with patient handling, exam room preparation, and basic medical support under supervision.',
    requirements: [
      'High school diploma',
      'Love of animals',
      'Able to work in fast-paced environment',
      'Willingness to learn veterinary procedures',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-03',
    logoUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: true,
  },
];
