
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface RedemptionCodeTabsListProps {
  totalCodes: number;
  unusedCount: number;
  usedCount: number;
  studentCount: number;
  employerCount: number;
}

const RedemptionCodeTabsList: React.FC<RedemptionCodeTabsListProps> = ({
  totalCodes,
  unusedCount,
  usedCount,
  studentCount,
  employerCount
}) => {
  return (
    <TabsList className="mb-4 w-full overflow-x-auto flex-wrap sm:flex-nowrap h-auto p-1">
      <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
        All Codes
        <Badge variant="outline" className="ml-2 bg-background text-foreground">
          {totalCodes}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="unused" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
        Unused
        <Badge variant="outline" className="ml-2 bg-background text-foreground">
          {totalCodes > 0 ? unusedCount : '—'}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="used" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
        Used
        <Badge variant="outline" className="ml-2 bg-background text-foreground">
          {totalCodes > 0 ? usedCount : '—'}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="students" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
        Students
        <Badge variant="outline" className="ml-2 bg-background text-foreground">
          {totalCodes > 0 ? studentCount : '—'}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="employers" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
        Employers
        <Badge variant="outline" className="ml-2 bg-background text-foreground">
          {totalCodes > 0 ? employerCount : '—'}
        </Badge>
      </TabsTrigger>
    </TabsList>
  );
};

export default RedemptionCodeTabsList;
