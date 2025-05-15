
import React, { useState } from 'react';
import { UserProfile } from '@/types/user';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import UserBenefitsCard from '@/components/user/UserBenefitsCard';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BenefitsTabContentProps {
  userProfile: UserProfile;
}

const BenefitsTabContent: React.FC<BenefitsTabContentProps> = ({ userProfile }) => {
  const [redemptionCode, setRedemptionCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showRedeemForm, setShowRedeemForm] = useState(false);
  const { refreshProfile } = useAuth();
  const { toast } = useToast();

  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!redemptionCode.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid redemption code',
        variant: 'destructive',
      });
      return;
    }
    
    setIsRedeeming(true);
    
    try {
      // Check if the code exists and is valid
      const { data: codeData, error: codeError } = await supabase
        .from('redemption_codes')
        .select('*')
        .eq('code', redemptionCode)
        .eq('used', false)
        .single();
      
      if (codeError || !codeData) {
        toast({
          title: 'Invalid code',
          description: 'The code you entered is invalid or has already been used',
          variant: 'destructive',
        });
        return;
      }
      
      // Update the user's profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          redeemed_at: new Date().toISOString(),
          redeemed_code: redemptionCode
        })
        .eq('id', userProfile.id);
      
      if (updateError) throw updateError;
      
      // Mark the code as used
      const { error: markUsedError } = await supabase
        .from('redemption_codes')
        .update({
          used: true,
          used_by: userProfile.id,
          used_at: new Date().toISOString()
        })
        .eq('id', codeData.id);
      
      if (markUsedError) throw markUsedError;
      
      // Show success message
      toast({
        title: 'Success!',
        description: 'Your account has been activated successfully',
        variant: 'default',
      });
      
      // Refresh the user profile
      await refreshProfile();
      
      // Hide the form
      setShowRedeemForm(false);
      
    } catch (error) {
      console.error('Error redeeming code:', error);
      toast({
        title: 'Error',
        description: 'Failed to redeem code. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleShowRedeemForm = () => {
    setShowRedeemForm(true);
  };
  
  // User already has a redeemed code
  const isAccountActivated = !!userProfile?.redeemed_at;
  
  // Only students need to redeem codes
  const showRedeemOption = ['student', 'teacher'].includes(userProfile.user_type || '') && !isAccountActivated;

  return (
    <div className="space-y-6">
      <UserBenefitsCard 
        userProfile={userProfile} 
        showRedeemButton={showRedeemOption && !showRedeemForm}
        onRedeemClick={handleShowRedeemForm}
      />
      
      {showRedeemOption && showRedeemForm && (
        <Card>
          <CardHeader>
            <CardTitle>Redeem Activation Code</CardTitle>
          </CardHeader>
          <CardContent>
            {!isAccountActivated && (
              <Alert className="mb-4" variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Account Not Activated</AlertTitle>
                <AlertDescription>
                  Enter your activation code below to unlock all features.
                </AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleRedeemCode}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="redemption-code">Activation Code</Label>
                  <Input
                    id="redemption-code"
                    placeholder="Enter your code"
                    value={redemptionCode}
                    onChange={(e) => setRedemptionCode(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowRedeemForm(false)}
              disabled={isRedeeming}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              onClick={handleRedeemCode}
              disabled={isRedeeming}
            >
              {isRedeeming ? 'Processing...' : 'Activate Account'}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Premium features section if needed */}
    </div>
  );
};

export default BenefitsTabContent;
