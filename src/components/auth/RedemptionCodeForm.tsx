
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { validateRedemptionCode } from '@/lib/supabase/redemption';
import { RedemptionCode } from '@/types/redemption';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Check, AlertTriangle } from 'lucide-react';

const RedemptionCodeForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    code?: RedemptionCode;
  } | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
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
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    // Reset validation when code changes
    setValidationResult(null);
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
          description: 'This redemption code is valid!',
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
    
    // Redeem code logic would go here
    // This would call an API to mark the code as used and attach it to the user
    
    toast({
      title: 'Success',
      description: 'Code redeemed successfully!',
    });
    
    // Redirect to appropriate page based on code type
    if (validationResult.code.type === 'student') {
      navigate('/dashboard');
    } else {
      navigate('/employer-dashboard');
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Redemption Code
        </CardTitle>
        <CardDescription>
          Enter your redemption code to access premium features
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Redemption Code</Label>
              <Input
                id="code"
                placeholder="Enter your code"
                value={code}
                onChange={handleCodeChange}
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full"
              disabled={isValidating}
            >
              {isValidating ? 'Validating...' : 'Validate Code'}
            </Button>
          </div>
        </form>
        
        {validationResult && (
          <div className="mt-4">
            {validationResult.isValid ? (
              <Alert variant="default" className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-500" />
                <AlertTitle>Valid Code</AlertTitle>
                <AlertDescription>
                  This is a valid redemption code for {validationResult.code?.type}.
                  {validationResult.code?.expiresAt && (
                    <div className="text-sm mt-1">
                      Expires: {new Date(validationResult.code.expiresAt).toLocaleDateString()}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Invalid Code</AlertTitle>
                <AlertDescription>{validationResult.message}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
      
      {validationResult?.isValid && validationResult.code && (
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleRedeem}
            disabled={!user}
          >
            Redeem Code
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RedemptionCodeForm;
