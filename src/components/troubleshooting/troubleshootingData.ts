
import { Bug, Lock, Mail, User } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface CommonIssue {
  id: string;
  title: string;
  description: string;
  solution: string;
  icon: LucideIcon;
  solutions: string[];
}

export const commonIssues = [
  {
    id: 'login',
    title: 'Login Issues',
    description: 'Having trouble signing in to your account?',
    solution: 'Check your email and password, or try resetting your password. If problems persist, try clearing your browser cache and cookies.',
    icon: Lock,
    solutions: [
      'Verify your email address and password are correct',
      'Try resetting your password through the "Forgot Password" link',
      'Clear your browser cache and cookies',
      'Try using an incognito/private browser window'
    ]
  },
  {
    id: 'jobs',
    title: 'Jobs Not Loading',
    description: 'Issues with viewing or applying to jobs?',
    solution: 'Try refreshing the page or clearing your browser cache. Check your internet connection and make sure you have the latest version of the app.',
    icon: Bug,
    solutions: [
      'Refresh the page to reload job listings',
      'Check your internet connection',
      'Clear your browser cache and cookies',
      'Try using a different browser or device'
    ]
  },
  {
    id: 'application',
    title: 'Application Submission Errors',
    description: 'Problems submitting your job application?',
    solution: 'Make sure all required fields are completed. Try using a different browser or device if the issue persists.',
    icon: Mail,
    solutions: [
      'Ensure all required fields are completed correctly',
      'Check for any error messages on the form',
      'Try submitting your application from a different device',
      'Contact support if the problem continues'
    ]
  },
  {
    id: 'profile',
    title: 'Profile Updates Not Saving',
    description: 'Changes to your profile not being saved?',
    solution: "Ensure you click the \"Save\" button after making changes. Try uploading smaller image files if you're having issues with profile pictures.",
    icon: User,
    solutions: [
      'Make sure to click the Save button after making changes',
      'Try uploading smaller image files (under 2MB) for profile pictures',
      'Check your internet connection',
      'Clear your browser cache and try again'
    ]
  }
];
