
import React, { useState } from 'react';
import { UserProfile } from '@/types/user';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Search, User, Briefcase, BadgeCheck, X } from 'lucide-react';
import UserDetailDialog from './UserDetailDialog';

interface UserDataTableProps {
  users: UserProfile[];
  loading: boolean;
}

const UserDataTable = ({ users, loading }: UserDataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.email?.toLowerCase().includes(searchTermLower) ||
      user.first_name?.toLowerCase().includes(searchTermLower) ||
      user.last_name?.toLowerCase().includes(searchTermLower) ||
      user.company_name?.toLowerCase().includes(searchTermLower)
    );
  });
  
  const handleViewDetails = (user: UserProfile) => {
    setSelectedUser(user);
    setShowDetail(true);
  };
  
  const getUserTypeIcon = (userType?: string) => {
    switch(userType) {
      case 'student':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'employer':
        return <Briefcase className="h-4 w-4 text-amber-500" />;
      case 'admin':
        return <BadgeCheck className="h-4 w-4 text-green-500" />;
      default:
        return <X className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search users..." 
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{user.first_name} {user.last_name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {getUserTypeIcon(user.user_type)}
                    <span className="capitalize">{user.user_type || 'Unknown'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {user.created_at && format(new Date(user.created_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  {user.redeemed_at ? (
                    <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">
                      Verified
                    </span>
                  ) : (
                    <span className="text-xs bg-amber-100 text-amber-800 py-1 px-2 rounded-full">
                      Pending
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewDetails(user)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {selectedUser && (
        <UserDetailDialog
          open={showDetail}
          onOpenChange={setShowDetail}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserDataTable;
