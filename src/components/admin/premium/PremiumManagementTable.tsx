
import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserProfile } from '@/types/user';

interface PremiumManagementTableProps {
  users: UserProfile[];
  onGrantAccess: (userId: string) => void;
  onRevokeAccess: (userId: string) => void;
}

const PremiumManagementTable = ({ users, onGrantAccess, onRevokeAccess }: PremiumManagementTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>Premium Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const hasPremium = user.premium_status && 
              !user.premium_status.includes('Free') && 
              !user.premium_status.includes('cancelled');
            
            return (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email || 'N/A'}</TableCell>
                <TableCell>
                  {user.user_type === 'admin' ? (
                    <Badge variant="destructive">Admin</Badge>
                  ) : user.user_type === 'employer' ? (
                    <Badge variant="default">Employer</Badge>
                  ) : user.user_type === 'student' ? (
                    <Badge variant="secondary">Student</Badge>
                  ) : user.user_type === 'teacher' ? (
                    <Badge variant="outline">Teacher</Badge>
                  ) : user.user_type === 'school' ? (
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">School</Badge>
                  ) : (
                    <Badge variant="outline">Unknown</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {hasPremium ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> {user.premium_status}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">{user.premium_status || 'Free'}</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {hasPremium ? (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => onRevokeAccess(user.id)}
                      className="inline-flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Revoke
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => onGrantAccess(user.id)}
                      className="inline-flex items-center"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Grant
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PremiumManagementTable;
