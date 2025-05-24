
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, Users, MessageSquare, BarChart3, Calendar, FileText, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmployerToolsPage = () => {
  const tools = [
    {
      icon: Users,
      title: "Candidate Pipeline",
      description: "Manage candidates through your hiring process with our kanban-style board.",
      href: "/employer/candidates"
    },
    {
      icon: MessageSquare,
      title: "Messaging Center",
      description: "Communicate directly with candidates and track all conversations.",
      href: "/employer/messages"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track job performance, application rates, and hiring metrics.",
      href: "/employer/analytics"
    },
    {
      icon: Calendar,
      title: "Interview Scheduler",
      description: "Schedule and manage interviews with integrated calendar functionality.",
      href: "/employer/calendar"
    },
    {
      icon: FileText,
      title: "Application Tracking",
      description: "Monitor and organize all job applications in one central location.",
      href: "/employer/applicants"
    },
    {
      icon: Target,
      title: "Job Performance",
      description: "Analyze which job postings perform best and optimize your listings.",
      href: "/employer/job-performance"
    }
  ];

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Folder className="h-8 w-8" />
              Recruitment Tools
            </h1>
            <p className="text-muted-foreground mt-2">
              Powerful tools to streamline your hiring process and find the best candidates
            </p>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Zap className="h-5 w-5" />
                Premium Tools Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                Unlock advanced recruitment features with employer verification and premium access.
              </p>
              <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <tool.icon className="h-5 w-5 text-blue-600" />
                  {tool.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href={tool.href}>Access Tool</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default EmployerToolsPage;
