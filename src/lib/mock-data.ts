import { Job } from '../types/job';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Cashier',
    company: 'SuperMart',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32256',
    },
    type: 'part-time',
    payRate: {
      min: 14,
      max: 16,
      period: 'hourly',
    },
    description: 'Looking for friendly and reliable cashiers to join our team. Responsibilities include handling transactions, providing excellent customer service, and maintaining a clean checkout area.',
    requirements: [
      'No prior experience required',
      'Basic math skills',
      'Strong communication skills',
      'Availability for evening and weekend shifts',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-15',
    logoUrl: 'https://images.unsplash.com/photo-1565372595887-80c757841e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: true,
  },
  {
    id: '2',
    title: 'Barista',
    company: 'Bold Bean Coffee',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32204',
    },
    type: 'part-time',
    payRate: {
      min: 15,
      max: 18,
      period: 'hourly',
    },
    description: 'Join our coffee shop team! We\'re looking for enthusiastic baristas to prepare and serve coffee beverages. You\'ll create a welcoming environment while ensuring quality drinks for our customers.',
    requirements: [
      'No experience required - we\'ll train you',
      'Friendly and positive attitude',
      'Ability to work in a fast-paced environment',
      'Weekend availability is a plus',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-10',
    logoUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: true,
  },
  {
    id: '3',
    title: 'Retail Associate',
    company: 'River City Fashion',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32246',
    },
    type: 'part-time',
    payRate: {
      min: 14,
      max: 16,
      period: 'hourly',
    },
    description: 'Join our retail team at our St. Johns Town Center location! Help customers find the perfect outfits, manage inventory, and keep the store looking its best.',
    requirements: [
      'No prior retail experience needed',
      'Fashion enthusiast preferred',
      'Strong customer service orientation',
      'Able to work weekends and some evenings',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-12',
    logoUrl: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: false,
  },
  {
    id: '4',
    title: 'Library Assistant',
    company: 'Jacksonville Public Library',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32202',
    },
    type: 'part-time',
    payRate: {
      min: 15,
      max: 17,
      period: 'hourly',
    },
    description: 'Assist library staff with book check-outs, shelving, and helping visitors find resources. Perfect for students who love books and enjoy helping others.',
    requirements: [
      'Basic computer skills',
      'Strong organizational abilities',
      'Friendly and patient demeanor',
      'Interest in books and research',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-08',
    logoUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: true,
  },
  {
    id: '5',
    title: 'Social Media Intern',
    company: 'JAX Tech Startups',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32207',
    },
    type: 'internship',
    payRate: {
      min: 16,
      max: 18,
      period: 'hourly',
    },
    description: 'Learn how to manage social media for a growing tech company. Create content, engage with followers, and help build our online presence.',
    requirements: [
      'Experience with Instagram, TikTok, and Twitter',
      'Creative mindset',
      'Basic photo/video editing skills',
      'Interest in technology',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-05',
    logoUrl: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: true,
    isFlexible: true,
  },
  {
    id: '6',
    title: 'Dog Walker',
    company: 'Jax Happy Tails',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32225',
    },
    type: 'part-time',
    payRate: {
      min: 17,
      max: 20,
      period: 'hourly',
    },
    description: 'Walk dogs in Jacksonville neighborhoods! Flexible schedule, perfect for animal lovers. Help pet owners keep their furry friends happy and healthy.',
    requirements: [
      'Love of dogs and comfort around different breeds',
      'Responsible and reliable',
      'Access to transportation',
      'Available for afternoon walks',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-03',
    logoUrl: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: true,
  },
  {
    id: '7',
    title: 'Grocery Store Clerk',
    company: 'Jacksonville Natural Foods',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32258',
    },
    type: 'part-time',
    payRate: {
      min: 15,
      max: 17,
      period: 'hourly',
    },
    description: 'Stock shelves, assist customers, and help maintain store appearance. Learn about natural and organic products while gaining retail experience.',
    requirements: [
      'Ability to lift up to 25 pounds',
      'Friendly, customer-focused attitude',
      'Interest in health and nutrition a plus',
      'Flexible schedule availability',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-02',
    logoUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: false,
  },
  {
    id: '8',
    title: 'Restaurant Host/Hostess',
    company: 'St. Johns Grill',
    location: {
      city: 'Jacksonville',
      state: 'FL',
      zipCode: '32224',
    },
    type: 'part-time',
    payRate: {
      min: 14,
      max: 16,
      period: 'hourly',
    },
    description: 'Welcome guests, manage reservations, and coordinate with servers. Be the friendly face of our restaurant while gaining valuable hospitality experience.',
    requirements: [
      'Polished, professional appearance',
      'Excellent communication skills',
      'Ability to multitask in a fast-paced environment',
      'Weekend and evening availability',
    ],
    experienceLevel: 'entry-level',
    postedDate: '2023-09-01',
    logoUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80',
    isRemote: false,
    isFlexible: false,
  },
];

export const searchJobsByZipCode = (zipCode: string, filters: Partial<Job> = {}): Job[] => {
  let filtered = [...mockJobs];
  
  // If zipCode is provided
  if (zipCode && zipCode.trim() !== '') {
    filtered = filtered.filter(job => job.location.zipCode === zipCode);
  }
  
  // Apply additional filters
  if (filters.type) {
    filtered = filtered.filter(job => job.type === filters.type);
  }
  
  if (filters.experienceLevel) {
    filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
  }
  
  if (filters.isRemote !== undefined) {
    filtered = filtered.filter(job => job.isRemote === filters.isRemote);
  }
  
  if (filters.isFlexible !== undefined) {
    filtered = filtered.filter(job => job.isFlexible === filters.isFlexible);
  }
  
  return filtered;
};

export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};
