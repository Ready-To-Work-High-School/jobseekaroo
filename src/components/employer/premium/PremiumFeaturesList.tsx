
import React from 'react';
import { LineChart, Users, Award, BarChart2, Briefcase, Search, Star, Zap } from 'lucide-react';

const features = [
  {
    icon: LineChart,
    title: 'Advanced Analytics',
    description: 'Detailed insights into application performance and candidate engagement metrics.'
  },
  {
    icon: Users,
    title: 'Demographic Analysis',
    description: 'Understand the demographic breakdown of your applicant pool to improve diversity initiatives.'
  },
  {
    icon: Award,
    title: 'Premium Company Profile',
    description: 'Enhanced company profile with custom branding, videos, and testimonials to attract top talent.'
  },
  {
    icon: BarChart2,
    title: 'Competitor Benchmarking',
    description: 'Compare your job performance against industry standards and competitors.'
  },
  {
    icon: Star,
    title: 'Featured Job Listings',
    description: 'Prominent placement of your job postings on the homepage and search results.'
  },
  {
    icon: Search,
    title: 'Advanced Search Filters',
    description: 'Access advanced filtering options to find the perfect candidates quickly.'
  },
  {
    icon: Briefcase,
    title: 'Candidate Insights',
    description: 'In-depth profiles of candidates including skill assessments and behavioral analysis.'
  },
  {
    icon: Zap,
    title: 'Priority Support',
    description: '24/7 dedicated support team to assist with any issues or questions.'
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
