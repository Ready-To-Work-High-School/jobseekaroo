
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, GraduationCap, Save, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface KanbanItemProps {
  item: {
    id: string;
    studentId: string;
    name: string;
    grade: number;
    academy: string;
    avatar?: string;
    status: 'pending' | 'interviewing' | 'selected' | 'rejected' | 'hired' | null;
    notes: string;
  };
  stageId: string;
  onUpdate: (updates: Partial<typeof item>) => void;
}

export const KanbanItem: React.FC<KanbanItemProps> = ({ item, stageId, onUpdate }) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(item.notes || '');
  
  // Set up drag source
  const [{ isDragging }, drag] = useDrag({
    type: 'kanbanItem',
    item: { id: item.id, currentStageId: stageId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const getStatusBadgeStyles = () => {
    switch (item.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interviewing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'selected':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hired':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: '⏳' },
    { value: 'interviewing', label: 'Interviewing', icon: '📅' },
    { value: 'selected', label: 'Selected', icon: '✅' },
    { value: 'hired', label: 'Hired', icon: '🎉' },
    { value: 'rejected', label: 'Rejected', icon: '❌' },
    { value: null, label: 'No Status', icon: '⭕' },
  ];

  const handleSaveNotes = () => {
    onUpdate({ notes: notesValue });
    setIsEditingNotes(false);
  };

  // Get initials for avatar fallback
  const initials = item.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card
      ref={drag}
      className={`border shadow-sm hover:shadow-md cursor-grab transition-all ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <CardContent className="p-3 space-y-2">
        <div className="flex justify-between items-start">
          {/* Student info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.avatar} alt={item.name} />
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm line-clamp-1">{item.name}</p>
              <div className="flex items-center gap-1">
                <GraduationCap className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Grade {item.grade} - {item.academy}
                </span>
              </div>
            </div>
          </div>

          {/* Status dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <Badge 
                  variant="outline" 
                  className={`text-xs whitespace-nowrap ${item.status ? getStatusBadgeStyles() : 'bg-gray-100 text-gray-800'}`}
                >
                  {item.status ? statusOptions.find(s => s.value === item.status)?.label : 'Set Status'}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {statusOptions.map(status => (
                <DropdownMenuItem 
                  key={status.value || 'none'} 
                  onClick={() => onUpdate({ status: status.value as typeof item.status })}
                >
                  <span className="mr-2">{status.icon}</span>
                  {status.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Notes section */}
        {isEditingNotes ? (
          <div className="space-y-2 pt-1">
            <Textarea 
              value={notesValue}
              onChange={(e) => setNotesValue(e.target.value)}
              placeholder="Add notes about this candidate..."
              className="text-xs min-h-[60px]"
            />
            <div className="flex justify-end gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setIsEditingNotes(false);
                  setNotesValue(item.notes);
                }}
                className="h-7 px-2"
              >
                <X className="h-3.5 w-3.5 mr-1" /> Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleSaveNotes}
                className="h-7 px-2"
              >
                <Save className="h-3.5 w-3.5 mr-1" /> Save
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className="relative group pt-1"
            onClick={() => setIsEditingNotes(true)}
          >
            {item.notes ? (
              <p className="text-xs line-clamp-3 group-hover:bg-muted/50 p-1 rounded-sm cursor-text">
                {item.notes}
              </p>
            ) : (
              <p 
                className="text-xs text-muted-foreground italic p-1 group-hover:bg-muted/50 rounded-sm cursor-text"
              >
                Click to add notes...
              </p>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-1"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
