
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal, FileCheck, Calendar, Phone } from 'lucide-react';

const StudentBenefits = () => {
  const benefits = [
    {
      title: "Pre-trained Workforce",
      description: "Access students with verified skills and industry-recognized credentials.",
      icon: Medal
    },
    {
      title: "Specialized Training",
      description: "Students have received education in business fundamentals, entrepreneurship, and professional skills.",
      icon: FileCheck
    },
    {
      title: "Ready to Work",
      description: "Students can start immediately with flexible schedules around their education.",
      icon: Calendar
    },
    {
      title: "Direct Connection",
      description: "Work directly with the academy to find the best candidates for your positions.",
      icon: Phone
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {benefits.map((benefit, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <benefit.icon className="h-6 w-6 text-blue-700" />
              </div>
              <CardTitle className="text-xl">{benefit.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">{benefit.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentBenefits;
