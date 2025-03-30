
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Save, Lock, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { logPrivacyChange } from '@/contexts/auth/services/auditService';

interface PrivacySettings {
  profileVisibleToEmployers: boolean;
  showEmail: boolean;
  showResume: boolean;
  showSkills: boolean;
  allowMessaging: boolean;
  allowJobRecommendations: boolean;
}

const defaultPrivacySettings: PrivacySettings = {
  profileVisibleToEmployers: true,
  showEmail: false,
  showResume: true,
  showSkills: true,
  allowMessaging: true,
  allowJobRecommendations: true
};

const PrivacySettingsForm = () => {
  const { userProfile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get existing privacy settings or use defaults
  const existingSettings = userProfile?.preferences?.privacy || defaultPrivacySettings;
  
  const { register, handleSubmit, formState: { isDirty }, watch, setValue } = useForm({
    defaultValues: existingSettings
  });
  
  const profileVisibleToEmployers = watch('profileVisibleToEmployers');
  
  const onSubmit = async (data: PrivacySettings) => {
    setIsLoading(true);
    
    try {
      // Convert privacy settings to a format compatible with Json type
      const privacyPreferences = {
        privacy: {
          profileVisibleToEmployers: data.profileVisibleToEmployers,
          showEmail: data.showEmail,
          showResume: data.showResume,
          showSkills: data.showSkills,
          allowMessaging: data.allowMessaging,
          allowJobRecommendations: data.allowJobRecommendations
        }
      };
      
      // Update user preferences in profile
      await updateProfile({
        preferences: privacyPreferences
      });
      
      // Log this privacy change for audit purposes
      if (userProfile?.id) {
        await logPrivacyChange(userProfile.id, data);
      }
      
      toast({
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved successfully.",
      });
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      toast({
        title: "Error",
        description: "Failed to update privacy settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" /> Privacy Settings
          </CardTitle>
          <CardDescription>
            Control who can see your information and how it's used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profileVisibility" className="text-base font-medium">
                  Profile Visibility
                </Label>
                <p className="text-sm text-muted-foreground">
                  Make your profile visible to employers looking for candidates
                </p>
              </div>
              <Switch 
                id="profileVisibility"
                {...register('profileVisibleToEmployers')}
                checked={watch('profileVisibleToEmployers')}
                onCheckedChange={(checked) => setValue('profileVisibleToEmployers', checked)}
              />
            </div>
            
            <div className={profileVisibleToEmployers ? "" : "opacity-50 pointer-events-none"}>
              <h3 className="mb-3 font-medium text-sm flex items-center gap-1 text-muted-foreground">
                <UserPlus className="h-4 w-4" /> Information Visible to Employers
              </h3>
              
              <div className="ml-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showEmail" className="cursor-pointer">
                    Show Email Address
                  </Label>
                  <Switch 
                    id="showEmail"
                    {...register('showEmail')}
                    checked={watch('showEmail')}
                    onCheckedChange={(checked) => setValue('showEmail', checked)}
                    disabled={!profileVisibleToEmployers}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showResume" className="cursor-pointer">
                    Show Resume
                  </Label>
                  <Switch 
                    id="showResume"
                    {...register('showResume')}
                    checked={watch('showResume')}
                    onCheckedChange={(checked) => setValue('showResume', checked)}
                    disabled={!profileVisibleToEmployers}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showSkills" className="cursor-pointer">
                    Show Skills
                  </Label>
                  <Switch 
                    id="showSkills"
                    {...register('showSkills')}
                    checked={watch('showSkills')}
                    onCheckedChange={(checked) => setValue('showSkills', checked)}
                    disabled={!profileVisibleToEmployers}
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="mb-3 font-medium text-sm flex items-center gap-1 text-muted-foreground">
                <Eye className="h-4 w-4" /> Platform Interactions
              </h3>
              
              <div className="ml-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowMessaging" className="cursor-pointer">
                    Allow Messaging
                  </Label>
                  <Switch 
                    id="allowMessaging" 
                    {...register('allowMessaging')}
                    checked={watch('allowMessaging')}
                    onCheckedChange={(checked) => setValue('allowMessaging', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowJobRecommendations" className="cursor-pointer">
                    Allow Job Recommendations
                  </Label>
                  <Switch 
                    id="allowJobRecommendations"
                    {...register('allowJobRecommendations')}
                    checked={watch('allowJobRecommendations')}
                    onCheckedChange={(checked) => setValue('allowJobRecommendations', checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={!isDirty || isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Saving..." : "Save Privacy Settings"}
            {!isLoading && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PrivacySettingsForm;
