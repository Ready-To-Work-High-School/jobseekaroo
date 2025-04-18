
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import QuickOverview from '@/components/admin/dashboard/QuickOverview';
import ReportGenerator from '@/components/admin/dashboard/ReportGenerator';
import SystemSettings from '@/components/admin/dashboard/SystemSettings';
import AccessDenied from '@/components/admin/dashboard/AccessDenied';
import UsersTab from '@/components/admin/dashboard/tabs/UsersTab';
import PostsTab from '@/components/admin/dashboard/tabs/PostsTab';
import SettingsTab from '@/components/admin/dashboard/tabs/SettingsTab';
import { useDashboardData } from '@/hooks/admin/useDashboardData';

const AdminDashboard = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const { users, posts, isLoading } = useDashboardData();

  if (userProfile?.user_type !== 'admin') {
    return <AccessDenied />;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the administrative control panel. Use the sections below to manage different aspects of the system.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <ReportGenerator />
        <SystemSettings />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <QuickOverview users={users} posts={posts} />
        </TabsContent>
        
        <TabsContent value="users">
          <UsersTab users={users} isLoading={isLoading.users} />
        </TabsContent>
        
        <TabsContent value="posts">
          <PostsTab posts={posts} isLoading={isLoading.posts} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
