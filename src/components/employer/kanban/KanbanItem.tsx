
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { KanbanItem as KanbanItemType } from './types';
import { getInitials } from '@/lib/utils';

interface KanbanItemProps {
  item: KanbanItemType;
  stageId: string;
  onUpdate: (updates: Partial<KanbanItemType>) => void;
}

export const KanbanItem: React.FC<KanbanItemProps> = ({
  item,
  stageId,
  onUpdate,
}) => {
  const [notes, setNotes] = useState(item.notes || '');
  const [editing, setEditing] = useState(false);
  
  // Configure drag source
  const [{ isDragging }, drag] = useDrag({
    type: 'kanbanItem',
    item: { id: item.id, currentStageId: stageId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleNotesChange = (value: string) => {
    setNotes(value);
  };

  const handleNotesSave = () => {
    onUpdate({ notes });
    setEditing(false);
  };

  const handleStatusChange = (value: string) => {
    onUpdate({ status: value });
  };

  // Get badge style based on academy
  const getBadgeStyle = () => {
    switch (item.academy?.toLowerCase()) {
      case 'entrepreneurship':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'nursing':
      case 'healthcare':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'it':
      case 'technology':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card 
      ref={drag}
      className={`mb-2 cursor-move transition-all ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <CardHeader className="p-3 pb-0 flex flex-row justify-between items-start">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            {item.avatar ? (
              <AvatarImage src={item.avatar} alt={item.name} />
            ) : (
              <AvatarFallback>{getInitials(item.name)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-medium text-sm">{item.name}</div>
            <div className="text-xs text-muted-foreground">
              Grade: {item.grade}
            </div>
          </div>
        </div>
        
        <Badge variant="outline" className={getBadgeStyle()}>
          {item.academy || 'General'}
        </Badge>
      </CardHeader>
      
      <CardContent className="p-3">
        <Select value={item.status || ''} onValueChange={handleStatusChange}>
          <SelectTrigger className="h-8 text-xs mb-2">
            <SelectValue placeholder="Set status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contact_sent">Contact Sent</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="interested">Interested</SelectItem>
            <SelectItem value="scheduled">Interview Scheduled</SelectItem>
            <SelectItem value="not_interested">Not Interested</SelectItem>
          </SelectContent>
        </Select>
        
        {editing ? (
          <div className="space-y-2">
            <Textarea
              value={notes}
              onChange={e => handleNotesChange(e.target.value)}
              placeholder="Add notes..."
              className="h-20 text-xs"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setEditing(false)} 
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button 
                onClick={handleNotesSave} 
                className="text-xs text-primary hover:text-primary/80"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => setEditing(true)}
            className="text-xs text-muted-foreground min-h-[40px] cursor-text"
          >
            {notes ? notes : 'Click to add notes...'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
