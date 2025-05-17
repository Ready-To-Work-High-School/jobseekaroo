
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, WifiOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { useNetworkStatus } from "@/components/auth/hooks/useNetworkStatus";
import NetworkOfflineState from "@/components/auth/diagnostic/NetworkOfflineState";

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordResetFormProps {
  onSuccess: () => void;
}

const PasswordResetForm = ({ onSuccess }: PasswordResetFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnline = useNetworkStatus();
  const [retryCount, setRetryCount] = useState(0);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get token from URL hash with security checks
      const searchParams = new URLSearchParams(location.hash.substring(1));
      const accessToken = searchParams.get("access_token");
      const type = searchParams.get("type");
      
      console.log("Token validation checks:", { 
        hasAccessToken: !!accessToken,
        tokenType: type
      });
      
      // Additional security validations
      if (!accessToken) {
        throw new Error("No access token found in URL. Please request a new password reset link.");
      }
      
      // Validate token type for password recovery
      if (type !== "recovery") {
        throw new Error("Invalid token type. Please request a new password reset link.");
      }
      
      console.log("Attempting to update password using token");
      
      // Update password using the access_token - Supabase handles this automatically
      // when we have an active recovery flow in progress
      const { data, error: updateError } = await supabase.auth.updateUser(
        { password: values.password }
      );
      
      if (updateError) {
        console.error("Password update error:", updateError);
        throw updateError;
      }
      
      console.log("Password updated successfully");
      onSuccess();
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. You can now sign in with your new password.",
      });
      
      // Sign out after password reset to clear the temporary session
      await supabase.auth.signOut();
      
      // Redirect to sign-in page after 3 seconds
      setTimeout(() => navigate("/sign-in"), 3000);
    } catch (err: any) {
      console.error('Password reset error:', err);
      
      // Check if this is a network connectivity issue
      if (!navigator.onLine || err.message === "Failed to fetch" || err.message?.includes("network")) {
        setError("Network connection issue detected. Please check your internet connection and try again.");
        toast({
          variant: "destructive",
          title: "Connection error",
          description: "Unable to connect to authentication service. Please check your network connection.",
        });
      } else {
        setError(err.message || "Failed to reset password. Please try again or request a new reset link.");
        toast({
          variant: "destructive",
          title: "Password reset failed",
          description: err.message || "Failed to reset password. Please try again or request a new reset link.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to retry connection
  const handleRetryConnection = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    toast({
      title: "Retrying connection",
      description: "Attempting to reconnect to the server...",
    });
  };

  // If user is offline, show offline state component
  if (!isOnline) {
    return <NetworkOfflineState />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  placeholder="••••••••" 
                  {...field} 
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  placeholder="••••••••" 
                  {...field} 
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating Password...
            </>
          ) : "Reset Password"}
        </Button>
        
        {error && error.includes("network") && (
          <Button 
            type="button"
            variant="outline"
            className="w-full mt-2 flex items-center"
            onClick={handleRetryConnection}
          >
            <Loader2 className={`mr-2 h-4 w-4 ${retryCount > 0 ? "animate-spin" : ""}`} />
            Retry Connection
          </Button>
        )}
      </form>
    </Form>
  );
};

export default PasswordResetForm;
