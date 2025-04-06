
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Sparkles, Loader2, AlertCircle, Check, X } from 'lucide-react';
import { UserProfile } from '@/types/user';

const PremiumManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<Array<UserProfile & { premium_status?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();

  // Check if user is CEO based on job title or company name
  const isCeo = userProfile?.job_title?.toLowerCase().includes('ceo') || 
               userProfile?.job_title?.toLowerCase().includes('chief executive') ||
               userProfile?.company_name?.toLowerCase().includes('ceo');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all users
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;

      // Fetch premium subscriptions to merge with user data
      const { data: premiumData, error: premiumError } = await supabase
        .from('premium_subscriptions')
        .select('*');
        
      if (premiumError) throw premiumError;
      
      // Map premium data to users
      const usersWithPremium = profiles.map(profile => {
        const premiumSub = premiumData?.find(sub => sub.user_id === profile.id);
        return {
          ...profile,
          premium_status: premiumSub ? `${premiumSub.plan_type} (${premiumSub.status})` : 'Free'
        };
      });
      
      setUsers(usersWithPremium);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const grantPremiumAccess = async (userId: string) => {
    try {
      // Check if user already has a premium subscription
      const { data: existingSub, error: checkError } = await supabase
        .from('premium_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      // If subscription exists, update it
      if (existingSub) {
        const { error: updateError } = await supabase
          .from('premium_subscriptions')
          .update({
            status: 'active',
            plan_type: 'premium_plus',
            current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
          })
          .eq('id', existingSub.id);
          
        if (updateError) throw updateError;
      } else {
        // Create new premium subscription
        const { error: insertError } = await supabase
          .from('premium_subscriptions')
          .insert({
            user_id: userId,
            plan_type: 'premium_plus',
            status: 'active',
            current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
          });
          
        if (insertError) throw insertError;
      }
      
      // Update user preferences
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          preferences: { hasPremium: true }
        })
        .eq('id', userId);
        
      if (profileError) throw profileError;
      
      // Refresh the user list
      await fetchUsers();
      
      toast({
        title: 'Success',
        description: 'Premium access granted successfully',
      });
    } catch (error) {
      console.error('Error granting premium access:', error);
      toast({
        title: 'Error',
        description: 'Failed to grant premium access',
        variant: 'destructive'
      });
    }
  };

  const revokePremiumAccess = async (userId: string) => {
    try {
      // Update existing subscription to cancelled
      const { data: existingSub, error: checkError } = await supabase
        .from('premium_subscriptions')
        .select('*')
        .eq('user_id', userId);
        
      if (existingSub && existingSub.length > 0) {
        const { error: updateError } = await supabase
          .from('premium_subscriptions')
          .update({
            status: 'cancelled'
          })
          .eq('user_id', userId);
          
        if (updateError) throw updateError;
      }
      
      // Update user preferences
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          preferences: { hasPremium: false }
        })
        .eq('id', userId);
        
      if (profileError) throw profileError;
      
      // Refresh the user list
      await fetchUsers();
      
      toast({
        title: 'Success',
        description: 'Premium access revoked successfully',
      });
    } catch (error) {
      console.error('Error revoking premium access:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke premium access',
        variant: 'destructive'
      });
    }
  };
  
  if (!isCeo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Premium Management</CardTitle>
          <CardDescription>Manage premium privileges for users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            <AlertCircle className="mr-2 h-5 w-5" />
            <p>You need CEO privileges to access this section.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2" /> 
              Premium Management
            </CardTitle>
            <CardDescription>Grant or revoke premium privileges to users</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchUsers} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>User Type</TableHead>
                  <TableHead>Premium Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const hasPremium = user.premium_status && !user.premium_status.includes('Free') && !user.premium_status.includes('cancelled');
                  
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.first_name} {user.last_name}
                      </TableCell>
                      <TableCell>{user.email || 'N/A'}</TableCell>
                      <TableCell>
                        {user.user_type === 'admin' ? (
                          <Badge variant="destructive">Admin</Badge>
                        ) : user.user_type === 'employer' ? (
                          <Badge variant="default">Employer</Badge>
                        ) : user.user_type === 'student' ? (
                          <Badge variant="secondary">Student</Badge>
                        ) : user.user_type === 'teacher' ? (
                          <Badge variant="outline">Teacher</Badge>
                        ) : (
                          <Badge variant="outline">Unknown</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {hasPremium ? (
                          <Badge variant="success" className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> {user.premium_status}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">{user.premium_status || 'Free'}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {hasPremium ? (
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => revokePremiumAccess(user.id)}
                            className="inline-flex items-center"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Revoke
                          </Button>
                        ) : (
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => grantPremiumAccess(user.id)}
                            className="inline-flex items-center"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Grant
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PremiumManagement;
