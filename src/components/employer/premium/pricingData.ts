
export const employerPlans = [
  {
    name: 'Basic',
    price: '$0',
    period: 'Forever free',
    description: 'Get started with essential job posting features',
    features: [
      'Up to 3 active job postings',
      'Basic company profile',
      'Company name and logo',
      'Simple candidate messaging',
      'Basic applicant tracking'
    ],
    buttonText: 'Get Started',
    popular: false,
    planId: 'free'
  },
  {
    name: 'Pro',
    price: '$30',
    period: 'per month',
    description: 'Complete solution for growing businesses with moderate hiring needs',
    features: [
      'Unlimited premium job posts',
      'Enhanced candidate search',
      'Priority placement in search results',
      'Custom branded company profile',
      'Analytics dashboard',
      'Unlimited candidate messaging',
      'Featured employer badge',
      'AI-powered candidate matching',
      'Custom recruitment workflows',
      'Priority support'
    ],
    buttonText: 'Subscribe',
    popular: true,
    planId: 'pro'
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'Advanced features for large companies with extensive hiring needs',
    features: [
      'All Pro features included',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'Advanced analytics and reporting',
      'Customized job matching algorithms',
      'Employer branding solutions',
      'Multi-user access with roles',
      'Bulk job posting',
      'Enhanced security features'
    ],
    buttonText: 'Contact Sales',
    popular: false,
    planId: 'enterprise'
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
