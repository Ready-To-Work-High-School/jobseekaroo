
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { StatusDropdown } from './StatusDropdown';
import { ApplicationStatus } from '@/types/application';

interface ApplicationCardFooterProps {
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: ApplicationStatus) => void;
  isStatusDropdownOpen: boolean;
  setIsStatusDropdownOpen: (isOpen: boolean) => void;
  isLoading: boolean;
}

export const ApplicationCardFooter = ({
  onEdit,
  onDelete,
  onStatusChange,
  isStatusDropdownOpen,
  setIsStatusDropdownOpen,
  isLoading
}: ApplicationCardFooterProps) => {
  return (
    <CardFooter className="flex justify-between pt-0">
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        disabled={isLoading}
      >
        <Pencil className="h-4 w-4 mr-1" /> Edit
      </Button>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          disabled={isLoading}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
        
        <StatusDropdown
          application={{ status: 'applied' } as any} // Only status is used
          onStatusChange={onStatusChange}
          isLoading={isLoading}
          isOpen={isStatusDropdownOpen}
          setIsOpen={setIsStatusDropdownOpen}
        />
      </div>
    </CardFooter>
  );
};
