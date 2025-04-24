
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

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
      
      // Additional security validations
      if (!accessToken) {
        throw new Error("No access token found in URL. Please request a new password reset link.");
      }
      
      // Validate token type for password recovery
      if (type !== "recovery") {
        throw new Error("Invalid token type. Please request a new password reset link.");
      }
      
      // Validate token structure (basic checks)
      if (!accessToken.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
        throw new Error("Invalid token format. Please request a new password reset link.");
      }
      
      console.log("Attempting to update password using verified token");
      
      // Set the session with the access token, with timeout for security
      const sessionPromise = new Promise(async (resolve, reject) => {
        const timeoutId = setTimeout(() => reject(new Error("Session update timed out")), 5000);
        try {
          const result = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: "",
          });
          clearTimeout(timeoutId);
          resolve(result);
        } catch (err) {
          clearTimeout(timeoutId);
          reject(err);
        }
      });
      
      const { error: sessionError } = await sessionPromise as any;
      if (sessionError) throw sessionError;
      
      // Then update the password
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });
      
      if (error) {
        console.error("Update password error:", error);
        throw error;
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
      setError(err.message || "Failed to reset password. Please try again or request a new reset link.");
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: err.message || "Failed to reset password. Please try again or request a new reset link.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      </form>
    </Form>
  );
};

export default PasswordResetForm;
