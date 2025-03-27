
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
      console.log("Attempting to update password");
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
