
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Award, FileText, MessageSquare, BarChart3, Search, Shield, Building2, Star } from "lucide-react";

const features = [
  {
    icon: <Search className="h-6 w-6 text-blue-500" />,
    title: "Job Search & Matching",
    description: "AI-powered job matching technology that connects students with appropriate entry-level positions based on their skills, interests, and location.",
    link: "/jobs"
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-green-500" />,
    title: "Skill Development",
    description: "Access to training resources and skill-building opportunities to help students prepare for the workforce.",
    link: "/skill-development"
  },
  {
    icon: <FileText className="h-6 w-6 text-amber-500" />,
    title: "Resume Building",
    description: "Dynamic resume creation tools with multiple templates and AI-assisted content suggestions tailored for high school students.",
    link: "/resume-assistant"
  },
  {
    icon: <Briefcase className="h-6 w-6 text-purple-500" />,
    title: "Job Simulations",
    description: "Interactive job simulations that allow students to experience different career paths before making decisions.",
    link: "/job-simulations"
  },
  {
    icon: <Award className="h-6 w-6 text-red-500" />,
    title: "Digital Badges & Credentials",
    description: "Earn and showcase verified skills and achievements through our digital badging system.",
    link: "/credentials"
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-indigo-500" />,
    title: "Communication Tools",
    description: "Secure messaging system between students, employers, and school administrators.",
    link: "/communication"
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-cyan-500" />,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics for tracking job applications, skill development, and student engagement.",
    link: "/analytics"
  },
  {
    icon: <Shield className="h-6 w-6 text-emerald-500" />,
    title: "Safety & Compliance",
    description: "Built-in safety features ensuring age-appropriate opportunities and COPPA/FERPA compliance.",
    link: "/safety-compliance"
  },
  {
    icon: <Building2 className="h-6 w-6 text-orange-500" />,
    title: "School Integration",
    description: "Tools for schools to manage student accounts, track progress, and integrate with existing systems.",
    link: "/school-integration"
  },
  {
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: "Premium Services",
    description: "Enhanced features for employers and schools, including priority job listings and advanced analytics.",
    link: "/premium-services"
  }
];

const PlatformFeatures = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
        <p className="text-muted-foreground">
          Our platform offers a comprehensive suite of tools designed to bridge the gap between high school students and their first jobs. Here's what makes our platform unique:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link to={feature.link} key={index} className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlatformFeatures;
