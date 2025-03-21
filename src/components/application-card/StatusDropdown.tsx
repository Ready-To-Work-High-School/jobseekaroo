
import { ApplicationStatusBadge } from '@/components/ApplicationStatusBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { StatusDropdownProps } from './types';

export const StatusDropdown = ({
  application,
  onStatusChange,
  isLoading,
  isOpen,
  setIsOpen
}: StatusDropdownProps) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="sm" disabled={isLoading}>
          Update Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem onClick={() => onStatusChange('applied')}>
          <ApplicationStatusBadge status="applied" className="w-full justify-start" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange('interviewing')}>
          <ApplicationStatusBadge status="interviewing" className="w-full justify-start" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange('offered')}>
          <ApplicationStatusBadge status="offered" className="w-full justify-start" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange('accepted')}>
          <ApplicationStatusBadge status="accepted" className="w-full justify-start" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange('rejected')}>
          <ApplicationStatusBadge status="rejected" className="w-full justify-start" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange('withdrawn')}>
          <ApplicationStatusBadge status="withdrawn" className="w-full justify-start" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
