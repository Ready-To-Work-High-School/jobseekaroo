
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format, isValid, parseISO } from 'date-fns';
import { Check, CalendarDays, Clock, Phone, Mail, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ApplicationStatusBadge from './ApplicationStatusBadge';
import { JobApplication, ApplicationStatus } from '@/types/application';
import { useAuth } from '@/contexts/AuthContext';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ApplicationCardProps {
  application: JobApplication;
  onUpdate: () => void;
}

const ApplicationCard = ({ application, onUpdate }: ApplicationCardProps) => {
  const [open, setOpen] = useState(false);
  const { deleteApplication, updateApplicationStatus } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;
    
    return format(date, 'MMM dd, yyyy');
  };
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteApplication(application.id);
    },
    onSuccess: () => {
      toast({
        title: "Application deleted",
        description: "The job application has been removed from tracking",
      });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      onUpdate();
    },
    onError: (error) => {
      console.error('Error deleting application:', error);
      toast({
        title: "Error",
        description: "Failed to delete the application",
        variant: "destructive",
      });
    }
  });
  
  // Status update mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ApplicationStatus }) => {
      await updateApplicationStatus(id, status);
    },
    onSuccess: () => {
      toast({ title: "Status updated" });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      onUpdate();
    },
    onError: (error) => {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  });
  
  const handleStatusChange = (newStatus: ApplicationStatus) => {
    statusMutation.mutate({ id: application.id, status: newStatus });
  };
  
  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center justify-between py-4 px-5 border-b">
          <div>
            <h3 className="font-medium mb-1">{application.job_title}</h3>
            <p className="text-muted-foreground text-sm">{application.company}</p>
          </div>
          <ApplicationStatusBadge status={application.status} />
        </div>
        
        <div className="p-5 space-y-4">
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Applied: {formatDate(application.applied_date)}</span>
          </div>
          
          {application.contact_name && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{application.contact_name}</span>
            </div>
          )}
          
          {application.contact_email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{application.contact_email}</span>
            </div>
          )}
          
          {application.next_step && (
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Next: {application.next_step}</span>
              {application.next_step_date && (
                <span className="ml-1">({formatDate(application.next_step_date)})</span>
              )}
            </div>
          )}
          
          {application.notes && (
            <div className="text-sm mt-2 text-muted-foreground">
              <p className="line-clamp-2">{application.notes}</p>
            </div>
          )}
        </div>
        
        <div className="border-t p-3 flex justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                Update Status <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange('applied')}>
                <Check className="mr-2 h-4 w-4" />
                Applied
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('interviewing')}>
                <Check className="mr-2 h-4 w-4" />
                Interviewing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('offered')}>
                <Check className="mr-2 h-4 w-4" />
                Offered
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('accepted')}>
                <Check className="mr-2 h-4 w-4" />
                Accepted
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleStatusChange('rejected')}>
                <Check className="mr-2 h-4 w-4" />
                Rejected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('withdrawn')}>
                <Check className="mr-2 h-4 w-4" />
                Withdrawn
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;

// Import the missing ChevronDown component
import { ChevronDown } from 'lucide-react';
