
import React from 'react';
import { UserProfile } from '@/types/user';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface UserDetailDialogProps {
  user: UserProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDetailDialog = ({ user, open, onOpenChange }: UserDetailDialogProps) => {
  const formatDateString = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>User ID</Label>
                <p className="text-sm font-mono">{user.id}</p>
              </div>
              
              <div>
                <Label>Email</Label>
                <p className="text-sm">{user.email}</p>
              </div>
              
              <div>
                <Label>Name</Label>
                <p className="text-sm">{user.first_name} {user.last_name}</p>
              </div>
              
              <div>
                <Label>User Type</Label>
                <p className="text-sm capitalize">{user.user_type || 'Not specified'}</p>
              </div>
              
              {user.user_type === 'employer' && (
                <>
                  <div>
                    <Label>Company Name</Label>
                    <p className="text-sm">{user.company_name || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <Label>Company Website</Label>
                    <p className="text-sm">{user.company_website || 'N/A'}</p>
                  </div>
                </>
              )}
              
              <div>
                <Label>Account Created</Label>
                <p className="text-sm">{formatDateString(user.created_at)}</p>
              </div>
              
              <div>
                <Label>Last Updated</Label>
                <p className="text-sm">{formatDateString(user.updated_at)}</p>
              </div>
              
              <div>
                <Label>Code Redeemed</Label>
                <div className="flex items-center gap-2">
                  <p className="text-sm">{user.redeemed_code || 'None'}</p>
                  {user.redeemed_at && (
                    <Badge variant="outline" className="bg-green-50 text-green-800">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              
              {user.redeemed_at && (
                <div>
                  <Label>Redeemed Date</Label>
                  <p className="text-sm">{formatDateString(user.redeemed_at)}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <p className="text-muted-foreground py-8 text-center">
              User activity information will be available in a future update.
            </p>
          </TabsContent>
          
          <TabsContent value="verification">
            <p className="text-muted-foreground py-8 text-center">
              Verification details will be available in a future update.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
