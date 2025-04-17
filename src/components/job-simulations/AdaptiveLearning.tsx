
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdaptiveLearning = () => {
  const benefits = [
    {
      title: "Personalized Assessment",
      description: "Begin with a comprehensive skill assessment tailored to your career goals."
    },
    {
      title: "Custom Learning Path",
      description: "Receive a learning plan designed for your specific needs and interests."
    },
    {
      title: "Interactive Activities",
      description: "Practice with real-world scenarios that build practical skills."
    },
    {
      title: "Progress Tracking",
      description: "Monitor your development and showcase your accomplishments to employers."
    }
  ];

  return (
    <div className="bg-blue-50 p-8 rounded-lg mb-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Adaptive Learning Platform</h2>
      <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
        Our skill development platform uses adaptive learning technology to identify your strengths and areas for improvement. 
        Based on your career interests and existing skillset, we create a customized learning journey to help you build the 
        competencies employers are looking for.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center p-4">
            <h3 className="font-bold mb-2">{benefit.title}</h3>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button asChild>
          <Link to="/skill-development">
            Explore Skill Development
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdaptiveLearning;
