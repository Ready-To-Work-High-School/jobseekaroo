
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Calendar, MessageCircle, BarChart3, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployerWhatYouGetSection = () => {
  const features = [
    {
      icon: Users,
      title: "Access to Student Talent Pool",
      description: "Connect with motivated high school students ready to work",
      sample: "15+ verified students from Entrepreneurship Academy",
      color: "blue"
    },
    {
      icon: FileText,
      title: "Easy Job Posting System",
      description: "Create and manage job listings with our intuitive dashboard",
      sample: "Post unlimited part-time and internship positions",
      color: "green"
    },
    {
      icon: Calendar,
      title: "Interview Scheduling",
      description: "Streamlined scheduling and candidate management tools",
      sample: "Integrated calendar with automated reminders",
      color: "purple"
    },
    {
      icon: MessageCircle,
      title: "Direct Student Communication",
      description: "Message candidates safely through our platform",
      sample: "Secure messaging with school oversight",
      color: "orange"
    },
    {
      icon: BarChart3,
      title: "Hiring Analytics",
      description: "Track your job posting performance and candidate engagement",
      sample: "View application rates, response times, and more",
      color: "red"
    },
    {
      icon: Award,
      title: "Verified Employer Badge",
      description: "Build trust with students and schools through verification",
      sample: "Stand out with our trusted employer certification",
      color: "yellow"
    }
  ];

  return (
    <div className="my-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What You Get as an Employer</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our platform provides everything you need to connect with qualified student talent 
          and streamline your hiring process.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full bg-${feature.color}-100`}>
                  <feature.icon className={`h-5 w-5 text-${feature.color}-600`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 rounded-lg p-3 border-l-4 border-l-blue-500">
                <p className="text-sm font-medium text-slate-700">Sample:</p>
                <p className="text-sm text-slate-600">{feature.sample}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to action at the bottom */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Badge variant="outline" className="px-3 py-1">
            <Users className="h-3 w-3 mr-1" />
            7 Active Students
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            <FileText className="h-3 w-3 mr-1" />
            12 Jobs Posted This Month
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            <Award className="h-3 w-3 mr-1" />
            100% Verified Candidates
          </Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Join employers who are already finding great student talent through our platform.
        </p>
      </div>
    </div>
  );
};

export default EmployerWhatYouGetSection;
