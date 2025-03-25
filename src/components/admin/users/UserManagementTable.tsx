
import React from 'react';
import { UserProfile } from '@/types/user';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MoreHorizontal, ShieldCheck, GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import { UserTableEmptyState, UserTableLoadingState } from './UserTableEmptyState';

interface UserManagementTableProps {
  users: UserProfile[];
  isLoading: boolean;
  onViewDetails: (user: UserProfile) => void;
  onUpdateUserType: (userId: string, userType: 'student' | 'employer' | 'admin' | 'teacher') => Promise<boolean>;
}

const UserManagementTable: React.FC<UserManagementTableProps> = ({
  users,
  isLoading,
  onViewDetails,
  onUpdateUserType,
}) => {
  if (isLoading) {
    return <UserTableLoadingState />;
  }

  if (users.length === 0) {
    return <UserTableEmptyState />;
  }

  const formatDate = (date?: string | Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getUserTypeIcon = (userType?: string) => {
    switch (userType) {
      case 'admin':
        return <ShieldCheck className="h-4 w-4 text-red-500" />;
      case 'student':
        return <GraduationCap className="h-4 w-4 text-blue-500" />;
      case 'employer':
        return <Briefcase className="h-4 w-4 text-green-500" />;
      case 'teacher':
        return <BookOpen className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getUserTypeBadge = (userType?: string) => {
    switch (userType) {
      case 'admin':
        return <Badge variant="destructive">Admin</Badge>;
      case 'student':
        return <Badge variant="default">Student</Badge>;
      case 'employer':
        return <Badge variant="success">Employer</Badge>;
      case 'teacher':
        return <Badge variant="warning">Teacher</Badge>;
      default:
        return <Badge variant="outline">Basic</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.first_name || user.last_name
                  ? `${user.first_name || ''} ${user.last_name || ''}`
                  : 'Unknown Name'}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getUserTypeIcon(user.user_type)}
                  <span>{getUserTypeBadge(user.user_type)}</span>
                </div>
              </TableCell>
              <TableCell>
                {user.redeemed_at ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Redeemed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Basic
                  </Badge>
                )}
              </TableCell>
              <TableCell>{formatDate(user.created_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(user)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={() => onViewDetails(user)}
                      >
                        View Details
                      </DropdownMenuItem>
                      {user.user_type !== 'student' && (
                        <DropdownMenuItem
                          onSelect={() => onUpdateUserType(user.id, 'student')}
                        >
                          Change to Student
                        </DropdownMenuItem>
                      )}
                      {user.user_type !== 'employer' && (
                        <DropdownMenuItem
                          onSelect={() => onUpdateUserType(user.id, 'employer')}
                        >
                          Change to Employer
                        </DropdownMenuItem>
                      )}
                      {user.user_type !== 'teacher' && (
                        <DropdownMenuItem
                          onSelect={() => onUpdateUserType(user.id, 'teacher')}
                        >
                          Change to Teacher
                        </DropdownMenuItem>
                      )}
                      {user.user_type !== 'admin' && (
                        <DropdownMenuItem
                          onSelect={() => onUpdateUserType(user.id, 'admin')}
                        >
                          Change to Admin
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
