
import React from 'react';
import { useDrop } from 'react-dnd';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KanbanColumnProps {
  id: string;
  title: string;
  itemCount: number;
  children: React.ReactNode;
  onMoveItem: (itemId: string, fromStageId: string, toStageId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  id, 
  title, 
  itemCount, 
  children, 
  onMoveItem 
}) => {
  // Set up drop target
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'kanbanItem',
    drop: (item: { id: string, currentStageId: string }) => {
      onMoveItem(item.id, item.currentStageId, id);
      return { stageId: id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Apply styling based on drag state
  const columnStyle = isOver && canDrop
    ? 'bg-primary/10 border-primary/30'
    : 'bg-card';

  // Get color for the column badge based on the column title
  const getBadgeColor = () => {
    switch(title.toLowerCase()) {
      case 'applied': return 'bg-blue-100 text-blue-700';
      case 'screening': return 'bg-purple-100 text-purple-700';
      case 'interview': return 'bg-amber-100 text-amber-700';
      case 'hired': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      ref={drop} 
      className={`flex flex-col h-[calc(100vh-15rem)] min-w-[250px] rounded-md border ${columnStyle} transition-colors`}
    >
      <Card className="h-full flex flex-col border-0 shadow-none">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">
                {title}
              </CardTitle>
              <Badge variant="secondary" className={`${getBadgeColor()} py-0 h-5`}>
                {itemCount}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 flex-grow overflow-y-auto space-y-2">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
