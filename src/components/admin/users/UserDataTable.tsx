
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, UserCheck, UserCog, UserX, Mail, Eye } from 'lucide-react';
import { UserProfile } from '@/types/user';

interface UserDataTableProps {
  users: UserProfile[];
  isLoading?: boolean;
  onViewDetails?: (userId: string) => void;
  onSuspend?: (userId: string) => void;
  onActivate?: (userId: string) => void;
  onGrantAdmin?: (userId: string) => void;
  onRevokeAdmin?: (userId: string) => void;
  onSendMessage?: (userId: string) => void;
}

const UserDataTable: React.FC<UserDataTableProps> = ({
  users,
  isLoading = false,
  onViewDetails,
  onSuspend,
  onActivate,
  onGrantAdmin,
  onRevokeAdmin,
  onSendMessage,
}) => {
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
        No users found matching the criteria.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className="capitalize">{user.user_type || 'student'}</span>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onViewDetails?.(user.id)}>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSendMessage?.(user.id)}>
                      <Mail className="mr-2 h-4 w-4" /> Send Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.user_type === 'admin' ? (
                      <DropdownMenuItem onClick={() => onRevokeAdmin?.(user.id)}>
                        <UserX className="mr-2 h-4 w-4" /> Remove Admin
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onGrantAdmin?.(user.id)}>
                        <UserCog className="mr-2 h-4 w-4" /> Make Admin
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onActivate?.(user.id)}>
                      <UserCheck className="mr-2 h-4 w-4" /> Activate Account
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onSuspend?.(user.id)}
                      className="text-destructive"
                    >
                      <UserX className="mr-2 h-4 w-4" /> Suspend Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserDataTable;
