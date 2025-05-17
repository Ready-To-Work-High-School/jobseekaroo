
import React from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Issue {
  id: string;
  title: string;
  description: string;
  solution: string;
}

interface IssueItemProps {
  issue: Issue;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const IssueItem: React.FC<IssueItemProps> = ({
  issue,
  isSelected,
  onSelect,
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <button
        onClick={() => onSelect(isSelected ? '' : issue.id)}
        className={cn(
          "w-full flex justify-between items-center p-3 text-left",
          isSelected ? "bg-muted/60" : "hover:bg-muted/30",
        )}
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-medium">{issue.title}</h3>
        </div>
        {isSelected ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {isSelected && (
        <div className="p-3 border-t">
          <p className="mb-3 text-sm">{issue.description}</p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2">Solution:</h4>
            <p className="text-sm">{issue.solution}</p>
          </div>
        </div>
      )}
    </div>
  );
};
