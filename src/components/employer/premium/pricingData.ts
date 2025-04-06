
export const employerPlans = [
  {
    name: 'Basic',
    price: '$0',
    period: 'Forever free',
    description: 'Get started with essential job posting features',
    features: [
      'Basic job postings',
      'Unlimited applications',
      'Standard visibility'
    ],
    buttonText: 'Get Started',
    popular: false,
    planId: 'free'
  },
  {
    name: 'Standard',
    price: '$59',
    period: 'per month',
    description: 'Perfect for small chains with moderate hiring needs',
    features: [
      '5 premium job posts per month',
      'Custom branded profile',
      'Priority placement in search results',
      'Basic analytics'
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
      'Full analytics dashboard',
      'Priority support',
      'Featured Employer badge',
      'Bulk posting capabilities'
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
