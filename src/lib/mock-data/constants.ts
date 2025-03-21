
import { JobType, ExperienceLevel } from '@/types/job';

// Job types with display names
export const jobTypes: Array<{ value: JobType; label: string }> = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'internship', label: 'Internship' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'summer', label: 'Summer' },
  { value: 'weekend', label: 'Weekend' }
];

// Experience levels with display names
export const experienceLevels: Array<{ value: ExperienceLevel; label: string }> = [
  { value: 'no-experience', label: 'No Experience' },
  { value: 'entry-level', label: 'Entry Level' },
  { value: 'some-experience', label: 'Some Experience' },
  { value: 'mid-level', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' }
];

// Industries for categorizing jobs
export const industries = [
  'Technology',
  'Healthcare',
  'Retail',
  'Hospitality',
  'Education',
  'Finance',
  'Manufacturing',
  'Construction',
  'Transportation',
  'Business Services',
  'Entertainment',
  'Food Service'
];

// Popular skills for students
export const popularSkills = [
  'Customer Service',
  'Microsoft Office',
  'Communication',
  'Social Media',
  'Time Management',
  'Problem Solving',
  'Teamwork',
  'Data Entry',
  'Sales',
  'Writing',
  'Graphic Design',
  'Photography',
  'Basic Coding',
  'Public Speaking',
  'Organizing'
];

// Salary ranges
export const salaryRanges = [
  { min: 0, max: 20000, label: 'Under $20k' },
  { min: 20000, max: 30000, label: '$20k - $30k' },
  { min: 30000, max: 40000, label: '$30k - $40k' },
  { min: 40000, max: 50000, label: '$40k - $50k' },
  { min: 50000, max: 60000, label: '$50k - $60k' },
  { min: 60000, max: 70000, label: '$60k - $70k' },
  { min: 70000, max: 80000, label: '$70k - $80k' },
  { min: 80000, max: 90000, label: '$80k - $90k' },
  { min: 90000, max: 100000, label: '$90k - $100k' },
  { min: 100000, max: null, label: '$100k+' }
];

// Common job benefits
export const jobBenefits = [
  'Flexible Schedule',
  'Employee Discount',
  'Training Provided',
  'Paid Time Off',
  'Paid Training',
  'Health Insurance',
  'Dental Insurance',
  'Vision Insurance',
  'Tuition Reimbursement',
  'Career Advancement',
  'Employee Events',
  'Free Meals',
  'Professional Development'
];
