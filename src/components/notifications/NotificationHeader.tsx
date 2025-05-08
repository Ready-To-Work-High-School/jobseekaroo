
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface NotificationHeaderProps {
  onFilterClick: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ onFilterClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with the latest information</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onFilterClick}
        className="gap-2"
      >
        <Filter className="h-4 w-4" />
        <span>Filter</span>
      </Button>
    </div>
  );
};

export default NotificationHeader;
