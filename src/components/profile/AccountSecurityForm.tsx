
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, Mail, Lock } from 'lucide-react';

const AccountSecurityForm = () => {
  const { refreshProfile } = useAuth();
  const { toast } = useToast();
  
  // Email update state
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  
  // Password update state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail) {
      toast({
        title: "Error",
        description: "Please enter a new email address",
        variant: "destructive",
      });
      return;
    }
    
    if (!emailPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password to confirm email change",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUpdatingEmail(true);
      
      // First verify the password is correct
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || '',
        password: emailPassword,
      });
      
      if (signInError) {
        throw new Error('Incorrect password. Please verify your current password.');
      }
      
      // Update the email
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      
      if (error) throw error;
      
      toast({
        title: "Email update initiated",
        description: "Please check your new email address for a confirmation link",
      });
      
      setNewEmail('');
      setEmailPassword('');
    } catch (error: any) {
      toast({
        title: "Error updating email",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingEmail(false);
    }
  };
  
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "New password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUpdatingPassword(true);
      
      // First verify the current password is correct
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || '',
        password: currentPassword,
      });
      
      if (signInError) {
        throw new Error('Incorrect current password. Please try again.');
      }
      
      // Update the password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Your password has been updated successfully",
      });
      
      // Clear the form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Refresh user profile to ensure all data is up to date
      await refreshProfile();
    } catch (error: any) {
      toast({
        title: "Error updating password",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Email Update Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <CardTitle>Update Email Address</CardTitle>
          </div>
          <CardDescription>
            Change the email address associated with your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-email">New Email Address</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter your new email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-password">Current Password</Label>
              <Input
                id="email-password"
                type="password"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                placeholder="Enter your current password"
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isUpdatingEmail}
              >
                {isUpdatingEmail ? "Updating..." : "Update Email"}
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              You'll need to verify your new email address before the change takes effect.
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Password Update Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-600" />
            <CardTitle>Change Password</CardTitle>
          </div>
          <CardDescription>
            Update your account password to maintain security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isUpdatingPassword}
              >
                {isUpdatingPassword ? "Updating..." : "Change Password"}
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 inline mr-1" />
              For security, choose a password you don't use elsewhere.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSecurityForm;
