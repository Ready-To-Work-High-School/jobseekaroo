
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useDashboardData() {
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState({
    users: false,
    posts: false
  });
  const { toast } = useToast();

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
  }, [toast]);

  return { users, posts, isLoading };
}
