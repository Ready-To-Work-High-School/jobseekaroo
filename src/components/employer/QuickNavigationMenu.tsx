
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Briefcase, 
  Users, 
  BarChart3, 
  Star, 
  FileCheck, 
  Folder,
  Settings,
  Kanban
} from 'lucide-react';

interface QuickNavigationProps {
  className?: string;
}

export const QuickNavigationMenu: React.FC<QuickNavigationProps> = ({ className }) => {
  const navigationItems = [
    {
      title: 'Post Jobs',
      description: 'Create and manage job listings',
      icon: <Briefcase className="h-5 w-5" />,
      path: '/employer/dashboard',
      color: 'text-blue-500',
    },
    {
      title: 'Candidate Pipeline',
      description: 'Track candidates in your hiring pipeline',
      icon: <Kanban className="h-5 w-5" />,
      path: '/employer/candidates',
      color: 'text-purple-500',
    },
    {
      title: 'Analytics',
      description: 'View hiring performance metrics',
      icon: <BarChart3 className="h-5 w-5" />,
      path: '/employer/analytics',
      color: 'text-green-500',
    },
    {
      title: 'Premium Features',
      description: 'Access exclusive hiring tools',
      icon: <Star className="h-5 w-5" />,
      path: '/employer/premium-features',
      color: 'text-amber-500',
    },
    {
      title: 'Verifications',
      description: 'Manage employer verification',
      icon: <FileCheck className="h-5 w-5" />,
      path: '/employer/verifications',
      color: 'text-indigo-500',
    },
    {
      title: 'Recruitment Tools',
      description: 'Advanced recruitment tools',
      icon: <Folder className="h-5 w-5" />,
      path: '/employer/tools',
      color: 'text-rose-500',
    },
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Employer Quick Navigation</CardTitle>
        <CardDescription>
          Easily access all employer features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-start p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className={`mr-3 ${item.color}`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
