
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2, Lock } from 'lucide-react';
import { KanbanStage } from './types';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface KanbanStageCustomizationProps {
  stages: KanbanStage[];
  newStageTitle: string;
  hasPremium?: boolean;
  onNewStageTitleChange: (value: string) => void;
  onAddStage: () => void;
  onRemoveStage: (stageId: string) => void;
}

export const KanbanStageCustomization: React.FC<KanbanStageCustomizationProps> = ({
  stages,
  newStageTitle,
  hasPremium = false,
  onNewStageTitleChange,
  onAddStage,
  onRemoveStage,
}) => {
  return (
    <div className="bg-muted p-4 rounded-md mb-6 border">
      <h3 className="font-medium mb-3">Customize Pipeline Stages</h3>
      
      <div className="flex flex-wrap gap-4 mb-4">
        {stages.map(stage => (
          <div key={stage.id} className="flex items-center gap-2 bg-background p-2 rounded-md border">
            <span>{stage.title}</span>
            {stage.id !== '1' ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onRemoveStage(stage.id)}
                disabled={!hasPremium}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-6 w-6 flex items-center justify-center">
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Initial stage cannot be removed</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <Input
          placeholder="New stage name..."
          value={newStageTitle}
          onChange={e => onNewStageTitleChange(e.target.value)}
          disabled={!hasPremium}
        />
        <Button 
          onClick={onAddStage} 
          disabled={!hasPremium || !newStageTitle.trim()}
          size="sm"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Add Stage
        </Button>
        
        {!hasPremium && (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 ml-auto">
            Premium Feature
          </Badge>
        )}
      </div>
      
      {!hasPremium && (
        <p className="text-xs text-muted-foreground mt-2">
          Upgrade to premium to customize your hiring pipeline with additional stages.
        </p>
      )}
    </div>
  );
};
