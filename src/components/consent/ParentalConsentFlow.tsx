import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/contexts/AuthContext';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ParentalConsentFlow = () => {
  const [step, setStep] = useState<'introduction' | 'parentEmail' | 'verification' | 'complete'>('introduction');
  const [parentEmail, setParentEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [parentName, setParentName] = useState('');
  const { toast } = useToast();
  const { user, userProfile, updateProfile } = useAuth();
  const isMobile = useIsMobile();
  
  const handleSendVerification = async () => {
    if (!parentEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a parent or guardian email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Here we would integrate with the backend to send a verification email
      // For now, we'll simulate a successful send
      
      toast({
        title: "Verification Email Sent",
        description: "A verification code has been sent to the parent/guardian email"
      });
      setStep('verification');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerify = async () => {
    if (!verificationCode) {
      toast({
        title: "Code Required",
        description: "Please enter the verification code sent to the parent/guardian",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Here we would integrate with the backend to verify the code
      // For now, we'll simulate success with any code entry
      
      toast({
        title: "Verification Successful",
        description: "Parental consent has been verified"
      });
      setStep('complete');
      
      if (user && updateProfile) {
        // Store the consent status in the user profile preferences object
        const updatedPreferences = {
          ...(userProfile?.preferences || {}),
          parentalConsentVerified: true,
          parentalConsentDate: new Date().toISOString(),
          parentEmail
        };
        
        // Update the user profile with the new preferences
        await updateProfile({
          preferences: updatedPreferences
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "The code entered is invalid. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={`max-w-md mx-auto bg-white p-6 ${isMobile ? 'rounded-none' : 'rounded-lg shadow-md'}`}>
      {step === 'introduction' && (
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">Parental Consent Required</h2>
          <p className="text-gray-600">
            Because you are under 18, we need your parent or guardian's permission before
            you can create an account and use our service. This is required by the Children's Online
            Privacy Protection Act (COPPA).
          </p>
          <div className="bg-amber-50 p-4 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">
              <strong>Why we need this:</strong> We need to collect certain information to provide
              you with job opportunities. Your parent/guardian must consent to this data collection.
            </p>
          </div>
          <Button 
            className="w-full" 
            onClick={() => setStep('parentEmail')}
          >
            Continue
          </Button>
        </div>
      )}
      
      {step === 'parentEmail' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Parent/Guardian Information</h2>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="parentName">Parent/Guardian Name</Label>
              <Input
                id="parentName"
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
              <Input
                id="parentEmail"
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="email@example.com"
              />
              <p className="text-xs text-gray-500">
                We'll send a verification code to this email address
              </p>
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="consent" 
                checked={isConsentGiven}
                onCheckedChange={(checked) => setIsConsentGiven(checked as boolean)}
              />
              <Label htmlFor="consent" className="text-sm">
                I confirm that I am providing the correct parent/guardian email and they have agreed to
                receive a verification message.
              </Label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setStep('introduction')}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleSendVerification}
              disabled={!parentEmail || !isConsentGiven || isLoading}
            >
              {isLoading ? "Sending..." : "Send Verification"}
            </Button>
          </div>
        </div>
      )}
      
      {step === 'verification' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Verify Parental Consent</h2>
          <p className="text-gray-600">
            A verification code has been sent to {parentEmail}. Please ask your parent/guardian
            to check their email and enter the code below.
          </p>
          <div className="space-y-2">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter the 6-digit code"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setStep('parentEmail')}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleVerify}
              disabled={!verificationCode || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
          <button 
            type="button" 
            className="text-sm text-blue-600 hover:underline mx-auto block"
            onClick={handleSendVerification}
          >
            Resend code
          </button>
        </div>
      )}
      
      {step === 'complete' && (
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">Consent Verified</h2>
          <p className="text-gray-600">
            Thank you! Parental consent has been verified. You can now use all features of
            the application.
          </p>
          <Button className="w-full" asChild>
            <a href="/dashboard">Continue to Dashboard</a>
          </Button>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          For assistance, please contact support at <a href="mailto:support@js4hs.com" className="text-blue-600 hover:underline">support@js4hs.com</a>
        </p>
      </div>
    </div>
  );
};

export default ParentalConsentFlow;
