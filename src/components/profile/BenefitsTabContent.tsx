import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface BenefitsTabContentProps {
  userProfile: any;
  onRedeemCode: (code: string) => Promise<void>;
}

const BenefitsTabContent = ({ userProfile, onRedeemCode }: BenefitsTabContentProps) => {
  const [code, setCode] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();
  const [isRedeeming, setIsRedeeming] = useState(false);
  
  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast({
        title: "Error",
        description: "Please enter a code to redeem.",
        variant: "destructive"
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to redeem a code.",
        variant: "destructive"
      });
      return;
    }
    
    setIsRedeeming(true);
    
    toast({
      title: "Processing code...",
      description: "Please wait while we verify your code.",
      variant: "default" // Changed from "warning" to "default"
    });
    
    try {
      await onRedeemCode(code);
      toast({
        title: "Success",
        description: "Code redeemed successfully!",
      });
    } catch (error: any) {
      console.error("Redeem code error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to redeem code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRedeeming(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Benefits</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="redeem-code">Redeem Code</Label>
          <form onSubmit={handleRedeem} className="flex items-center space-x-2">
            <Input
              id="redeem-code"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isRedeeming}
            />
            <Button type="submit" disabled={isRedeeming}>
              {isRedeeming ? "Redeeming..." : "Redeem"}
            </Button>
          </form>
        </div>
        
        {userProfile?.premium_status && (
          <div className="border rounded-md p-4 bg-green-50 border-green-200">
            <h3 className="font-medium text-green-800">Premium Subscription</h3>
            <p className="text-sm text-green-700">
              You have an active premium subscription. Enjoy exclusive benefits!
            </p>
          </div>
        )}
        
        {!userProfile?.premium_status && (
          <div className="border rounded-md p-4 bg-gray-50 border-gray-200">
            <h3 className="font-medium text-gray-800">Unlock Premium Features</h3>
            <p className="text-sm text-gray-700">
              Redeem a code to unlock premium features and benefits.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BenefitsTabContent;
