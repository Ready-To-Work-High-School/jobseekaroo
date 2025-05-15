
import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ApplicationStatus, JobApplication } from '@/types/job';
import { useAuth } from '@/contexts/auth';
import ApplicationStatusBadge from './ApplicationStatusBadge';
import ApplicationForm from './applications/ApplicationForm';

interface ApplicationCardProps {
  application: JobApplication;
  onDelete: (id: string) => void;
}

const ApplicationCard = ({ application, onDelete }: ApplicationCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { updateApplication } = useAuth();

  const handleStatusChange = async (status: ApplicationStatus) => {
    try {
      await updateApplication(application.id, { status });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSaveEdit = async (updatedData: Partial<JobApplication>) => {
    try {
      await updateApplication(application.id, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  return (
    <>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{application.job_title}</h3>
              <p className="text-sm text-muted-foreground">{application.company}</p>
            </div>
            <ApplicationStatusBadge status={application.status} />
          </div>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm">
              <span className="font-medium mr-2">Applied:</span>
              <span>{format(new Date(application.applied_date), 'MMM d, yyyy')}</span>
            </div>
            
            {application.contact_name && (
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">Contact:</span>
                <span>{application.contact_name}</span>
              </div>
            )}
            
            {application.next_step && (
              <div className="flex flex-col text-sm">
                <span className="font-medium">Next Step:</span>
                <span>{application.next_step}</span>
                {application.next_step_date && (
                  <span className="text-xs text-muted-foreground">
                    Due: {format(new Date(application.next_step_date), 'MMM d, yyyy')}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {application.notes && (
            <div className="mt-3 p-2 bg-muted/50 rounded-md text-sm">
              <p className="font-medium text-xs mb-1">Notes:</p>
              <p className="whitespace-pre-wrap">{application.notes}</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between p-4 pt-0">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive hover:text-destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => handleStatusChange('interviewing')}
              disabled={application.status === 'interviewing'}
            >
              Mark as Interview
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handleStatusChange('accepted')}
              disabled={application.status === 'accepted'}
            >
              Mark as Accepted
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Application</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this job application? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onDelete(application.id);
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Application Dialog */}
      {isEditing && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Application</DialogTitle>
            </DialogHeader>
            {/* Replace with your edit form */}
            <p>Edit form will go here</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ApplicationCard;
