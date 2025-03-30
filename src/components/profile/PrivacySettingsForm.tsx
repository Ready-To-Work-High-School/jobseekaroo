
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { logPrivacyChange } from '@/contexts/auth/services/auditService';
import { ShieldCheck, Eye, EyeOff, Lock } from 'lucide-react';

interface PrivacySettings {
  profile_visibility: 'public' | 'employers_only' | 'private';
  allow_messaging: boolean;
  resume_visibility: 'public' | 'employers_only' | 'private';
  contact_details_visibility: 'public' | 'employers_only' | 'private';
  enable_two_factor_auth: boolean;
}

const PrivacySettingsForm: React.FC = () => {
  const { user, userProfile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<PrivacySettings>({
    profile_visibility: 'employers_only',
    allow_messaging: true,
    resume_visibility: 'employers_only',
    contact_details_visibility: 'private',
    enable_two_factor_auth: false
  });
  
  // Load existing privacy settings
  useEffect(() => {
    if (userProfile?.preferences?.privacy) {
      setSettings({
        ...settings,
        ...userProfile.preferences.privacy
      });
    }
  }, [userProfile]);
  
  const handleCheckboxChange = (setting: keyof PrivacySettings, checked: boolean) => {
    setSettings({
      ...settings,
      [setting]: checked
    });
  };
  
  const handleVisibilityChange = (setting: keyof PrivacySettings, value: 'public' | 'employers_only' | 'private') => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };
  
  const savePrivacySettings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get existing preferences
      const preferences = userProfile?.preferences || {};
      
      // Update privacy settings
      const { error } = await supabase
        .from('profiles')
        .update({
          preferences: {
            ...preferences,
            privacy: settings
          }
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Log this privacy change for audit purposes
      await logPrivacyChange(user.id, settings);
      
      // Refresh profile data
      await refreshProfile();
      
      toast({
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved.",
      });
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      toast({
        title: "Error saving settings",
        description: "An error occurred while saving your privacy settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Privacy Settings
        </CardTitle>
        <CardDescription>
          Control who can see your information and how they can contact you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Profile Visibility</h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="profile-public"
                checked={settings.profile_visibility === 'public'}
                onChange={() => handleVisibilityChange('profile_visibility', 'public')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="profile-public" className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> Public (Anyone can view)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="profile-employers"
                checked={settings.profile_visibility === 'employers_only'}
                onChange={() => handleVisibilityChange('profile_visibility', 'employers_only')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="profile-employers" className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> Employers Only (Only verified employers)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="profile-private"
                checked={settings.profile_visibility === 'private'}
                onChange={() => handleVisibilityChange('profile_visibility', 'private')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="profile-private" className="flex items-center gap-1">
                <EyeOff className="h-4 w-4" /> Private (Only you)
              </Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Messaging</h3>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="allow-messaging"
              checked={settings.allow_messaging}
              onCheckedChange={(checked) => 
                handleCheckboxChange('allow_messaging', checked as boolean)
              }
            />
            <div className="space-y-1">
              <Label htmlFor="allow-messaging">Allow messages from verified employers</Label>
              <p className="text-sm text-muted-foreground">
                When enabled, verified employers can send you messages about job opportunities
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Resume Visibility</h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="resume-public"
                checked={settings.resume_visibility === 'public'}
                onChange={() => handleVisibilityChange('resume_visibility', 'public')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="resume-public" className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> Public (Anyone can view)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="resume-employers"
                checked={settings.resume_visibility === 'employers_only'}
                onChange={() => handleVisibilityChange('resume_visibility', 'employers_only')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="resume-employers" className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> Employers Only (Only verified employers)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="resume-private"
                checked={settings.resume_visibility === 'private'}
                onChange={() => handleVisibilityChange('resume_visibility', 'private')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="resume-private" className="flex items-center gap-1">
                <EyeOff className="h-4 w-4" /> Private (Only you)
              </Label>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Your resume is stored securely and encrypted. Access is controlled through time-limited secure links.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Details</h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="contact-public"
                checked={settings.contact_details_visibility === 'public'}
                onChange={() => handleVisibilityChange('contact_details_visibility', 'public')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="contact-public" className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> Public (Anyone can view)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="contact-employers"
                checked={settings.contact_details_visibility === 'employers_only'}
                onChange={() => handleVisibilityChange('contact_details_visibility', 'employers_only')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="contact-employers" className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> Employers Only (Only verified employers)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="contact-private"
                checked={settings.contact_details_visibility === 'private'}
                onChange={() => handleVisibilityChange('contact_details_visibility', 'private')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="contact-private" className="flex items-center gap-1">
                <EyeOff className="h-4 w-4" /> Private (Only you)
              </Label>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Contact details are encrypted for additional security.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Additional Security</h3>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="two-factor"
              checked={settings.enable_two_factor_auth}
              onCheckedChange={(checked) => 
                handleCheckboxChange('enable_two_factor_auth', checked as boolean)
              }
              disabled={true} // This feature is coming soon
            />
            <div className="space-y-1">
              <Label htmlFor="two-factor" className="flex items-center gap-1">
                <Lock className="h-4 w-4" /> Enable Two-Factor Authentication (Coming Soon)
              </Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account by requiring a second verification step when logging in
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={savePrivacySettings} 
          disabled={loading}
          className="w-full md:w-auto"
        >
          {loading ? "Saving..." : "Save Privacy Settings"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PrivacySettingsForm;
