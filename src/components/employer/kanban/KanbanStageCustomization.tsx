
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { KanbanStage } from './types';

interface KanbanStageCustomizationProps {
  stages: KanbanStage[];
  newStageTitle: string;
  onNewStageTitleChange: (value: string) => void;
  onAddStage: () => void;
  onRemoveStage: (stageId: string) => void;
}

export const KanbanStageCustomization: React.FC<KanbanStageCustomizationProps> = ({
  stages,
  newStageTitle,
  onNewStageTitleChange,
  onAddStage,
  onRemoveStage,
}) => {
  return (
    <Card className="mb-6 bg-muted/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Customize Pipeline Stages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {stages.map(stage => (
              <Badge 
                key={stage.id} 
                variant="outline" 
                className="px-3 py-1.5 text-sm flex items-center gap-1 bg-card"
              >
                {stage.title}
                {stage.id !== '1' && (
                  <button 
                    onClick={() => onRemoveStage(stage.id)}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input 
              placeholder="New Stage Name"
              value={newStageTitle}
              onChange={(e) => onNewStageTitleChange(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={onAddStage} className="gap-1">
              <Plus className="h-4 w-4" /> Add Stage
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Note: Items from deleted stages will be moved back to the Applied stage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
