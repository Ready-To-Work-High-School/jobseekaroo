
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  RefreshCw, 
  Filter, 
  Plus, 
  FileText, 
  Download, 
  MessageCircle 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KanbanHeaderProps {
  isEditing: boolean;
  onEditingToggle: () => void;
  onRefresh?: () => void;
  onAddCandidate?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onFilterChange?: (filter: string) => void;
  hasPremium?: boolean;
}

export const KanbanHeader: React.FC<KanbanHeaderProps> = ({
  isEditing,
  onEditingToggle,
  onRefresh,
  onAddCandidate,
  onExport,
  onImport,
  onFilterChange,
  hasPremium = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Button 
          variant={isEditing ? "default" : "outline"} 
          size="sm" 
          onClick={onEditingToggle}
        >
          <Settings className="h-4 w-4 mr-1" />
          {isEditing ? "Done Editing" : "Edit Stages"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRefresh}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onAddCandidate}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Candidate
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onFilterChange?.('all')}>
              All Candidates
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange?.('responded')}>
              Responded Only
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange?.('interested')}>
              Interested Only
            </DropdownMenuItem>
            {hasPremium && (
              <>
                <DropdownMenuItem onClick={() => onFilterChange?.('high_match')}>
                  High Skill Match
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterChange?.('recent')}>
                  Recently Added
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export Candidates
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onImport}>
              <Plus className="h-4 w-4 mr-2" />
              Import Candidates
            </DropdownMenuItem>
            {hasPremium && (
              <DropdownMenuItem>
                <MessageCircle className="h-4 w-4 mr-2" />
                Bulk Message
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
