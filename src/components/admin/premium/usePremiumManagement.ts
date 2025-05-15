
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/types/user';

export function usePremiumManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error fetching users",
        description: "Could not load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const grantPremiumAccess = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ premium_status: 'active' })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Premium access granted",
        description: "User has been granted premium access",
      });
      
      // Refresh the user list
      fetchUsers();
      return true;
    } catch (error) {
      console.error('Error granting premium access:', error);
      toast({
        title: "Error",
        description: "Could not grant premium access",
        variant: "destructive",
      });
      return false;
    }
  };

  const revokePremiumAccess = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ premium_status: null })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Premium access revoked",
        description: "User's premium access has been revoked",
      });
      
      // Refresh the user list
      fetchUsers();
      return true;
    } catch (error) {
      console.error('Error revoking premium access:', error);
      toast({
        title: "Error",
        description: "Could not revoke premium access",
        variant: "destructive",
      });
      return false;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, fetchUsers, grantPremiumAccess, revokePremiumAccess };
}
