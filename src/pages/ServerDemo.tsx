
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api';

interface ServerStatus {
  status: string;
  time: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  created_at: string;
}

interface AuthForm {
  username?: string;
  email: string;
  password: string;
}

interface PostForm {
  title: string;
  content: string;
}

const ServerDemo = () => {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [authForm, setAuthForm] = useState<AuthForm>({ email: '', password: '' });
  const [postForm, setPostForm] = useState<PostForm>({ title: '', content: '' });
  const [activeTab, setActiveTab] = useState('status');

  // Check server status
  const checkServerStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/status`);
      if (!response.ok) {
        throw new Error('Server status check failed');
      }
      const data = await response.json();
      setServerStatus(data);
    } catch (err: any) {
      setError(err.message || 'Failed to check server status');
      console.error('Server status error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts');
      console.error('Fetch posts error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      // Save token and update state
      localStorage.setItem('auth_token', data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success('Registration successful');
      setAuthForm({ email: '', password: '' });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      toast.error(err.message || 'Registration failed');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Save token and update state
      localStorage.setItem('auth_token', data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success('Login successful');
      setAuthForm({ email: '', password: '' });
    } catch (err: any) {
      setError(err.message || 'Login failed');
      toast.error(err.message || 'Login failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logoutUser = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Create post
  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('You must be logged in to create a post');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(postForm)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }
      
      toast.success('Post created successfully');
      setPostForm({ title: '', content: '' });
      fetchPosts(); // Refresh posts
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
      toast.error(err.message || 'Failed to create post');
      console.error('Create post error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check user session on mount
  useEffect(() => {
    const checkUserSession = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}/users/me`, {
            headers: { 'x-auth-token': token }
          });
          
          if (!response.ok) {
            // Token invalid or expired
            localStorage.removeItem('auth_token');
            setToken(null);
            return;
          }
          
          const data = await response.json();
          setUser(data.user);
        } catch (err) {
          console.error('Session check error:', err);
          localStorage.removeItem('auth_token');
          setToken(null);
        }
      }
    };
    
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial data loading
  useEffect(() => {
    checkServerStatus();
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Server Demo</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Server Integration Demo</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="status">Server Status</TabsTrigger>
            <TabsTrigger value="auth">Authentication</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="create" disabled={!token}>Create Post</TabsTrigger>
          </TabsList>
          
          {/* Server Status Tab */}
          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>Server Status</CardTitle>
                <CardDescription>
                  Check if the Express server is running and view its status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {serverStatus ? (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-900">
                    <p><strong>Status:</strong> {serverStatus.status}</p>
                    <p><strong>Server Time:</strong> {new Date(serverStatus.time).toLocaleString()}</p>
                  </div>
                ) : error ? (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-900">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                    <p className="mt-2">Make sure the server is running with: <code>npm run server</code></p>
                  </div>
                ) : (
                  <p>Click the button below to check server status</p>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={checkServerStatus} disabled={loading}>
                  {loading ? 'Checking...' : 'Check Server Status'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Authentication Tab */}
          <TabsContent value="auth">
            <Card>
              <CardHeader>
                <CardTitle>{user ? 'User Profile' : 'Authentication'}</CardTitle>
                <CardDescription>
                  {user 
                    ? 'View your profile information' 
                    : 'Register or login to access protected resources'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user ? (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-900">
                    <p><strong>User ID:</strong> {user.id}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Register</h3>
                        <form onSubmit={registerUser} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="register-username">Username</Label>
                            <Input 
                              id="register-username" 
                              value={authForm.username || ''} 
                              onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-email">Email</Label>
                            <Input 
                              id="register-email" 
                              type="email"
                              value={authForm.email} 
                              onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-password">Password</Label>
                            <Input 
                              id="register-password" 
                              type="password"
                              value={authForm.password} 
                              onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                              required
                            />
                          </div>
                          <Button type="submit" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                          </Button>
                        </form>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Login</h3>
                        <form onSubmit={loginUser} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <Input 
                              id="login-email" 
                              type="email"
                              value={authForm.email} 
                              onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="login-password">Password</Label>
                            <Input 
                              id="login-password" 
                              type="password"
                              value={authForm.password} 
                              onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                              required
                            />
                          </div>
                          <Button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                          </Button>
                        </form>
                      </div>
                    </div>
                    
                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-900">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {user && (
                  <Button variant="destructive" onClick={logoutUser}>
                    Logout
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Posts Tab */}
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Posts</CardTitle>
                <CardDescription>
                  View all posts from the database
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading posts...</p>
                ) : error ? (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-900">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                  </div>
                ) : posts.length === 0 ? (
                  <p>No posts found. Create your first post!</p>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded border border-gray-200 dark:border-gray-800">
                        <h3 className="text-lg font-medium">{post.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          By {post.username} | {new Date(post.created_at).toLocaleString()}
                        </p>
                        <p className="mt-2">{post.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={fetchPosts} disabled={loading}>
                  {loading ? 'Refreshing...' : 'Refresh Posts'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Create Post Tab */}
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create Post</CardTitle>
                <CardDescription>
                  Create a new post (requires authentication)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!token ? (
                  <p>Please login or register to create posts</p>
                ) : (
                  <form onSubmit={createPost} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-title">Title</Label>
                      <Input 
                        id="post-title" 
                        value={postForm.title} 
                        onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-content">Content</Label>
                      <textarea 
                        id="post-content" 
                        className="w-full min-h-[150px] p-2 border rounded-md"
                        value={postForm.content} 
                        onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                        required
                      />
                    </div>
                    
                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-900">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}
                    
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Creating...' : 'Create Post'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ServerDemo;
