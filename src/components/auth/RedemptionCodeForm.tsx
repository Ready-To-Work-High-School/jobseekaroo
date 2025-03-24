
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateRedemptionCode, useRedemptionCode } from '@/lib/supabase/redemption';
import { useAuth } from '@/contexts/AuthContext';

interface RedemptionCodeFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

const RedemptionCodeForm: React.FC<RedemptionCodeFormProps> = ({
  onSuccess,
  redirectTo = '/',
}) => {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a redemption code',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to use a redemption code',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const validation = await validateRedemptionCode(code);
      
      if (!validation.isValid || !validation.code) {
        toast({
          title: 'Invalid Code',
          description: validation.message,
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // Use the redemption code
      const success = await useRedemptionCode(validation.code.id, user.id);
      
      if (!success) {
        toast({
          title: 'Error',
          description: 'Failed to redeem code',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: 'Success',
        description: 'Code redeemed successfully!',
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate(redirectTo);
      }
    } catch (error) {
      console.error('Error redeeming code:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="redemption-code">Redemption Code</Label>
        <Input
          id="redemption-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code"
          autoComplete="off"
          className="uppercase"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Redeeming...' : 'Redeem Code'}
      </Button>
    </form>
  );
};

export default RedemptionCodeForm;
