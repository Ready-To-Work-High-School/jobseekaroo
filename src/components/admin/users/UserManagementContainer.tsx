import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserDataTable from './UserDataTable';
import { AdminUser } from './types';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface UserManagementContainerProps {
  initialFilter?: string;
}

const UserManagementContainer = ({ initialFilter }: { initialFilter?: string }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(initialFilter || 'all');

  // Convert AdminUser[] to UserProfile[] by adding required fields
  const prepareUsers = (adminUsers: AdminUser[]) => {
    return adminUsers.map(user => ({
      ...user,
      preferences: {},
      created_at: user.created_at,
      updated_at: user.updated_at || new Date().toISOString(),
    }));
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch users',
          variant: 'destructive'
        });
        return [];
      }
      return data as AdminUser[];
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersByType = async (userType: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', userType)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch users',
          variant: 'destructive'
        });
        return [];
      }
      return data as AdminUser[];
    } finally {
      setLoading(false);
    }
  };

  const fetchPremiumUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('premium_status', 'is', null)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch premium users',
          variant: 'destructive'
        });
        return [];
      }
      return data as AdminUser[];
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch recent users',
          variant: 'destructive'
        });
        return [];
      }
      return data as AdminUser[];
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (filter: string) => {
    setActiveTab(filter);
    setLoading(true);
    
    try {
      let filteredUsers = [];
      switch (filter) {
        case 'all':
          filteredUsers = await fetchAllUsers();
          setUsers(prepareUsers(filteredUsers));
          break;
        case 'students':
          filteredUsers = await fetchUsersByType('student');
          setUsers(prepareUsers(filteredUsers));
          break;
        case 'employers':
          filteredUsers = await fetchUsersByType('employer');
          setUsers(prepareUsers(filteredUsers));
          break;
        case 'premium':
          filteredUsers = await fetchPremiumUsers();
          setUsers(prepareUsers(filteredUsers));
          break;
        case 'recent':
          filteredUsers = await fetchRecentUsers();
          setUsers(prepareUsers(filteredUsers));
          break;
        default:
          filteredUsers = await fetchAllUsers();
          setUsers(prepareUsers(filteredUsers));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFilterChange(activeTab);
  }, [activeTab]);

  return (
    <div>
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all" onClick={() => handleFilterChange('all')}>
            All Users
          </TabsTrigger>
          <TabsTrigger value="students" onClick={() => handleFilterChange('students')}>
            Students
          </TabsTrigger>
          <TabsTrigger value="employers" onClick={() => handleFilterChange('employers')}>
            Employers
          </TabsTrigger>
          <TabsTrigger value="premium" onClick={() => handleFilterChange('premium')}>
            Premium
          </TabsTrigger>
          <TabsTrigger value="recent" onClick={() => handleFilterChange('recent')}>
            Recent
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {loading ? (
            <div className="flex justify-center p-6">
              <LoadingSpinner />
            </div>
          ) : (
            <UserDataTable users={users} loading={loading} />
          )}
        </TabsContent>
        <TabsContent value="students">
          {loading ? (
            <div className="flex justify-center p-6">
              <LoadingSpinner />
            </div>
          ) : (
            <UserDataTable users={users} loading={loading} />
          )}
        </TabsContent>
        <TabsContent value="employers">
          {loading ? (
            <div className="flex justify-center p-6">
              <LoadingSpinner />
            </div>
          ) : (
            <UserDataTable users={users} loading={loading} />
          )}
        </TabsContent>
        <TabsContent value="premium">
          {loading ? (
            <div className="flex justify-center p-6">
              <LoadingSpinner />
            </div>
          ) : (
            <UserDataTable users={users} loading={loading} />
          )}
        </TabsContent>
        <TabsContent value="recent">
          {loading ? (
            <div className="flex justify-center p-6">
              <LoadingSpinner />
            </div>
          ) : (
            <UserDataTable users={users} loading={loading} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagementContainer;
