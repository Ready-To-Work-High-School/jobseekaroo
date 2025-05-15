
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AdminUser } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

export const useAdminUserManagement = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        throw error;
      }

      // Convert to AdminUser type
      const adminUsers: AdminUser[] = data.map(user => ({
        id: user.id,
        email: user.email || '',
        first_name: user.first_name,
        last_name: user.last_name,
        user_type: user.user_type as any,
        created_at: user.created_at,
        updated_at: user.updated_at,
        badges: user.badges,
        student_badges: user.student_badges
      }));

      setUsers(adminUsers);
    } catch (err: any) {
      setError(err);
      console.error('Error fetching users:', err);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserType = async (userId: string, userType: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ user_type: userType })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === userId ? { ...user, user_type: userType as any } : user
      ));

      toast({
        title: 'User updated',
        description: `User type set to ${userType}`,
      });
    } catch (err) {
      console.error('Error updating user type:', err);
      toast({
        title: 'Error',
        description: 'Failed to update user type',
        variant: 'destructive'
      });
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    try {
      // Delete the user using service role
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;

      setUsers(users.filter(user => user.id !== userId));
      
      toast({
        title: 'User deleted',
        description: 'User has been removed from the system',
      });
    } catch (err) {
      console.error('Error deleting user:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive'
      });
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    updateUserType,
    deleteUser,
  };
};

export default useAdminUserManagement;
