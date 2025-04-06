
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from "@/components/ui/input-otp";
import { useAuth } from '@/hooks/useAuth';
import { markIdentityAsVerified, isIdentityVerified } from '@/utils/verificationUtils';

const VerifyIdentity = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Get the return URL from location state or default to home
  const from = location.state?.from?.pathname || '/';

  // Check if user is already verified
  useEffect(() => {
    if (isIdentityVerified()) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  // For demo purposes, let's use a hardcoded verification code
  // In a real app, this should be generated server-side and sent to the user via SMS/email
  const DEMO_CODE = "123456";

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      if (verificationCode === DEMO_CODE) {
        markIdentityAsVerified();
        toast.success("Identity verified successfully!");
        navigate(from, { replace: true });
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
      setIsVerifying(false);
    }, 1500);
  };

  // Add debugging
  const handleCodeChange = (value: string) => {
    console.log("OTP value changed:", value);
    setVerificationCode(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
          <CardDescription>
            Please enter the 6-digit verification code sent to your device.
            {user && user.email && (
              <span className="block mt-1">
                Code sent to: {user.email.replace(/(.{2})(.*)(@.*)/, "$1****$3")}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <InputOTP 
              maxLength={6} 
              value={verificationCode} 
              onChange={handleCodeChange}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <React.Fragment key={index}>
                      <InputOTPSlot className="w-10 h-12" index={index} />
                      {index !== slots.length - 1 && <InputOTPSeparator />}
                    </React.Fragment>
                  ))}
                </InputOTPGroup>
              )}
            />
            
            <div className="text-sm text-gray-500">
              For demo purposes, use code: <span className="font-mono font-bold">123456</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={handleVerify}
            disabled={verificationCode.length !== 6 || isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Identity"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setVerificationCode("")}
          >
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyIdentity;
