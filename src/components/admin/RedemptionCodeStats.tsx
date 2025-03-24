
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, UserCircle, Briefcase } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Codes</p>
              <h3 className="text-2xl font-bold">{stats.totalCodes}</h3>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Used Codes</p>
              <h3 className="text-2xl font-bold">{stats.usedCodes}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.totalCodes > 0 ? Math.round((stats.usedCodes / stats.totalCodes) * 100) : 0}% of total
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <UserCircle className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Student Codes</p>
              <h3 className="text-2xl font-bold">{stats.studentCodes}</h3>
            </div>
            <div className="bg-indigo-100 p-2 rounded-full">
              <UserCircle className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Employer Codes</p>
              <h3 className="text-2xl font-bold">{stats.employerCodes}</h3>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <Briefcase className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedemptionCodeStats;
