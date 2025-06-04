import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { validateRedemptionCode } from '@/lib/supabase/redemption/validate';
import { redeemCode } from '@/lib/supabase/redemption/redeem';
import { RedemptionCode } from '@/types/redemption';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Lock, Check, AlertTriangle, Shield } from 'lucide-react';
import RedemptionConfirmationDialog from './RedemptionConfirmationDialog';
import RedemptionCodeInput from './RedemptionCodeInput';

interface RedemptionCodeFormProps {
  redirectTo?: string;
}

const RedemptionCodeForm: React.FC<RedemptionCodeFormProps> = ({ redirectTo = '/dashboard' }) => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    code?: RedemptionCode;
  } | null>(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [redeemedCode, setRedeemedCode] = useState<RedemptionCode | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, refreshProfile, userProfile } = useAuth();
  
  // Check for code in query parameters when component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const codeParam = queryParams.get('code');
    const secureParam = queryParams.get('secure');
    
    if (codeParam) {
      setCode(codeParam);
      handleValidate(codeParam, false);
    } else if (secureParam) {
      // Handle secure QR code payload
      handleValidate(secureParam, true);
    }
  }, [location.search]);
  
  const handleCodeChange = (value: string) => {
    setCode(value);
    // Reset validation when code changes
    setValidationResult(null);
  };
  
  const handleCodeComplete = (completedCode: string) => {
    handleValidate(completedCode, false);
  };
  
  const handleValidate = async (codeToValidate: string, isSecurePayload: boolean = false) => {
    if (!codeToValidate && !isSecurePayload) {
      toast({
        title: 'Error',
        description: 'Please enter a redemption code',
        variant: 'destructive',
      });
      return;
    }
    
    setIsValidating(true);
    
    try {
      // If we're validating a secure payload, we pass the entire payload
      const result = await validateRedemptionCode(codeToValidate, isSecurePayload);
      setValidationResult(result);
      
      if (!result.isValid) {
        toast({
          title: 'Invalid Code',
          description: result.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Valid Code',
          description: result.message,
        });
      }
    } catch (error) {
      console.error('Error validating code:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while validating the code',
        variant: 'destructive',
      });
    } finally {
      setIsValidating(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleValidate(code, false);
  };
  
  const handleRedeem = async () => {
    if (!validationResult?.isValid || !validationResult.code || !user) {
      return;
    }
    
    setIsRedeeming(true);
    
    try {
      // Save the code for confirmation dialog
      setRedeemedCode(validationResult.code);
      
      const result = await redeemCode(validationResult.code, user);
      
      if (result.success) {
        // Refresh user profile to get updated user type
        await refreshProfile();
        
        toast({
          title: 'Success',
          description: result.message,
        });
        
        // Show confirmation dialog
        setShowConfirmationDialog(true);
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error redeeming code:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsRedeeming(false);
    }
  };
  
  const handleDialogClose = () => {
    setShowConfirmationDialog(false);
    
    // For admin codes, always redirect to the admin dashboard
    if (redeemedCode?.type === 'admin') {
      navigate('/admin');
    } else if (redeemedCode?.type === 'student') {
      // For student codes, redirect to the student dashboard
      navigate('/dashboard');
    } else if (redeemedCode?.type === 'employer') {
      // For employer codes, redirect to the employer dashboard
      navigate('/employer-dashboard');
    } else {
      // Default fallback
      navigate(redirectTo);
    }
  };
  
  const isAdminCode = validationResult?.code?.type === 'admin';
  
  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isAdminCode ? (
              <Shield className="h-5 w-5 text-red-500" />
            ) : (
              <Lock className="h-5 w-5" />
            )}
            {isAdminCode ? 'Admin Redemption Code' : 'Redemption Code'}
          </CardTitle>
          <CardDescription>
            {isAdminCode 
              ? 'Enter your admin redemption code to gain administrator privileges'
              : 'Enter your redemption code to access premium features'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Redemption Code</Label>
                <RedemptionCodeInput
                  value={code}
                  onChange={handleCodeChange}
                  onComplete={handleCodeComplete}
                  disabled={isValidating}
                  isValid={validationResult?.isValid || false}
                />
              </div>
              
              <Button 
                type="submit"
                className={isAdminCode ? "w-full bg-red-600 hover:bg-red-700" : "w-full"}
                disabled={isValidating || code.length < 6}
              >
                {isValidating ? 'Validating...' : 'Validate Code'}
              </Button>
            </div>
          </form>
          
          {validationResult && !validationResult.isValid && (
            <div className="mt-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Invalid Code</AlertTitle>
                <AlertDescription>{validationResult.message}</AlertDescription>
              </Alert>
            </div>
          )}
          
          {validationResult?.isValid && validationResult.code && (
            <div className="mt-4">
              <Alert 
                variant="default" 
                className={isAdminCode 
                  ? "bg-red-50 border-red-200" 
                  : "bg-green-50 border-green-200"
                }
              >
                <Check className={`h-4 w-4 ${isAdminCode ? "text-red-500" : "text-green-500"}`} />
                <AlertTitle>
                  {isAdminCode ? 'Valid Admin Code' : 'Valid Code'}
                </AlertTitle>
                <AlertDescription>
                  {isAdminCode 
                    ? 'This code will grant administrator privileges to your account.' 
                    : `This is a valid redemption code for ${validationResult.code?.type}.`
                  }
                  {validationResult.code?.expiresAt && (
                    <div className="text-sm mt-1">
                      Expires: {new Date(validationResult.code.expiresAt).toLocaleDateString()}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
        
        {validationResult?.isValid && validationResult.code && (
          <CardFooter>
            <Button 
              className={isAdminCode 
                ? "w-full bg-red-600 hover:bg-red-700" 
                : "w-full"
              }
              onClick={handleRedeem}
              disabled={!user || isRedeeming}
            >
              {isRedeeming ? 'Processing...' : isAdminCode ? 'Activate Admin Privileges' : 'Redeem Code'}
            </Button>
          </CardFooter>
        )}
      </Card>
      
      {redeemedCode && (
        <RedemptionConfirmationDialog
          isOpen={showConfirmationDialog}
          onClose={handleDialogClose}
          redemptionCode={redeemedCode}
          userProfile={userProfile}
          onDashboardClick={() => {
            if (redeemedCode.type === 'admin') {
              navigate('/admin');
            } else if (redeemedCode.type === 'student') {
              navigate('/dashboard');
            } else {
              navigate('/employer-dashboard');
            }
          }}
        />
      )}
    </>
  );
};

export default RedemptionCodeForm;
