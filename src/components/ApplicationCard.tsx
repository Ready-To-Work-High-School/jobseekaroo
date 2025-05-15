
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Copy, ExternalLink, MoreVertical, Send, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { JobApplication, ApplicationStatus } from '@/types/job.d';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateApplicationStatus } from '@/lib/supabase/queries';
import ApplicationStatusBadge from './ApplicationStatusBadge';

interface ApplicationCardProps {
  application: JobApplication;
  className?: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, className }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const { mutate: updateStatusMutation, isPending } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) => 
      updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Application status updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    },
  });

  const updateStatus = (status: ApplicationStatus) => {
    updateStatusMutation({ id: application.id, status });
  };

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    const statusUpdates: Record<string, () => void> = {
      applied: () => updateStatus('applied'),
      interviewing: () => updateStatus('interviewing'),
      rejected: () => updateStatus('rejected'),
      accepted: () => updateStatus('accepted'),
      pending: () => updateStatus('pending'),
      hired: () => updateStatus('hired'),
      withdrawn: () => updateStatus('withdrawn'),
      offered: () => updateStatus('offered'),
    };

    const updateFn = statusUpdates[newStatus];
    if (updateFn) updateFn();
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="mr-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <CardTitle className="text-base font-semibold">{application.contact_name || 'No Contact Name'}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{application.contact_email || 'No Contact Email'}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Application Status:</p>
          <ApplicationStatusBadge status={application.status} />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Applied Date:</p>
          <p className="text-sm text-muted-foreground">{format(new Date(application.applied_date), 'MMM dd, yyyy')}</p>
        </div>
        {application.next_step && (
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Next Step:</p>
            <p className="text-sm text-muted-foreground">{application.next_step}</p>
          </div>
        )}
        {application.next_step_date && (
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Next Step Date:</p>
            <p className="text-sm text-muted-foreground">{format(new Date(application.next_step_date), 'MMM dd, yyyy')}</p>
          </div>
        )}
        {application.notes && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Notes:</p>
            <p className="text-sm text-muted-foreground">{application.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Withdraw
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ExternalLink className="mr-2 h-4 w-4" />
              <a href={`/jobs/${application.job_id}`} target="_blank" rel="noopener noreferrer">
                View Job
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently withdraw your application from this job.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleStatusChange('withdrawn');
                  setOpen(false);
                }}
              >
                Withdraw
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
