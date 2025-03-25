import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/user';
import { format } from 'date-fns';
import AccountTypeBadge from '@/components/layout/AccountTypeBadge';

interface UserDetailDialogProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUserType: (userId: string, userType: 'student' | 'employer' | 'admin' | 'teacher') => Promise<boolean>;
}

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateUserType,
}) => {
  const formatDate = (date?: string | Date | null) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'PPP');
  };

  const handleUpdateUserType = async (userType: 'student' | 'employer' | 'admin' | 'teacher') => {
    const success = await onUpdateUserType(user.id, userType);
    if (success) {
      // Keep dialog open to show updated user
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-2">
              {user.first_name && user.last_name ? (
                <span className="text-2xl font-bold text-primary">
                  {user.first_name[0]}{user.last_name[0]}
                </span>
              ) : (
                <span className="text-2xl font-bold text-primary">
                  ?
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold">
              {user.first_name || user.last_name 
                ? `${user.first_name || ''} ${user.last_name || ''}` 
                : 'Unknown Name'}
            </h3>
            <div className="flex justify-center mt-1">
              <AccountTypeBadge userProfile={user} />
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="text-sm font-medium truncate">{user.id}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Account Created</p>
              <p className="text-sm font-medium">{formatDate(user.created_at)}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Redeemed Code</p>
              <p className="text-sm font-medium">{user.redeemed_code || 'N/A'}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Redeemed Date</p>
              <p className="text-sm font-medium">{formatDate(user.redeemed_at)}</p>
            </div>
            
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Bio</p>
              <p className="text-sm font-medium">{user.bio || 'No bio provided'}</p>
            </div>
            
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-sm font-medium">{user.location || 'No location provided'}</p>
            </div>
            
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Skills</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm">No skills listed</p>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Change User Type</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                size="sm" 
                variant={user.user_type === 'student' ? 'default' : 'outline'}
                onClick={() => handleUpdateUserType('student')}
                disabled={user.user_type === 'student'}
              >
                Student
              </Button>
              <Button 
                size="sm" 
                variant={user.user_type === 'employer' ? 'default' : 'outline'}
                onClick={() => handleUpdateUserType('employer')}
                disabled={user.user_type === 'employer'}
              >
                Employer
              </Button>
              <Button 
                size="sm" 
                variant={user.user_type === 'teacher' ? 'default' : 'outline'}
                onClick={() => handleUpdateUserType('teacher')}
                disabled={user.user_type === 'teacher'}
              >
                Teacher
              </Button>
              <Button 
                size="sm" 
                variant={user.user_type === 'admin' ? 'destructive' : 'outline'}
                onClick={() => handleUpdateUserType('admin')}
                disabled={user.user_type === 'admin'}
              >
                Admin
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
