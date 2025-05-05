import React, { useState } from 'react';
import { UserProfile } from '@/types/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Shield, ShieldCheck, Briefcase, School, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface UserDetailDialogProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUserType: (userId: string, userType: 'student' | 'employer' | 'admin' | 'teacher') => Promise<boolean>;
  onDeleteUser?: (userId: string) => Promise<boolean>;
}

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateUserType,
  onDeleteUser
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUserType = async (userType: 'student' | 'employer' | 'admin' | 'teacher') => {
    setIsLoading(true);
    try {
      const success = await onUpdateUserType(user.id, userType);
      if (success) {
        toast({
          title: 'User updated',
          description: `User role updated to ${userType} successfully`,
        });
      }
    } catch (error) {
      console.error('Error updating user type:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!onDeleteUser) return;
    
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        const success = await onDeleteUser(user.id);
        if (success) {
          toast({
            title: 'User deleted',
            description: 'User has been permanently deleted',
          });
          onClose();
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete user',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getUserTypeBadge = () => {
    switch (user.user_type) {
      case 'admin':
        return <Badge variant="destructive" className="ml-2">Admin</Badge>;
      case 'student':
        return <Badge variant="default" className="ml-2">Student</Badge>;
      case 'employer':
        return <Badge variant="success" className="ml-2">Employer</Badge>;
      case 'teacher':
        return <Badge variant="warning" className="ml-2">Teacher</Badge>;
      default:
        return <Badge variant="outline" className="ml-2">Basic</Badge>;
    }
  };

  const getStatusBadge = () => {
    if (user.redeemed_at) {
      if (user.user_type === 'admin') {
        return <Badge variant="outline" className="bg-black text-white border-black font-semibold">CEO</Badge>;
      }
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>;
    }
    return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Unverified</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View and manage user account information
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage 
                src={user.avatar_url || `https://avatar.vercel.sh/${user.email || user.id}.png`} 
                alt={`${user.first_name} ${user.last_name}`} 
              />
              <AvatarFallback className="text-lg">
                {user.first_name?.[0]}{user.last_name?.[0] || <User />}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-lg font-semibold">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-1 flex items-center">
                {getUserTypeBadge()}
                <div className="ml-2">{getStatusBadge()}</div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Account ID</Label>
                <p className="text-sm">{user.id}</p>
              </div>
              <div>
                <Label>Created</Label>
                <p className="text-sm">
                  {user.created_at 
                    ? new Date(user.created_at).toLocaleDateString() 
                    : 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Verified</Label>
                <p className="text-sm">
                  {user.redeemed_at ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <Label>Current Role</Label>
                <p className="text-sm">
                  {user.user_type === 'admin' && user.redeemed_at ? 'CEO' : user.user_type || 'Standard User'}
                </p>
              </div>
            </div>

            {user.bio && (
              <div>
                <Label>Bio</Label>
                <p className="text-sm">{user.bio}</p>
              </div>
            )}

            {user.location && (
              <div>
                <Label>Location</Label>
                <p className="text-sm">{user.location}</p>
              </div>
            )}
          </div>
          
          <div>
            <Label>Change User Role</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleUpdateUserType('admin')}
                disabled={isLoading || user.user_type === 'admin'}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleUpdateUserType('student')}
                disabled={isLoading || user.user_type === 'student'}
              >
                <User className="w-4 h-4 mr-2" />
                Student
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleUpdateUserType('employer')}
                disabled={isLoading || user.user_type === 'employer'}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Employer
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleUpdateUserType('teacher')}
                disabled={isLoading || user.user_type === 'teacher'}
              >
                <School className="w-4 h-4 mr-2" />
                Teacher
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          {onDeleteUser && (
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
              disabled={isLoading}
              className="w-auto flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete User
            </Button>
          )}
          
          <Button onClick={onClose} disabled={isLoading}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
