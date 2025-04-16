import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, BookOpen, FileText, CheckCircle, Calendar, Briefcase } from 'lucide-react';
import VideoPlayer from '../video/VideoPlayer';
import LazyImage from '../LazyImage';

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
        {steps.map((step, index) => <Card key={index} className="border-muted shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/5">
                  {step.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </CardContent>
          </Card>)}
      </div>
      
      <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex items-center p-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">See the App in Action</h3>
              <p className="text-muted-foreground mb-6">
                Watch our quick demo video to see how easy it is to use Job Seekers 4 HS and start your journey to employment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Simple profile creation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Customized job recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Interview preparation tools</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2 relative min-h-[300px]">
            <VideoPlayer
              thumbnailUrl="/lovable-uploads/b9f50947-0157-4677-9394-07c6b589cf6e.png"
              videoUrl="https://www.veed.io/embed/a2f96110-1b4c-4e7f-bc4d-73bcb4c28a67?watermark=0&color=purple&sharing=0&title=1"
              title="App Demo"
            />
          </div>
        </div>
      </div>
    </div>
  </section>;
};

export default HowItWorksSection;
