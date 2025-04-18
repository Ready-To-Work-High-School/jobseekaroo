
export const employerPlans = [
  {
    name: 'Basic',
    price: '$0',
    period: 'Forever free',
    description: 'Get started with essential job posting features',
    features: [
      'Up to 3 active job postings',
      'Basic candidate search',
      'Standard visibility',
      'Basic company profile'
    ],
    buttonText: 'Get Started',
    popular: false,
    planId: 'free'
  },
  {
    name: 'Standard',
    price: '$59',
    period: 'per month',
    description: 'Perfect for growing businesses with moderate hiring needs',
    features: [
      '10 premium job posts per month',
      'Enhanced candidate search',
      'Priority placement in search results',
      'Custom branded profile',
      'Basic analytics dashboard',
      'Candidate messaging'
    ],
    buttonText: 'Subscribe',
    popular: true,
    planId: 'standard_monthly'
  },
  {
    name: 'Pro',
    price: '$149',
    period: 'per month',
    description: 'Complete solution for high-volume hiring',
    features: [
      'Unlimited premium job postings',
      'Featured placement in search results',
      'Advanced candidate search & filtering',
      'Full analytics dashboard',
      'Unlimited candidate messaging',
      'Featured employer badge',
      'Priority support',
      'Bulk posting capabilities',
      'AI-powered candidate matching',
      'Custom recruitment workflows'
    ],
    buttonText: 'Subscribe Now',
    popular: false,
    planId: 'enterprise_analytics'
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
