
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';

interface TrialStatsCardProps {
  trials: any[];
}

const TrialStatsCard = ({ trials }: TrialStatsCardProps) => {
  return (
    <div className="rounded-lg border p-4 bg-background/50">
      <h3 className="font-medium mb-2 flex items-center gap-2">
        <CalendarClock className="h-4 w-4" /> Trial Statistics
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Active Trials:</span>
          <span className="font-medium">
            {trials.filter(t => t.is_active).length}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Converted Trials:</span>
          <span className="font-medium">
            {trials.filter(t => t.converted).length}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Trials:</span>
          <span className="font-medium">{trials.length}</span>
        </div>
      </div>
    </div>
  );
};

export default TrialStatsCard;
