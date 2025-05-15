
// Job-related constants
export const JOB_TYPES = [
  'full-time',
  'part-time',
  'internship',
  'volunteer',
  'seasonal'
];

export const EXPERIENCE_LEVELS = [
  'entry-level',
  'mid-level',
  'senior',
  'internship'
];

export const PAY_PERIODS = [
  'hourly',
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'yearly'
];

// Search-related constants
export const SEARCH_RADIUS_OPTIONS = [
  { value: 5, label: '5 miles' },
  { value: 10, label: '10 miles' },
  { value: 25, label: '25 miles' },
  { value: 50, label: '50 miles' },
  { value: 100, label: '100 miles' }
];

export const POSTED_WITHIN_OPTIONS = [
  { value: 1, label: 'Last 24 hours' },
  { value: 7, label: 'Last 7 days' },
  { value: 14, label: 'Last 14 days' },
  { value: 30, label: 'Last 30 days' },
  { value: 90, label: 'Last 90 days' }
];

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Most Recent' },
  { value: 'salary', label: 'Highest Salary' },
  { value: 'distance', label: 'Closest Distance' }
];

// User types
export const USER_TYPES = [
  'student',
  'employer',
  'admin',
  'teacher'
];

// Application status
export const APPLICATION_STATUS = [
  'applied',
  'interviewing',
  'rejected',
  'accepted',
  'pending',
  'hired',
  'withdrawn'
];
