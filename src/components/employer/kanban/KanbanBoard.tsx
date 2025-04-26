
import React from 'react';
import { KanbanColumn } from './KanbanColumn';
import { KanbanItem } from './KanbanItem';

interface KanbanStage {
  id: string;
  title: string;
  items: KanbanItem[];
}

interface KanbanItem {
  id: string;
  studentId: string;
  name: string;
  grade: number;
  academy: string;
  avatar?: string;
  status: 'pending' | 'interviewing' | 'selected' | 'rejected' | 'hired' | null;
  notes: string;
}

interface KanbanBoardProps {
  stages: KanbanStage[];
  onMoveItem: (itemId: string, fromStageId: string, toStageId: string) => void;
  onUpdateItem: (itemId: string, stageId: string, updates: Partial<KanbanItem>) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ stages, onMoveItem, onUpdateItem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
      {stages.map(stage => (
        <KanbanColumn
          key={stage.id}
          id={stage.id}
          title={stage.title}
          itemCount={stage.items.length}
          onMoveItem={onMoveItem}
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
