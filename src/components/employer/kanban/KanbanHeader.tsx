
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Save } from 'lucide-react';

interface KanbanHeaderProps {
  isEditing: boolean;
  onEditingToggle: () => void;
}

export const KanbanHeader: React.FC<KanbanHeaderProps> = ({
  isEditing,
  onEditingToggle,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Candidate Pipeline</h1>
        <p className="text-muted-foreground mt-1">
          Drag and drop candidates between stages to track their progress
        </p>
      </div>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={onEditingToggle}
      >
        {isEditing ? <Save className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
        {isEditing ? 'Save Layout' : 'Edit Stages'}
      </Button>
    </div>
  );
};
