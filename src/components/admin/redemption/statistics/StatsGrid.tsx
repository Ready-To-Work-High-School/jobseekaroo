
import React from 'react';
import { CheckCircle, UserCircle, Briefcase, Clock } from 'lucide-react';
import StatsCard from './StatsCard';

interface StatsGridProps {
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const { totalCodes, usedCodes, studentCodes, employerCodes, expiringThisMonth } = stats;
  
  const getPercentage = (value: number) => totalCodes > 0 ? Math.round((value / totalCodes) * 100) : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <StatsCard 
        title="Total Codes"
        value={totalCodes}
        icon={<CheckCircle />}
        iconBgColor="bg-primary/10"
        iconColor="text-primary"
      />
      
      <StatsCard 
        title="Used Codes"
        value={usedCodes}
        icon={<UserCircle />}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        secondaryText={`${getPercentage(usedCodes)}% of total`}
      />
      
      <StatsCard 
        title="Student Codes"
        value={studentCodes}
        icon={<UserCircle />}
        iconBgColor="bg-indigo-100"
        iconColor="text-indigo-600"
        percentage={getPercentage(studentCodes)}
        progressColor="bg-indigo-600"
      />
      
      <StatsCard 
        title="Employer Codes"
        value={employerCodes}
        icon={<Briefcase />}
        iconBgColor="bg-amber-100"
        iconColor="text-amber-600"
        percentage={getPercentage(employerCodes)}
        progressColor="bg-amber-600"
      />
      
      <StatsCard 
        title="Expiring Soon"
        value={expiringThisMonth}
        icon={<Clock />}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
        secondaryText="This month"
      />
    </div>
  );
};

export default StatsGrid;
