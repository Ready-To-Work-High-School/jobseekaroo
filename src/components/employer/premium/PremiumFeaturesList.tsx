
import React from 'react';
import { LineChart, Users, Award, BarChart2, Briefcase, Search, Star, Zap, MessageSquare, Infinity, Bot } from 'lucide-react';

const features = [
  {
    icon: Infinity,
    title: 'Unlimited Job Postings',
    description: 'Post as many jobs as you need with premium placement and enhanced visibility.'
  },
  {
    icon: MessageSquare,
    title: 'Unlimited Messaging',
    description: 'Communicate directly with candidates through our built-in messaging system.'
  },
  {
    icon: Bot,
    title: 'AI-Powered Matching',
    description: 'Let our AI find the perfect candidates based on skills and requirements.'
  },
  {
    icon: LineChart,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights into application performance and candidate engagement.'
  },
  {
    icon: Users,
    title: 'Advanced Candidate Search',
    description: 'Powerful search and filtering tools to find the perfect candidates quickly.'
  },
  {
    icon: Award,
    title: 'Featured Company Profile',
    description: 'Stand out with enhanced branding and premium placement in search results.'
  },
  {
    icon: BarChart2,
    title: 'Custom Workflows',
    description: 'Create and manage custom recruitment workflows for your hiring process.'
  },
  {
    icon: Star,
    title: 'Priority Support',
    description: '24/7 dedicated support team to assist with any questions or issues.'
  }
];

const PremiumFeaturesList = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-2">Premium Features</h2>
      <p className="text-center text-muted-foreground mb-8">
        Unlock powerful tools to enhance your recruiting capabilities
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-card border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumFeaturesList;
