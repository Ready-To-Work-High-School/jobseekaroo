
import { JobType, ExperienceLevel } from '@/types/job';

// Job Types
export const JOB_TYPES: JobType[] = [
  'full-time',
  'part-time',
  'internship',
  'contract',
  'temporary',
  'volunteer',
  'apprenticeship'
];

// Experience Levels
export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'entry-level',
  'mid-level',
  'senior-level',
  'manager',
  'executive'
];

// Job Categories
export const categories = [
  { label: 'All Categories', value: '' },
  { label: 'Technology', value: 'technology' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Education', value: 'education' },
  { label: 'Business', value: 'business' },
  { label: 'Retail', value: 'retail' },
  { label: 'Customer Service', value: 'customer-service' },
  { label: 'Food Service', value: 'food-service' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Construction', value: 'construction' }
];
