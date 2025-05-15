
import React from 'react';
import { UserProfile } from '@/types/user';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/format';
import { Badge } from '@/components/ui/badge';

export interface PremiumManagementTableProps {
  users: UserProfile[];
  onCancelSubscription: (user: UserProfile) => Promise<void>;
}

const PremiumManagementTable: React.FC<PremiumManagementTableProps> = ({ users, onCancelSubscription }) => {
  const getStatusBadge = (status: string | undefined) => {
    if (!status) return <Badge variant="outline">None</Badge>;
    
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'trial':
        return <Badge variant="warning">Trial</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subscription Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No premium users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getStatusBadge(user.premium_status)}</TableCell>
                <TableCell>{user.user_type}</TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCancelSubscription(user)}
                    disabled={!user.premium_status || user.premium_status.toLowerCase() === 'cancelled'}
                  >
                    Cancel Subscription
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PremiumManagementTable;
