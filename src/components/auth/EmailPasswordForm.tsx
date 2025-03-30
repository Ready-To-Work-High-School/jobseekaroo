
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// More robust schema with strong validation
const signInSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must be less than 255 characters")
    .trim()
    .toLowerCase(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be less than 72 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export type SignInValues = z.infer<typeof signInSchema>;

interface EmailPasswordFormProps {
  onSubmit: (values: SignInValues) => Promise<void>;
  isLoading: boolean;
}

const EmailPasswordForm = ({ onSubmit, isLoading }: EmailPasswordFormProps) => {
  const [csrfToken, setCsrfToken] = useState<string>("");
  
  // Generate CSRF token when component mounts
  useState(() => {
    const newToken = generateCSRFToken();
    setCsrfToken(newToken);
    
    // Store in localStorage for cross-check validation
    localStorage.setItem('csrfToken', newToken);
  });
  
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: SignInValues) => {
    try {
      // Validate CSRF token before submission
      const storedToken = localStorage.getItem('csrfToken');
      if (storedToken !== csrfToken) {
        throw new Error("Security validation failed. Please refresh the page and try again.");
      }
      
      // Regenerate token on each submission
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      localStorage.setItem('csrfToken', newToken);
      
      // Sanitize email input
      const sanitizedValues = {
        ...values,
        email: sanitizeEmail(values.email),
      };
      
      await onSubmit(sanitizedValues);
    } catch (error) {
      console.error("Form submission error:", error);
      form.setError("root", { 
        message: error instanceof Error ? error.message : "An unexpected error occurred" 
      });
    }
  };
  
  // CSRF token generation function
  function generateCSRFToken(): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  
  // Sanitize email to prevent XSS
  function sanitizeEmail(email: string): string {
    return email
      .trim()
      .toLowerCase()
      .replace(/[^\w@.-]/gi, '');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Hidden CSRF token field */}
        <input type="hidden" name="csrfToken" value={csrfToken} />
        
        {/* Display root error */}
        {form.formState.errors.root && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded">
            {form.formState.errors.root.message}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  disabled={isLoading} 
                  className="focus:border-primary focus:ring-1 focus:ring-primary"
                  autoComplete="email"
                  inputMode="email"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your password" 
                  type="password" 
                  disabled={isLoading} 
                  className="focus:border-primary focus:ring-1 focus:ring-primary"
                  autoComplete="current-password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full transition-all" 
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> 
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EmailPasswordForm;
