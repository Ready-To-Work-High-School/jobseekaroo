import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import QuickOverview from '@/components/admin/dashboard/QuickOverview';
import ReportGenerator from '@/components/admin/dashboard/ReportGenerator';
import SystemSettings from '@/components/admin/dashboard/SystemSettings';

const AdminDashboard = () => {
  const { userProfile } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState({
    users: false,
    posts: false
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(prev => ({ ...prev, users: true }));
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(prev => ({ ...prev, users: false }));
      }
    };

    const fetchPosts = async () => {
      setIsLoading(prev => ({ ...prev, posts: true }));
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to load posts. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(prev => ({ ...prev, posts: false }));
      }
    };

    fetchUsers();
    fetchPosts();
  }, []);

  if (userProfile?.user_type !== 'admin') {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Access Denied. You do not have admin privileges to view this page.
            </p>
          </div>
        </div>
      </div>
    );
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

      <Tabs defaultValue="overview" className="space-y-6">
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
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading.users ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Username</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id || index} className="border-t">
                          <td className="px-4 py-2">{user.id || index + 1}</td>
                          <td className="px-4 py-2">{user.username || 'N/A'}</td>
                          <td className="px-4 py-2">{user.email || 'N/A'}</td>
                          <td className="px-4 py-2">
                            <button 
                              className="mr-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                              onClick={() => toast({ title: "Feature Coming Soon", description: "Edit functionality is under development." })}
                            >
                              Edit
                            </button>
                            <button 
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                              onClick={() => toast({ title: "Feature Coming Soon", description: "Delete functionality is under development." })}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-10 text-gray-500">No users found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Post Management</CardTitle>
              <CardDescription>View and manage all posts in the system</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading.posts ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : posts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Author</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post, index) => (
                        <tr key={post.id || index} className="border-t">
                          <td className="px-4 py-2">{post.id || index + 1}</td>
                          <td className="px-4 py-2">{post.title || 'Untitled'}</td>
                          <td className="px-4 py-2">{post.author || 'Unknown'}</td>
                          <td className="px-4 py-2">
                            <button 
                              className="mr-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                              onClick={() => toast({ title: "Feature Coming Soon", description: "Edit functionality is under development." })}
                            >
                              Edit
                            </button>
                            <button 
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                              onClick={() => toast({ title: "Feature Coming Soon", description: "Delete functionality is under development." })}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-10 text-gray-500">No posts found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>Configure system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-10 text-gray-500">
                Admin settings panel is under development.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
