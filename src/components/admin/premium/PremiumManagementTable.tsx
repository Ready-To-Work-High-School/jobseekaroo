
import { useState } from 'react';
import { UserProfile } from '@/types/user';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AlertTriangle, UserCheck } from 'lucide-react';
import { formatDate, formatTimePeriod } from '@/utils/format';

export interface PremiumManagementTableProps {
  users: UserProfile[];
  onCancelSubscription: (user: UserProfile) => Promise<void>;
}

const PremiumManagementTable = ({ users, onCancelSubscription }: PremiumManagementTableProps) => {
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  const handleCancel = async (user: UserProfile) => {
    setProcessingId(user.id);
    try {
      await onCancelSubscription(user);
      // Success is handled in parent component
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    } finally {
      setProcessingId(null);
    }
  };
  
  // Filter users with premium access
  const premiumUsers = users.filter(user => 
    user.premium_status || user.preferences?.hasPremium
  );
  
  if (premiumUsers.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-50 rounded-md">
        <div className="flex justify-center mb-4">
          <UserCheck className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-medium">No Premium Users</h3>
        <p className="text-muted-foreground mt-2">
          There are currently no users with premium access.
        </p>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Premium Status</TableHead>
            <TableHead>Since</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {premiumUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="capitalize">{user.user_type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {user.premium_status ? (
                    <span className="capitalize">
                      {user.premium_status.replace(/_/g, ' ')}
                    </span>
                  ) : user.preferences?.hasPremium ? (
                    <span>Active</span>
                  ) : (
                    <span className="text-muted-foreground">None</span>
                  )}
                </div>
              </TableCell>
              <TableCell>{formatDate(user.updated_at || user.created_at)}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => handleCancel(user)}
                  variant="outline"
                  size="sm"
                  disabled={processingId === user.id}
                >
                  {processingId === user.id ? "Processing..." : "Cancel Premium"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PremiumManagementTable;
