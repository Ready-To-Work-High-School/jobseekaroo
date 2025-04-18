
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarClock, X, Sparkles } from 'lucide-react';
import { formatDate, getRemainingDays } from './trialUtils';

interface TrialTableProps {
  trials: any[];
  onExtendTrial: (id: string, days: number) => void;
  onCancelTrial: (id: string) => void;
  onConvertTrial: (id: string) => void;
}

const TrialTable = ({ 
  trials,
  onExtendTrial,
  onCancelTrial,
  onConvertTrial
}: TrialTableProps) => {
  if (trials.length === 0) {
    return (
      <tr>
        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
          No free trials found matching your criteria
        </td>
      </tr>
    );
  }

  return (
    <>
      {trials.map((trial) => (
        <tr key={trial.id} className="border-t hover:bg-muted/50">
          <td className="px-4 py-3 text-sm">
            <div>
              <div className="font-medium">{trial.user_name}</div>
              <div className="text-xs text-muted-foreground">{trial.user_email}</div>
            </div>
          </td>
          <td className="px-4 py-3 text-sm capitalize">{trial.plan_type}</td>
          <td className="px-4 py-3 text-sm">{formatDate(trial.start_date)}</td>
          <td className="px-4 py-3 text-sm">
            {formatDate(trial.end_date)}
            {trial.is_active && (
              <div className="text-xs text-muted-foreground">
                ({getRemainingDays(trial.end_date)} days left)
              </div>
            )}
          </td>
          <td className="px-4 py-3 text-sm">
            {trial.converted ? (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                <Sparkles className="h-3 w-3 mr-1" />
                Converted
              </span>
            ) : trial.is_active ? (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                <CalendarClock className="h-3 w-3 mr-1" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                <X className="h-3 w-3 mr-1" />
                Expired
              </span>
            )}
          </td>
          <td className="px-4 py-3 text-sm">
            <div className="flex gap-2">
              {trial.is_active && !trial.converted && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onExtendTrial(trial.id, 7)}
                    title="Extend by 7 days"
                  >
                    +7d
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onConvertTrial(trial.id)}
                  >
                    Convert
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onCancelTrial(trial.id)}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {!trial.is_active && !trial.converted && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onExtendTrial(trial.id, 30)}
                >
                  Reactivate
                </Button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TrialTable;
