
export interface ComingSoonFeature {
  id: string;
  title: string;
  description: string;
  estimatedLaunch: string;
  category: 'messaging' | 'interviews' | 'apprenticeships' | 'analytics' | 'events' | 'tools';
  status: 'planning' | 'development' | 'testing' | 'launching';
  features: string[];
  image?: string;
}

export const mockComingSoonFeatures: ComingSoonFeature[] = [
  {
    id: 'messaging-system',
    title: 'Real-time Messaging',
    description: 'Direct communication between employers and candidates with instant notifications.',
    estimatedLaunch: 'Q2 2024',
    category: 'messaging',
    status: 'development',
    features: [
      'Instant messaging with candidates',
      'File and document sharing',
      'Message read receipts',
      'Conversation history',
      'Automated message templates'
    ],
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop'
  },
  {
    id: 'interview-scheduling',
    title: 'Advanced Interview Scheduling',
    description: 'Seamless calendar integration and automated interview coordination.',
    estimatedLaunch: 'Q2 2024',
    category: 'interviews',
    status: 'testing',
    features: [
      'Calendar sync with Google/Outlook',
      'Automated reminder emails',
      'Video interview integration',
      'Interview feedback forms',
      'Bulk scheduling tools'
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop'
  },
  {
    id: 'apprenticeship-programs',
    title: 'Apprenticeship Management',
    description: 'Comprehensive tools for managing apprenticeship programs and tracking progress.',
    estimatedLaunch: 'Q3 2024',
    category: 'apprenticeships',
    status: 'planning',
    features: [
      'Program structure builder',
      'Progress tracking dashboard',
      'Mentor assignment system',
      'Certification management',
      'Performance evaluations'
    ],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop'
  },
  {
    id: 'advanced-analytics',
    title: 'Advanced Analytics Dashboard',
    description: 'Deep insights into hiring performance, candidate quality, and recruitment ROI.',
    estimatedLaunch: 'Q2 2024',
    category: 'analytics',
    status: 'development',
    features: [
      'Hiring funnel analytics',
      'Candidate source tracking',
      'Time-to-hire metrics',
      'Quality of hire analysis',
      'Custom report builder'
    ],
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
  },
  {
    id: 'career-events',
    title: 'Virtual Career Events',
    description: 'Host and manage virtual career fairs, workshops, and networking events.',
    estimatedLaunch: 'Q3 2024',
    category: 'events',
    status: 'planning',
    features: [
      'Virtual event hosting',
      'Breakout room management',
      'Live chat and Q&A',
      'Event registration system',
      'Post-event analytics'
    ],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'
  }
];

export interface ComingSoonUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'feature' | 'improvement' | 'announcement';
}

export const mockComingSoonUpdates: ComingSoonUpdate[] = [
  {
    id: 'update-1',
    title: 'Interview Scheduling Beta Release',
    description: 'We\'re excited to announce the beta release of our interview scheduling feature is coming next month!',
    date: '2024-01-15',
    type: 'announcement'
  },
  {
    id: 'update-2',
    title: 'Enhanced Messaging Features',
    description: 'Added file sharing and message templates to improve employer-candidate communication.',
    date: '2024-01-10',
    type: 'feature'
  },
  {
    id: 'update-3',
    title: 'Performance Improvements',
    description: 'Optimized dashboard loading times and improved overall platform responsiveness.',
    date: '2024-01-05',
    type: 'improvement'
  }
];

export const getComingSoonFeaturesByCategory = (category: ComingSoonFeature['category']) => {
  return mockComingSoonFeatures.filter(feature => feature.category === category);
};

export const getComingSoonFeatureById = (id: string) => {
  return mockComingSoonFeatures.find(feature => feature.id === id);
};
