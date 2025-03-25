
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import UserManagementFilters from './UserManagementFilters';
import UserManagementTable from './UserManagementTable';
import UserTypeStatistics from './UserTypeStatistics';
import UserDetailDialog from './UserDetailDialog';
import { UserProfile } from '@/types/user';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Loader2 } from 'lucide-react';

const UserManagementContainer: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [userStats, setUserStats] = useState({
    total: 0,
    student: 0,
    employer: 0,
    teacher: 0,
    admin: 0,
  });
  const { toast } = useToast();

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

      setUsers(data || []);
      setFilteredUsers(data || []);
      calculateUserStats(data || []);
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

  // Calculate user statistics
  const calculateUserStats = (userList: UserProfile[]) => {
    const stats = {
      total: userList.length,
      student: 0,
      employer: 0,
      teacher: 0, 
      admin: 0,
    };

    userList.forEach(user => {
      if (user.user_type === 'student') stats.student++;
      else if (user.user_type === 'employer') stats.employer++;
      else if (user.user_type === 'teacher') stats.teacher++;
      else if (user.user_type === 'admin') stats.admin++;
    });

    setUserStats(stats);
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

      // Update the users list with the updated user
      setUsers(prevUsers => 
        prevUsers.map(user => user.id === userId ? data : user)
      );
      
      setFilteredUsers(prevFilteredUsers => 
        prevFilteredUsers.map(user => user.id === userId ? data : user)
      );

      calculateUserStats(users);

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
        `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase().includes(searchLower))
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
      "ID,First Name,Last Name,User Type,Redeemed,Created At\n" +
      filteredUsers.map(user => {
        return `"${user.id}","${user.first_name || ''}","${user.last_name || ''}","${user.user_type || ''}","${user.redeemed_at ? 'Yes' : 'No'}","${user.redeemed_at || ''}"`;
      }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <UserTypeStatistics stats={userStats} className="lg:col-span-5" />
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <UserManagementFilters onFilterChange={handleFilterChange} />
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchUsers}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportUsers}
              disabled={isLoading || filteredUsers.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <UserManagementTable 
          users={filteredUsers}
          isLoading={isLoading}
          onViewDetails={handleViewUserDetails}
          onUpdateUserType={updateUserType}
        />
      </Card>

      {selectedUser && (
        <UserDetailDialog
          user={selectedUser}
          isOpen={showUserDialog}
          onClose={() => setShowUserDialog(false)}
          onUpdateUserType={updateUserType}
        />
      )}
    </div>
  );
};

export default UserManagementContainer;
