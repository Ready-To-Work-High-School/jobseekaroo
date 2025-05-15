
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/user';

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const { toast } = useToast();

  const userStats = {
    total: filteredUsers.length,
    student: filteredUsers.filter(user => user.user_type === 'student').length,
    employer: filteredUsers.filter(user => user.user_type === 'employer').length,
    teacher: filteredUsers.filter(user => user.user_type === 'teacher').length,
    admin: filteredUsers.filter(user => user.user_type === 'admin').length,
  };

  // Fetch users from Supabase
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform the data to match the UserProfile type
      const typedUsers = data?.map(user => user as unknown as UserProfile) || [];
      
      setUsers(typedUsers);
      setFilteredUsers(typedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      toast({
        title: 'Error fetching users',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update user type
  const updateUserType = async (userId: string, userType: 'student' | 'employer' | 'admin' | 'teacher') => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ user_type: userType })
        .eq('id', userId)
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      // Cast the returned data to UserProfile
      const updatedUser = data as unknown as UserProfile;

      // Update the users list with the updated user
      setUsers(prevUsers => 
        prevUsers.map(user => user.id === userId ? updatedUser : user)
      );
      
      setFilteredUsers(prevFilteredUsers => 
        prevFilteredUsers.map(user => user.id === userId ? updatedUser : user)
      );

      toast({
        title: 'User updated',
        description: `User has been updated to ${userType}`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating user:', error.message);
      toast({
        title: 'Error updating user',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  // Delete user
  const deleteUser = async (userId: string) => {
    try {
      // Note: In Supabase, deleting a user requires admin privileges
      // This is a simulated deletion that would need to be implemented
      // with a proper admin API or function
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        throw error;
      }

      // Remove user from local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setFilteredUsers(prevFilteredUsers => prevFilteredUsers.filter(user => user.id !== userId));
      
      toast({
        title: 'User deleted',
        description: 'User has been permanently deleted',
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting user:', error.message);
      toast({
        title: 'Error deleting user',
        description: 'Only Supabase administrators can delete users. This feature requires additional setup.',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    let filtered = [...users];

    if (filters.userType && filters.userType !== 'all') {
      filtered = filtered.filter(user => user.user_type === filters.userType);
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        (user.first_name?.toLowerCase().includes(searchLower) || 
        user.last_name?.toLowerCase().includes(searchLower) ||
        `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower))
      );
    }

    if (filters.hasRedeemed !== null) {
      filtered = filtered.filter(user => 
        filters.hasRedeemed ? !!user.redeemed_at : !user.redeemed_at
      );
    }

    setFilteredUsers(filtered);
  };

  const handleViewUserDetails = (user: UserProfile) => {
    setSelectedUser(user);
    setShowUserDialog(true);
  };

  const exportUsers = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,First Name,Last Name,Email,User Type,Verified,Created At\n" +
      filteredUsers.map(user => {
        return `"${user.id}","${user.first_name || ''}","${user.last_name || ''}","${user.email || ''}","${user.user_type || ''}","${user.redeemed_at ? 'Yes' : 'No'}","${user.created_at || ''}"`;
      }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    users: filteredUsers,
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
};
