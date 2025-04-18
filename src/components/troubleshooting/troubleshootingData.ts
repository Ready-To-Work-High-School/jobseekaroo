
import { WifiOff, Globe, Search, Link2Off } from 'lucide-react';
import { CommonIssue } from './types';

export const commonIssues: CommonIssue[] = [
  {
    id: 'network',
    title: 'Connection Issues',
    icon: WifiOff,
    description: 'Problems with loading data or connecting to services',
    solutions: [
      'Check your internet connection',
      'Ensure you\'re not in airplane mode',
      'Try refreshing the page'
    ]
  },
  {
    id: 'auth',
    title: 'Sign In Problems',
    icon: Globe,
    description: 'Issues with logging in or accessing your account',
    solutions: [
      'Clear your browser cookies',
      'Try using a different browser',
      'Check if third-party cookies are enabled',
      'Ensure you\'re using the correct email'
    ]
  },
  {
    id: 'data',
    title: 'Missing Data',
    icon: Search,
    description: 'Content not appearing or loading correctly',
    solutions: [
      'Refresh the page',
      'Clear your browser cache',
      'Try signing out and back in',
      'Check if you have the necessary permissions'
    ]
  },
  {
    id: 'broken-links',
    title: 'Broken or Missing Links',
    icon: Link2Off,
    description: 'Issues with non-functioning navigation links or inaccessible components',
    solutions: [
      'Verify your routes configuration',
      'Check for correct import statements',
      'Ensure all necessary components are registered',
      'Clear browser cache and refresh the page',
      'Check network connectivity'
    ]
  }
];
