
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, BookOpen, FileText, CheckCircle, Calendar, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [{
  icon: <Search className="h-10 w-10 text-blue-500" />,
  title: "Find Jobs",
  description: "Browse jobs specifically designed for high school students with no experience required."
}, {
  icon: <FileText className="h-10 w-10 text-amber-500" />,
  title: "Prepare Documents",
  description: "Create your resume and gather required documents with our step-by-step guidance."
}, {
  icon: <BookOpen className="h-10 w-10 text-green-500" />,
  title: "Learn Skills",
  description: "Complete short training modules to learn essential job skills and earn digital badges."
}, {
  icon: <Calendar className="h-10 w-10 text-purple-500" />,
  title: "Practice Interviews",
  description: "Use our AI interview simulator to practice common questions and build confidence."
}, {
  icon: <CheckCircle className="h-10 w-10 text-red-500" />,
  title: "Apply With Confidence",
  description: "Submit applications with your earned credentials and track your progress."
}, {
  icon: <Briefcase className="h-10 w-10 text-teal-500" />,
  title: "Start Working",
  description: "Begin your first job with ongoing support from our platform and school advisors."
}];

const HowItWorksSection = () => {
  return <section className="py-16 bg-gradient-to-b from-blue-50/50 to-transparent">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform simplifies the job search process for high school students, making it easy to find, prepare for, and secure your first job opportunity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Link key={index} to="/sign-up" className="block group">
            <Card className="border-muted shadow-sm hover:shadow-md transition-shadow h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>;
};

export default HowItWorksSection;
