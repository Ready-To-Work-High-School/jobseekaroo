
import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface UserStats {
  student: number;
  employer: number;
  admin: number;
  teacher: number;
  total: number;
}

export interface AdminUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  created_at: string;
  last_sign_in_at?: string;
}

export function useAdminUserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats>({
    student: 0,
    employer: 0,
    admin: 0,
    teacher: 0,
    total: 0
  });
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch users from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, user_type, created_at');

      if (error) {
        throw error;
      }

      if (data) {
        setUsers(data as AdminUser[]);
        
        // Calculate stats
        const stats: UserStats = {
          student: 0,
          employer: 0,
          admin: 0,
          teacher: 0,
          total: data.length
        };
        
        data.forEach((user: any) => {
          if (user.user_type && stats[user.user_type as keyof Omit<UserStats, 'total'>] !== undefined) {
            stats[user.user_type as keyof Omit<UserStats, 'total'>]++;
          }
        });
        
        setUserStats(stats);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateUserType = async (userId: string, userType: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ user_type: userType })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, user_type: userType } : user
        )
      );

      toast({
        title: 'Success',
        description: 'User type updated successfully',
      });
      
      // Refresh user stats
      fetchUsers();
      
    } catch (error) {
      console.error('Error updating user type:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user type',
        variant: 'destructive'
      });
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // In a real implementation, you might want to call a secure admin function to delete users
      // This is just a placeholder implementation
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) {
        throw error;
      }

      // Update local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      // Close dialog if open
      setShowUserDialog(false);
      
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
      
      // Refresh user stats
      fetchUsers();
      
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive'
      });
    }
  };

  const handleViewUserDetails = (user: AdminUser) => {
    setSelectedUser(user);
    setShowUserDialog(true);
  };

  const handleFilterChange = (filters: any) => {
    // Implement filtering logic here
    console.log('Filtering users with:', filters);
    // For now, just refresh all users
    fetchUsers();
  };

  const exportUsers = () => {
    try {
      // Create CSV content
      const headers = ['ID', 'Email', 'First Name', 'Last Name', 'User Type', 'Created At'];
      const csvRows = [
        headers.join(','),
        ...users.map(user => [
          user.id,
          `"${user.email || ''}"`,
          `"${user.first_name || ''}"`,
          `"${user.last_name || ''}"`,
          `"${user.user_type || ''}"`,
          user.created_at
        ].join(','))
      ];
      
      const csvContent = csvRows.join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.click();
      
      toast({
        title: 'Success',
        description: 'User data exported successfully',
      });
    } catch (error) {
      console.error('Error exporting users:', error);
      toast({
        title: 'Error',
        description: 'Failed to export user data',
        variant: 'destructive'
      });
    }
  };

  return {
    users,
    isLoading,
    userStats,
    selectedUser,
    showUserDialog,
    fetchUsers,
    updateUserType,
    deleteUser,
    handleFilterChange,
    handleViewUserDetails,
    setShowUserDialog,
    exportUsers
  };
}
