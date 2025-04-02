
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import AccountTypeBadge from '@/components/layout/AccountTypeBadge';

const Dashboard = () => {
  const { user, userProfile } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/posts', {
          headers: {
            'x-auth-token': token || ''
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data.posts);
      } catch (err: any) {
        console.error('Error fetching posts:', err);
        setError(err.message || 'An error occurred while fetching posts');
        setPosts([]); // Set posts to empty array in case of error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Replace any references to user.username with user.email or userProfile name
  const userDisplayName = userProfile ? 
    `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() : 
    (user?.email || 'User');

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {userDisplayName}!
          </p>
          {userProfile && <AccountTypeBadge userProfile={userProfile} className="mt-2" />}
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest updates from your account</p>
          </div>
          
          <div className="border-t border-gray-200">
            {isLoading ? (
              <div className="px-4 py-5">
                <Skeleton className="h-4 w-3/4 rounded mb-4" />
                <Skeleton className="h-4 w-1/2 rounded mb-4" />
                <Skeleton className="h-4 w-5/6 rounded" />
              </div>
            ) : error ? (
              <Card className="m-4 border-none shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Your Dashboard</CardTitle>
                  <CardDescription>Activity and account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Your account is active and in good standing.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Recommended Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          <li className="text-sm">Complete your profile information</li>
                          <li className="text-sm">Add your skills and preferences</li>
                          <li className="text-sm">Browse available opportunities</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            ) : posts.length === 0 ? (
              <div className="px-4 py-5 text-center text-gray-500">No recent activity found</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {posts.map((post: any) => (
                  <li key={post.id} className="px-4 py-4">
                    <div className="flex space-x-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{post.title}</h3>
                          <p className="text-xs text-gray-500">Posted by {post.username}</p>
                        </div>
                        <p className="text-sm text-gray-500">{post.content}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
