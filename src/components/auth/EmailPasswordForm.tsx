
import { useState, useEffect } from "react";
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

// Generate a cryptographically secure random token
function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Sanitize email to prevent XSS
function sanitizeEmail(email: string): string {
  return email
    .trim()
    .toLowerCase()
    .replace(/[^\w@.-]/gi, '');
}

const EmailPasswordForm = ({ onSubmit, isLoading }: EmailPasswordFormProps) => {
  const [csrfToken, setCsrfToken] = useState<string>("");
  
  // Generate CSRF token when component mounts
  useEffect(() => {
    const newToken = generateCSRFToken();
    setCsrfToken(newToken);
    
    // Store in localStorage and sessionStorage for cross-check validation
    localStorage.setItem('csrfToken', newToken);
    sessionStorage.setItem('csrfState', newToken);
    
    // Set token expiration (10 minutes)
    const expirationTime = Date.now() + (10 * 60 * 1000);
    localStorage.setItem('csrfTokenExpires', expirationTime.toString());
    
    // Clean up expired token on unmount
    return () => {
      if (Date.now() > parseInt(localStorage.getItem('csrfTokenExpires') || '0')) {
        localStorage.removeItem('csrfToken');
        localStorage.removeItem('csrfTokenExpires');
        sessionStorage.removeItem('csrfState');
      }
    };
  }, []);
  
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
      const sessionToken = sessionStorage.getItem('csrfState');
      const tokenExpiration = parseInt(localStorage.getItem('csrfTokenExpires') || '0');
      
      // Check if token is valid and not expired
      if (storedToken !== csrfToken || sessionToken !== csrfToken || Date.now() > tokenExpiration) {
        throw new Error("Security validation failed. Please refresh the page and try again.");
      }
      
      // Regenerate token on each submission for extra security
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      localStorage.setItem('csrfToken', newToken);
      sessionStorage.setItem('csrfState', newToken);
      const newExpiration = Date.now() + (10 * 60 * 1000);
      localStorage.setItem('csrfTokenExpires', newExpiration.toString());
      
      // Sanitize email input
      const sanitizedValues = {
        ...values,
        email: sanitizeEmail(values.email),
      };
      
      // Pass client IP if available (for rate limiting)
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        if (ipData.ip) {
          localStorage.setItem('lastClientIP', ipData.ip);
        }
      } catch (ipError) {
        console.warn('Could not determine client IP for security monitoring:', ipError);
      }
      
      await onSubmit(sanitizedValues);
    } catch (error) {
      console.error("Form submission error:", error);
      form.setError("root", { 
        message: error instanceof Error ? error.message : "An unexpected error occurred" 
      });
    }
  };

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
