
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BenefitItem from './BenefitItem';
import { 
  FileText,
  Users,
  Calendar,
  MessageCircle,
  Award,
  LineChart,
  Share2
} from 'lucide-react';

const EmployerBenefits = () => {
  // Removed "Branded job listings..." from features
  const employerBenefits = [
    {
      title: "Job Listings",
      description: "Post unlimited job listings with detailed descriptions and requirements.",
      icon: FileText
    },
    {
      title: "Applicant Management",
      description: "Review applicants through our streamlined candidate management system.",
      icon: Users
    },
    {
      title: "Interview Scheduling",
      description: "Schedule interviews directly through our integrated calendar.",
      icon: Calendar
    },
    {
      title: "Candidate Messaging",
      description: "Message candidates to coordinate hiring details.",
      icon: MessageCircle
    },
    {
      title: "Apprenticeship Programs",
      description: "Offer apprenticeships and training programs to develop student talents.",
      icon: Award
    },
    {
      title: "Performance Analytics",
      description: "Access analytics on job posting performance and candidate engagement.",
      icon: LineChart
    },
    {
      title: "Career Events",
      description: "Participate in career events and connect with promising students.",
      icon: Share2
    }
  ];

  return (
    <Card className="mb-6 border-blue-300 shadow-lg bg-gradient-to-b from-blue-50 to-white">
      <CardHeader className="bg-blue-50 border-b border-blue-200">
        <CardTitle className="text-2xl text-blue-800">What You'll Get Access To</CardTitle>
        <CardDescription>
          Our employer portal provides powerful tools to find and hire qualified students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {employerBenefits.map((benefit, index) => (
            <BenefitItem 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployerBenefits;
