
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface RedemptionCodeTabsListProps {
  totalCodes: number;
  unusedCount: number;
  usedCount: number;
  studentCount: number;
  employerCount: number;
  value?: string;
  onValueChange?: (value: string) => void;
}

const RedemptionCodeTabsList: React.FC<RedemptionCodeTabsListProps> = ({
  totalCodes,
  unusedCount,
  usedCount,
  studentCount,
  employerCount,
  value = 'all',
  onValueChange
}) => {
  return (
    <TabsList className="mb-4 grid grid-cols-5 sm:w-auto w-full">
      <TabsTrigger value="all" onClick={() => onValueChange?.('all')}>
        All
        <Badge variant="outline" className="ml-2 py-0 px-2 h-5 text-xs">
          {totalCodes}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="unused" onClick={() => onValueChange?.('unused')}>
        Unused
        <Badge variant="outline" className="ml-2 py-0 px-2 h-5 text-xs">
          {unusedCount}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="used" onClick={() => onValueChange?.('used')}>
        Used
        <Badge variant="outline" className="ml-2 py-0 px-2 h-5 text-xs">
          {usedCount}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="students" onClick={() => onValueChange?.('students')}>
        Students
        <Badge variant="outline" className="ml-2 py-0 px-2 h-5 text-xs">
          {studentCount}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="employers" onClick={() => onValueChange?.('employers')}>
        Employers
        <Badge variant="outline" className="ml-2 py-0 px-2 h-5 text-xs">
          {employerCount}
        </Badge>
      </TabsTrigger>
    </TabsList>
  );
};

export default RedemptionCodeTabsList;
