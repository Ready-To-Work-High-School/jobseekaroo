
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { UserProfile } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface UserDataTableProps {
  users: UserProfile[];
  isLoading: boolean;
  onEditUser: (user: UserProfile) => void;
}

const UserDataTable: React.FC<UserDataTableProps> = ({ users, isLoading, onEditUser }) => {
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
        No users found.
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.user_type || 'N/A'}</TableCell>
              <TableCell>
                {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => onEditUser(user)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserDataTable;
