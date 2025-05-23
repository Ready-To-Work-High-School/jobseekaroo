
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircleOff, Clock, CreditCard, Users, UserCheck, ShieldCheck, GraduationCap, Briefcase } from 'lucide-react';

interface RedemptionCodeStatsProps {
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
}

const RedemptionCodeStats: React.FC<RedemptionCodeStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Codes</p>
            <h3 className="text-2xl font-bold">{stats.totalCodes}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full dark:bg-green-900/20">
            <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Used Codes</p>
            <h3 className="text-2xl font-bold">{stats.usedCodes}</h3>
            <p className="text-xs text-muted-foreground">
              {stats.totalCodes > 0 ? Math.round((stats.usedCodes / stats.totalCodes) * 100) : 0}% of total
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full dark:bg-blue-900/20">
            <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Student Codes</p>
            <h3 className="text-2xl font-bold">{stats.studentCodes}</h3>
            <p className="text-xs text-muted-foreground">
              {stats.totalCodes > 0 ? Math.round((stats.studentCodes / stats.totalCodes) * 100) : 0}% of total
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full dark:bg-red-900/20">
            <ShieldCheck className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">CEO Codes</p>
            <h3 className="text-2xl font-bold">{stats.employerCodes}</h3>
            <p className="text-xs text-muted-foreground">
              {stats.totalCodes > 0 ? Math.round((stats.employerCodes / stats.totalCodes) * 100) : 0}% of total
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="bg-amber-100 p-3 rounded-full dark:bg-amber-900/20">
            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Expiring Soon</p>
            <h3 className="text-2xl font-bold">{stats.expiringThisMonth}</h3>
            <p className="text-xs text-muted-foreground">
              {stats.totalCodes > 0 ? Math.round((stats.expiringThisMonth / stats.totalCodes) * 100) : 0}% of total
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedemptionCodeStats;
