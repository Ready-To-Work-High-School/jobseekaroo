
import React from 'react';
import { UserProfile } from '@/types/user';
import { Button } from '@/components/ui/button';
import { 
  Edit, 
  Trash2, 
  User, 
  Shield, 
  GraduationCap, 
  Briefcase,
  BookOpen, 
  MoreHorizontal 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import AccountTypeBadge from '@/components/layout/AccountTypeBadge';

interface UserManagementTableProps {
  users: UserProfile[];
  isLoading: boolean;
  onViewDetails: (user: UserProfile) => void;
  onUpdateUserType: (userId: string, userType: 'student' | 'employer' | 'admin' | 'teacher') => Promise<boolean>;
  onDeleteUser?: (userId: string) => Promise<boolean>;
}

const UserManagementTable: React.FC<UserManagementTableProps> = ({ 
  users, 
  isLoading, 
  onViewDetails,
  onUpdateUserType,
  onDeleteUser
}) => {
  const renderUserAvatar = (user: UserProfile) => {
    const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`;
    
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar_url || `https://avatar.vercel.sh/${user.email || user.id}.png`} />
        <AvatarFallback>{initials || <User size={16} />}</AvatarFallback>
      </Avatar>
    );
  };

  const handleDeleteUser = async (userId: string) => {
    if (!onDeleteUser) return;
    
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      await onDeleteUser(userId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No users found matching the current filters.
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {renderUserAvatar(user)}
                  <div>
                    <p className="font-medium">{user.first_name} {user.last_name}</p>
                    <p className="text-xs text-muted-foreground">{user.id.substring(0, 8)}...</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.email || 'N/A'}</TableCell>
              <TableCell>
                <AccountTypeBadge userProfile={user} />
              </TableCell>
              <TableCell>
                {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell>
                {user.redeemed_at ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Verified
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                    Unverified
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onViewDetails(user)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onUpdateUserType(user.id, 'admin')}>
                        <Shield className="h-3 w-3 mr-2" />
                        Make Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateUserType(user.id, 'student')}>
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Make Student
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateUserType(user.id, 'employer')}>
                        <Briefcase className="h-4 w-4 mr-2" />
                        Make Employer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateUserType(user.id, 'teacher')}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Make Teacher
                      </DropdownMenuItem>
                      {onDeleteUser && (
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagementTable;
