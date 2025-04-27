
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw, Filter } from "lucide-react";

interface KanbanHeaderProps {
  isEditing: boolean;
  onEditingToggle: () => void;
}

export const KanbanHeader: React.FC<KanbanHeaderProps> = ({
  isEditing,
  onEditingToggle,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Button 
          variant={isEditing ? "default" : "outline"} 
          size="sm" 
          onClick={onEditingToggle}
        >
          <Settings className="h-4 w-4 mr-1" />
          {isEditing ? "Done Editing" : "Edit Stages"}
        </Button>
        
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-1" />
          Filter
        </Button>
      </div>
    </div>
  );
};
