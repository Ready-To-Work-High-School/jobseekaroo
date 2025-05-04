
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Search, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const EmployerFeatureCards = () => {
  const features = [
    {
      icon: <Database className="h-10 w-10 text-blue-500" />,
      title: "Talent Database",
      description: "Access our growing database of motivated high-school students ready to join the workforce with diverse skill sets.",
      link: "/employer-dashboard"
    },
    {
      icon: <Search className="h-10 w-10 text-indigo-500" />,
      title: "AI Matching",
      description: "Our intelligent system matches your job requirements with the most suitable candidates based on skills and preferences.",
      link: "/employer-dashboard"
    },
    {
      icon: <Users className="h-10 w-10 text-purple-500" />,
      title: "Streamlined Hiring",
      description: "Post jobs, review applications, schedule interviews, and manage the entire hiring process all in one platform.",
      link: "/employer-dashboard"
    },
    {
      icon: <Shield className="h-10 w-10 text-green-500" />,
      title: "Safety & Compliance",
      description: "Built-in tools to ensure your job postings comply with all youth labor laws and regulations.",
      link: "/safety-compliance"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto my-12">
      <h3 className="text-2xl font-bold text-center mb-8">Key Platform Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Link to={feature.link} key={index} className="transition-transform hover:scale-105">
            <Card className="overflow-hidden h-full">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmployerFeatureCards;
