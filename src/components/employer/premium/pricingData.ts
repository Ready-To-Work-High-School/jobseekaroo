export const employerPlans = [
  {
    name: 'Basic',
    price: '$0',
    period: 'Forever free',
    description: 'Get started with essential job posting features',
    features: [
      'Up to 3 active job postings',
      'Basic company profile',
      'Simple candidate search',
      'Connect with candidates',
      'Interview calendar'
    ],
    buttonText: 'Get Started',
    popular: false,
    planId: 'free'
  },
  {
    name: 'Premium',
    price: '$30',
    period: 'per month',
    description: 'Complete solution for growing businesses with moderate hiring needs',
    features: [
      'Unlimited premium job posts',
      'Enhanced candidate search',
      'Priority placement in search results',
      'Custom branded profile',
      'Analytics dashboard',
      'Unlimited candidate messaging',
      'Featured employer badge',
      'AI-powered candidate matching',
      'Custom recruitment workflows',
      'Priority support'
    ],
    buttonText: 'Subscribe',
    popular: true,
    planId: 'standard_monthly'
  }
];

export const schoolPlans = [
  {
    name: 'Basic',
    price: '$0',
    period: 'Forever free',
    description: 'Basic tools for school career counselors',
    features: [
      'Student job access',
      'Job approval tools',
      'Basic support'
    ],
    buttonText: 'Get Started',
    popular: false,
    planId: 'school_free'
  },
  {
    name: 'Premium',
    price: '$750',
    period: 'per year',
    description: 'Advanced features for school career departments',
    features: [
      'Counselor dashboard',
      'Student success reports',
      'Branded portal',
      'Priority support',
      'Career event management'
    ],
    buttonText: 'Sign Up',
    popular: true,
    planId: 'school_premium'
  },
  {
    name: 'Enterprise',
    price: '$10',
    period: 'per student/year',
    description: 'Scalable solution for larger schools',
    features: [
      'All Premium features',
      'Volume-based pricing',
      'Dedicated account manager',
      'Custom reporting',
      'API access'
    ],
    buttonText: 'Contact Us',
    popular: false,
    planId: 'school_enterprise'
  }
];
