
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Users, GraduationCap, Briefcase, ShieldCheck, BookOpen } from 'lucide-react';

interface UserTypeStatisticsProps {
  stats: {
    total: number;
    student: number;
    employer: number;
    teacher: number;
    admin: number;
  };
  className?: string;
}

const UserTypeStatistics: React.FC<UserTypeStatisticsProps> = ({ stats, className }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.total,
      icon: <Users className="h-8 w-8 text-blue-600" />,
      className: 'bg-blue-50 border-blue-100',
      iconClass: 'bg-blue-100',
    },
    {
      title: 'Students',
      value: stats.student,
      icon: <GraduationCap className="h-8 w-8 text-indigo-600" />,
      className: 'bg-indigo-50 border-indigo-100',
      iconClass: 'bg-indigo-100',
    },
    {
      title: 'Employers',
      value: stats.employer,
      icon: <Briefcase className="h-8 w-8 text-green-600" />,
      className: 'bg-green-50 border-green-100',
      iconClass: 'bg-green-100',
    },
    {
      title: 'Teachers',
      value: stats.teacher,
      icon: <BookOpen className="h-8 w-8 text-amber-600" />,
      className: 'bg-amber-50 border-amber-100',
      iconClass: 'bg-amber-100',
    },
    {
      title: 'Admins',
      value: stats.admin,
      icon: <ShieldCheck className="h-8 w-8 text-red-600" />,
      className: 'bg-red-50 border-red-100',
      iconClass: 'bg-red-100',
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-5 gap-4", className)}>
      {statCards.map((stat, index) => (
        <Card 
          key={index} 
          className={cn("border shadow-sm", stat.className)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={cn("p-3 rounded-full", stat.iconClass)}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserTypeStatistics;
