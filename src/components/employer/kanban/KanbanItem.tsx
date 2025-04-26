
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KanbanItem as KanbanItemType } from './types';

interface KanbanItemProps {
  item: KanbanItemType;
  stageId: string;
  onUpdate: (updates: Partial<KanbanItemType>) => void;
}

export const KanbanItem: React.FC<KanbanItemProps> = ({ item, stageId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(item.notes || '');

  // Set up drag source
  const [{ isDragging }, drag] = useDrag({
    type: 'kanbanItem',
    item: { id: item.id, currentStageId: stageId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Function to update notes
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  // Function to save notes when focus is lost
  const handleNotesSave = () => {
    if (notes !== item.notes) {
      onUpdate({ notes });
    }
    setIsEditing(false);
  };

  // Function to update status
  const handleStatusChange = (value: string) => {
    onUpdate({ status: value as any });
  };

  // Get status badge color
  const getStatusColor = () => {
    switch (item.status) {
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'interviewing': return 'bg-purple-100 text-purple-700';
      case 'selected': return 'bg-amber-100 text-amber-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'hired': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Apply styling based on drag state
  const itemStyle = isDragging
    ? 'opacity-50'
    : '';

  return (
    <div
      ref={drag}
      className={`mb-2 ${itemStyle}`}
      data-testid="kanban-item"
    >
      <Card className="bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-8 w-8">
              {item.avatar ? (
                <AvatarImage src={item.avatar} alt={item.name} />
              ) : (
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{item.name}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Grade {item.grade}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground truncate">{item.academy}</span>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <Select 
              value={item.status || "pending"}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue placeholder="Set status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="selected">Selected</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {item.status && (
            <Badge className={`${getStatusColor()} mb-2 text-xs py-0`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
          )}
          
          {isEditing ? (
            <Textarea 
              value={notes}
              onChange={handleNotesChange}
              onBlur={handleNotesSave}
              className="text-xs h-20 resize-none"
              placeholder="Add notes..."
              autoFocus
            />
          ) : (
            <div 
              className="text-xs p-1 border border-dashed border-gray-200 rounded min-h-[3rem] cursor-text"
              onClick={() => setIsEditing(true)}
            >
              {notes || <span className="text-muted-foreground">Add notes...</span>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
