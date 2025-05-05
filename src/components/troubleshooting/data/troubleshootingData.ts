
import { 
  Wifi, AlertCircle, Database, Lock, Globe, BrainCircuit,
  KeyRound, ZapOff, ShieldAlert, Cookie, MonitorSmartphone
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface CommonIssue {
  id: string;
  title: string;
  description: string;
  solutions: string[];
  icon: LucideIcon;
}

export const commonIssues: CommonIssue[] = [
  {
    id: 'network',
    title: 'Network Connectivity',
    description: 'Problems with internet connection or API access',
    solutions: [
      'Check your internet connection and refresh the page',
      'Try disabling any VPN or proxy services',
      'Clear browser cache and cookies',
      'If on a restricted network, contact your IT administrator'
    ],
    icon: Wifi
  },
  {
    id: 'authentication',
    title: 'Authentication Issues',
    description: 'Problems with signing in or account access',
    solutions: [
      'Verify your email and password are correct',
      'Clear browser cookies and try signing in again',
      'Reset your password if you continue to have issues',
      'Contact support if your account is locked'
    ],
    icon: KeyRound
  },
  {
    id: 'data-loading',
    title: 'Data Not Loading',
    description: 'Information is missing or failing to display',
    solutions: [
      'Refresh the page to reload your data',
      'Check your internet connection',
      'Sign out and sign back in to refresh your session',
      'Clear browser cache and cookies'
    ],
    icon: Database
  },
  {
    id: 'permissions',
    title: 'Permission Errors',
    description: 'Access denied or missing permissions',
    solutions: [
      'Verify your account has the correct permissions',
      'Sign out and sign back in to refresh your session',
      'Contact your administrator to request access',
      'Check if your subscription is active'
    ],
    icon: Lock
  },
  {
    id: 'browser-compatibility',
    title: 'Browser Compatibility',
    description: 'Issues with how the site works in your browser',
    solutions: [
      'Update to the latest version of your browser',
      'Try using Chrome, Firefox, or Edge',
      'Disable browser extensions that might interfere',
      'Enable JavaScript and cookies in your browser settings'
    ],
    icon: Globe
  },
  {
    id: 'performance',
    title: 'Performance Issues',
    description: 'Application is slow or unresponsive',
    solutions: [
      'Close unused tabs and applications to free up memory',
      'Clear browser cache and cookies',
      'Disable browser extensions that might slow things down',
      'Try using a different browser'
    ],
    icon: ZapOff
  },
  {
    id: 'security',
    title: 'Security Warnings',
    description: 'Browser security alerts or blocked features',
    solutions: [
      'Ensure you\'re using HTTPS in the URL',
      'Check your browser security settings',
      'Update your browser to the latest version',
      'Contact your IT administrator if using a work computer'
    ],
    icon: ShieldAlert
  },
  {
    id: 'cookies',
    title: 'Cookie Settings',
    description: 'Problems related to cookie permissions',
    solutions: [
      'Enable cookies in your browser settings',
      'Allow third-party cookies if you\'re using SSO',
      'Clear cookies and cache, then try again',
      'Check if browser extensions are blocking cookies'
    ],
    icon: Cookie
  },
  {
    id: 'mobile-issues',
    title: 'Mobile Device Issues',
    description: 'Problems specific to smartphones and tablets',
    solutions: [
      'Try using the desktop version of the site',
      'Update your mobile browser to the latest version',
      'Clear browser cache and data',
      'Check for system updates on your device'
    ],
    icon: MonitorSmartphone
  },
  {
    id: 'ai-features',
    title: 'AI Features Not Working',
    description: 'Issues with AI-powered functionality',
    solutions: [
      'Check your internet connection (AI features require good connectivity)',
      'Try refreshing the page and trying again',
      'Use shorter or clearer input text if AI seems confused',
      'Contact support if AI features remain unavailable'
    ],
    icon: BrainCircuit
  }
];
