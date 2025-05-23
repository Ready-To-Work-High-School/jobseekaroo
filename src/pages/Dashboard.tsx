
import React from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useFadeIn } from '@/utils/animations';
import { Briefcase, Settings, User, Blocks } from 'lucide-react';
import JobSimulationsCard from '@/components/students/JobSimulationsCard';

const Dashboard = () => {
  const { user, userProfile } = useAuth();
  const fadeIn = useFadeIn(300);
  
  const dashboardCards = [
    {
      title: 'Job Listings',
      description: 'Browse available job opportunities',
      icon: <Briefcase className="h-5 w-5" />,
      link: '/jobs',
      color: 'bg-blue-50 text-blue-700'
    },
    {
      title: 'Profile',
      description: 'Manage your personal information',
      icon: <User className="h-5 w-5" />,
      link: '/profile',
      color: 'bg-purple-50 text-purple-700'
    }
  ];
  
  return (
    <Layout>
      <div className={`container mx-auto px-4 py-6 ${fadeIn}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome{userProfile?.first_name ? `, ${userProfile.first_name}` : ''}! Manage your job search journey from here.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${card.color}`}>
                  {card.icon}
                </div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to={card.link}>Access</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Featured Job Simulations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Blocks className="h-5 w-5 text-blue-600" />
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <JobSimulationsCard />
            
            {/* Second card space for another resource */}
            <Card className="shadow-md border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-amber-100">
                    <User className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">First Job Toolkit</CardTitle>
                    <CardDescription>Step-by-step guide to career readiness</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our comprehensive toolkit walks you through resume building, 
                  interview preparation, and workplace success strategies.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="default" className="w-full bg-amber-600 hover:bg-amber-700">
                  <Link to="/first-job-toolkit">
                    Access Toolkit
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to="/saved-jobs">
                <Briefcase className="h-4 w-4" />
                Saved Jobs
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to="/settings">
                <Settings className="h-4 w-4" />
                Account Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
