
import React, { useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { KanbanItem } from './KanbanItem';
import { KanbanItem as KanbanItemType, KanbanStage } from './types';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface KanbanBoardProps {
  stages: KanbanStage[];
  onMoveItem: (itemId: string, fromStageId: string, toStageId: string) => void;
  onUpdateItem: (itemId: string, stageId: string, updates: Partial<KanbanItemType>) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ stages, onMoveItem, onUpdateItem }) => {
  const { toast } = useToast();
  const [focusedStage, setFocusedStage] = useState<string | null>(null);

  const handleAddToStage = (stageId: string) => {
    toast({
      title: "Feature coming soon",
      description: "Adding candidates directly to stages will be available soon."
    });
  };

  const handleFilterStage = (stageId: string) => {
    toast({
      title: "Stage filter applied",
      description: "Filtering candidates in this stage."
    });
    setFocusedStage(stageId === focusedStage ? null : stageId);
  };

  // If there are no stages, show empty state
  if (stages.length === 0) {
    return (
      <Card className="mt-4">
        <CardHeader className="text-center">
          <CardTitle>No Pipeline Stages</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-muted-foreground">
            Your candidate pipeline has no stages. Click "Edit Stages" to create your hiring pipeline.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map(stage => (
        <KanbanColumn
          key={stage.id}
          id={stage.id}
          title={stage.title}
          itemCount={stage.items.length}
          onMoveItem={onMoveItem}
          onAddNew={() => handleAddToStage(stage.id)}
          onFilter={() => handleFilterStage(stage.id)}
        >
          {stage.items.map(item => (
            <KanbanItem
              key={item.id}
              item={item}
              stageId={stage.id}
              onUpdate={(updates) => onUpdateItem(item.id, stage.id, updates)}
            />
          ))}
        </KanbanColumn>
      ))}
    </div>
  );
};

export default KanbanBoard;
