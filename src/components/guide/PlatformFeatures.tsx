import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, BadgeCheck, Code2, FileText, Laptop, MessageSquare, 
         BookMarked, PieChart, ShieldAlert, Rocket, GraduationCap, Users,
         Search, BriefcaseBusiness, Award, Brain, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Search className="h-6 w-6 text-blue-500" />,
    title: "Smart Job Matching",
    description: "AI-powered job matching system connects students with appropriate entry-level positions based on their skills and interests.",
    link: "/jobs"
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-emerald-500" />,
    title: "Career Development",
    description: "Access specialized academies, skill assessments, and industry-recognized certifications.",
    link: "/skill-development"
  },
  {
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    title: "Career Exploration",
    description: "Interactive career quiz, job simulations, and industry insights help students discover their path.",
    link: "/career-quiz"
  },
  {
    icon: <FileText className="h-6 w-6 text-amber-500" />,
    title: "Resume Builder",
    description: "AI-assisted resume creation with templates tailored for high school students.",
    link: "/resume-assistant"
  },
  {
    icon: <BadgeCheck className="h-6 w-6 text-indigo-500" />,
    title: "Digital Credentials",
    description: "Earn and showcase verified badges and certifications from completed courses and assessments.",
    link: "/credentials"
  },
  {
    icon: <BriefcaseBusiness className="h-6 w-6 text-red-500" />,
    title: "Job Simulations",
    description: "Virtual job experiences across different industries to help students understand career paths.",
    link: "/job-simulations"
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-teal-500" />,
    title: "Safe Communication",
    description: "Secure messaging system between students, employers, and school administrators.",
    link: "/communication"
  },
  {
    icon: <PieChart className="h-6 w-6 text-cyan-500" />,
    title: "Analytics Dashboard",
    description: "Track job applications, skill development progress, and engagement metrics.",
    link: "/analytics"
  },
  {
    icon: <ShieldAlert className="h-6 w-6 text-green-500" />,
    title: "Safety & Compliance",
    description: "Built-in safety features ensuring age-appropriate opportunities and COPPA/FERPA compliance.",
    link: "/safety-compliance"
  },
  {
    icon: <Building2 className="h-6 w-6 text-orange-500" />,
    title: "School Integration",
    description: "Tools for schools to manage student accounts and track progress.",
    link: "/school-integration"
  },
  {
    icon: <BookOpen className="h-6 w-6 text-violet-500" />,
    title: "Learning Resources",
    description: "Comprehensive library of educational content, guides, and training materials.",
    link: "/resources"
  },
  {
    icon: <Sparkles className="h-6 w-6 text-yellow-500" />,
    title: "Premium Services",
    description: "Enhanced features for employers including priority listings and advanced analytics.",
    link: "/premium-services"
  }
];

const PlatformFeatures = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
        <p className="text-muted-foreground">
          Our comprehensive platform offers tools and resources designed to bridge the gap between education and employment, helping students start their careers with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link to={feature.link} key={index} className="block h-full">
            <Card className="h-full transition-all hover:shadow-md hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlatformFeatures;
