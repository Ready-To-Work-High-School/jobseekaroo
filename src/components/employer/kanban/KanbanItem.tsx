
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
import { Button } from '@/components/ui/button';
import { GripVertical, Save, X } from 'lucide-react';
import { KanbanItem as KanbanItemType } from './types';
import { getInitials } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  const [expandDetails, setExpandDetails] = useState(false);
  
  // Configure drag source
  const [{ isDragging }, drag, preview] = useDrag({
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

  // Get status badge style
  const getStatusBadgeStyle = () => {
    switch (item.status) {
      case 'contact_sent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'replied':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'interested':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'not_interested':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Map status to display text
  const getStatusText = () => {
    switch (item.status) {
      case 'contact_sent': return 'Contact Sent';
      case 'replied': return 'Replied';
      case 'interested': return 'Interested';
      case 'scheduled': return 'Interview Scheduled';
      case 'not_interested': return 'Not Interested';
      default: return 'No Status';
    }
  };

  return (
    <Card 
      ref={preview}
      className={`mb-2 transition-all ${isDragging ? 'opacity-50' : 'opacity-100'} ${expandDetails ? 'ring-1 ring-primary' : ''}`}
    >
      <CardHeader className="p-3 pb-2 flex flex-row justify-between items-start">
        <div className="flex items-center gap-2 w-full">
          <div ref={drag} className="cursor-move p-0.5 hover:text-primary">
            <Tooltip>
              <TooltipTrigger>
                <GripVertical className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent side="bottom">Drag to move</TooltipContent>
            </Tooltip>
          </div>
          
          <Avatar className="h-7 w-7">
            {item.avatar ? (
              <AvatarImage src={item.avatar} alt={item.name} />
            ) : (
              <AvatarFallback>{getInitials(item.name)}</AvatarFallback>
            )}
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate" title={item.name}>{item.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>Grade: {item.grade}</span>
              {item.status && (
                <Badge variant="outline" className={`py-0 px-1.5 h-4 text-xs ${getStatusBadgeStyle()}`}>
                  {getStatusText()}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <Badge 
          variant="outline" 
          className={`${getBadgeStyle()} shrink-0`}
        >
          {item.academy || 'General'}
        </Badge>
      </CardHeader>
      
      <CardContent className="p-3 pt-1">
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="ghost" 
            size="sm"
            className="text-xs h-7 px-2 hover:bg-secondary"
            onClick={() => setExpandDetails(!expandDetails)}
          >
            {expandDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>
        
        {expandDetails && (
          <Select value={item.status || ''} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-8 text-xs mb-2 w-full">
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
        )}
        
        {editing ? (
          <div className="space-y-2">
            <Textarea
              value={notes}
              onChange={e => handleNotesChange(e.target.value)}
              placeholder="Add notes..."
              className="h-20 text-xs"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setEditing(false)} 
                className="h-7 p-0 w-7"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleNotesSave} 
                className="h-7"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => setEditing(true)}
            className={`text-xs ${notes ? 'text-foreground' : 'text-muted-foreground italic'} min-h-[40px] cursor-text p-2 rounded hover:bg-secondary/20`}
          >
            {notes ? notes : 'Click to add notes...'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
