
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Choose a Simulation",
      description: "Browse our catalog of career paths or individual job simulations."
    },
    {
      step: 2,
      title: "Complete the Projects",
      description: "Work through realistic tasks and projects with interactive feedback."
    },
    {
      step: 3,
      title: "System Diagnostics",
      description: "Use our built-in diagnostic tools to ensure optimal performance."
    },
    {
      step: 4,
      title: "Get Support",
      description: "Access troubleshooting assistance and real-time system checks."
    },
    {
      step: 5,
      title: "Earn a Credential",
      description: "Add your completed simulation credentials to your resume."
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {steps.map((item, index) => (
          <Link key={index} to="/sign-up" className="block group">
            <Card key={index} className="text-center h-full group-hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2 text-lg font-bold group-hover:bg-blue-200 transition-colors">
                  {item.step}
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
