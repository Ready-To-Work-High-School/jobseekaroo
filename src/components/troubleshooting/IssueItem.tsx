
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CommonIssue } from './types';

interface IssueItemProps {
  issue: CommonIssue;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const IssueItem = ({ issue, isSelected, onSelect }: IssueItemProps) => {
  return (
    <div
      className={`p-4 rounded-lg border transition-colors cursor-pointer hover:bg-accent ${
        isSelected ? 'bg-accent' : ''
      }`}
      onClick={() => onSelect(issue.id)}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <issue.icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">{issue.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {issue.description}
          </p>
          {isSelected && (
            <Alert>
              <AlertDescription>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  {issue.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
