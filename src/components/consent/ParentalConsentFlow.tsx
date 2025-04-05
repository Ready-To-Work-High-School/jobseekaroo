
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/contexts/AuthContext';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Validation schema for parent information
const parentSchema = z.object({
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  parentEmail: z.string().email("Please enter a valid email address"),
  consentGiven: z.boolean().refine(val => val === true, {
    message: "You must agree to receive the verification email"
  })
});

// Validation schema for verification code
const verificationSchema = z.object({
  code: z.string().min(4, "Verification code must be at least 4 characters")
});

const ParentalConsentFlow = () => {
  const [step, setStep] = useState<'introduction' | 'parentEmail' | 'verification' | 'complete'>('introduction');
  const [parentEmail, setParentEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [parentName, setParentName] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const { toast } = useToast();
  const { user, userProfile, updateProfile } = useAuth();
  const isMobile = useIsMobile();
  
  // Parent information form
  const parentForm = useForm<z.infer<typeof parentSchema>>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      parentName: "",
      parentEmail: "",
      consentGiven: false
    }
  });

  // Verification code form
  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: ""
    }
  });
  
  const handleSendVerification = async (values: z.infer<typeof parentSchema>) => {
    setIsLoading(true);
    try {
      // Store values for later use
      setParentName(values.parentName);
      setParentEmail(values.parentEmail);
      
      // Here we would integrate with the backend to send a verification email
      // For now, we'll simulate a successful send
      
      toast({
        title: "Verification Email Sent",
        description: `A verification code has been sent to ${values.parentEmail}`
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
  
  const handleVerify = async (values: z.infer<typeof verificationSchema>) => {
    setIsLoading(true);
    try {
      // Here we would integrate with the backend to verify the code
      // For now, we'll simulate success with any code entry
      setVerificationCode(values.code);
      
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
          parentEmail,
          parentName
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
          <div className="flex flex-col space-y-2 mt-2">
            <Button 
              className="w-full" 
              onClick={() => setStep('parentEmail')}
            >
              Continue
            </Button>
            <Button 
              variant="outline" 
              className="w-full text-blue-600" 
              onClick={() => setShowHelp(true)}
            >
              Learn More About COPPA
            </Button>
          </div>
        </div>
      )}
      
      {step === 'parentEmail' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Parent/Guardian Information</h2>
          
          <Form {...parentForm}>
            <form onSubmit={parentForm.handleSubmit(handleSendVerification)} className="space-y-4">
              <FormField
                control={parentForm.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent/Guardian Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Full name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={parentForm.control}
                name="parentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent/Guardian Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="email@example.com" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      We'll send a verification code to this email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={parentForm.control}
                name="consentGiven"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I confirm that I am providing the correct parent/guardian email and they have agreed to
                        receive a verification message.
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => setStep('introduction')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  className="flex-1" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Verification"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
      
      {step === 'verification' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Verify Parental Consent</h2>
          <p className="text-gray-600">
            A verification code has been sent to {parentEmail}. Please ask your parent/guardian
            to check their email and enter the code below.
          </p>
          
          <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(handleVerify)} className="space-y-4">
              <FormField
                control={verificationForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter the verification code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  type="button" 
                  onClick={() => setStep('parentEmail')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  className="flex-1" 
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </div>
              
              <button 
                type="button" 
                className="text-sm text-blue-600 hover:underline mx-auto block"
                onClick={() => {
                  parentForm.getValues().parentEmail && 
                  handleSendVerification({
                    parentName: parentForm.getValues().parentName,
                    parentEmail: parentForm.getValues().parentEmail,
                    consentGiven: true
                  })
                }}
              >
                Resend code
              </button>
            </form>
          </Form>
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
            Thank you! Parental consent has been verified for {user?.email}. You can now use all features of
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
      
      {/* COPPA Information Dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>About COPPA Compliance</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <p>
              <strong>The Children's Online Privacy Protection Act (COPPA)</strong> is a law that protects the privacy of children under 13. 
              Although our service primarily targets high school students (ages 14-18), we take all privacy protections seriously.
            </p>
            
            <h3 className="font-bold">What information do we collect?</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Basic profile information (name, age, school)</li>
              <li>Contact details (email address)</li>
              <li>Employment interests and skills</li>
              <li>Job application history</li>
            </ul>
            
            <h3 className="font-bold">How do we use this information?</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>To match students with appropriate job opportunities</li>
              <li>To help employers contact students about positions</li>
              <li>To improve our service and job recommendations</li>
            </ul>
            
            <h3 className="font-bold">Parent/Guardian Rights:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>View your child's personal information</li>
              <li>Request deletion of your child's data</li>
              <li>Revoke consent at any time</li>
            </ul>
            
            <p className="text-xs italic">
              For more information, please review our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> or contact us at <a href="mailto:privacy@js4hs.com" className="text-blue-600 hover:underline">privacy@js4hs.com</a>
            </p>
          </div>
          
          <Button onClick={() => setShowHelp(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParentalConsentFlow;
