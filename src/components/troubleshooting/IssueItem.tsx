
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Issue {
  id: string;
  title: string;
  description: string;
  solution: string[];
}

interface IssueItemProps {
  issue: Issue;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const IssueItem = ({ issue, isSelected, onSelect }: IssueItemProps) => {
  const [solutionApplied, setSolutionApplied] = useState(false);
  
  return (
    <div className={cn(
      "border rounded-lg overflow-hidden transition-all",
      isSelected ? "border-primary" : "border-muted",
      solutionApplied && "bg-green-50 border-green-200"
    )}>
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => onSelect(isSelected ? '' : issue.id)}
      >
        <h3 className={cn(
          "font-medium flex items-center",
          solutionApplied && "text-green-600"
        )}>
          {solutionApplied && <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />}
          {issue.title}
        </h3>
        <div>
          {isSelected ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>
      
      {isSelected && (
        <div className="p-4 pt-0 border-t">
          <p className="text-muted-foreground mb-4">{issue.description}</p>
          
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Solution:</h4>
            <ol className="space-y-2 list-decimal pl-5">
              {issue.solution.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            
            <button
              onClick={() => setSolutionApplied(!solutionApplied)}
              className={cn(
                "w-full mt-4 py-2 px-4 rounded-md text-sm",
                solutionApplied
                  ? "bg-green-100 text-green-600 hover:bg-green-200"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              {solutionApplied ? "Mark as Unsolved" : "Mark as Solved"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueItem;
