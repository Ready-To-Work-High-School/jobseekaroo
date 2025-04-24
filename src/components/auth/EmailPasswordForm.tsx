
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  try {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (e) {
    console.error("Failed to generate secure CSRF token:", e);
    throw new Error("Security error: Cannot generate secure token");
  }
}

// Sanitize email to prevent XSS
function sanitizeEmail(email: string): string {
  if (!email) return '';
  return email
    .trim()
    .toLowerCase()
    .replace(/[^\w@.-]/gi, '');
}

// Rate limiting for auth attempts
const AUTH_ATTEMPT_THRESHOLD = 5;
const AUTH_COOLDOWN_MS = 60000; // 1 minute
const AUTH_ATTEMPT_KEY = 'auth_attempts';
const AUTH_COOLDOWN_KEY = 'auth_cooldown_until';

const EmailPasswordForm = ({ onSubmit, isLoading }: EmailPasswordFormProps) => {
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  
  // Generate CSRF token when component mounts
  useEffect(() => {
    try {
      // Check for rate limiting
      const cooldownUntil = parseInt(sessionStorage.getItem(AUTH_COOLDOWN_KEY) || '0');
      if (cooldownUntil > Date.now()) {
        const secondsLeft = Math.ceil((cooldownUntil - Date.now()) / 1000);
        setRateLimited(true);
        setAuthError(`Too many attempts. Please try again in ${secondsLeft} seconds.`);
        
        // Set timer to clear rate limit message
        const timerId = setTimeout(() => {
          setRateLimited(false);
          setAuthError(null);
          sessionStorage.removeItem(AUTH_COOLDOWN_KEY);
        }, cooldownUntil - Date.now());
        
        return () => clearTimeout(timerId);
      }
      
      // Generate new token
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      
      // Store in sessionStorage only - more secure than localStorage for auth
      sessionStorage.setItem('csrfToken', newToken);
      
      // Set token expiration (10 minutes)
      const expirationTime = Date.now() + (10 * 60 * 1000);
      sessionStorage.setItem('csrfTokenExpires', expirationTime.toString());
      
      // Clean up expired token on unmount
      return () => {
        if (Date.now() > parseInt(sessionStorage.getItem('csrfTokenExpires') || '0')) {
          sessionStorage.removeItem('csrfToken');
          sessionStorage.removeItem('csrfTokenExpires');
        }
      };
    } catch (e) {
      console.error("Security setup error:", e);
      setAuthError("Security initialization failed. Please refresh the page.");
    }
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
      // Block submission if rate limited
      if (rateLimited) {
        return;
      }
      
      // Clear any previous error
      setAuthError(null);
      
      // Check auth attempts for rate limiting
      const attempts = parseInt(sessionStorage.getItem(AUTH_ATTEMPT_KEY) || '0');
      if (attempts >= AUTH_ATTEMPT_THRESHOLD) {
        // Set cooldown period
        const cooldownUntil = Date.now() + AUTH_COOLDOWN_MS;
        sessionStorage.setItem(AUTH_COOLDOWN_KEY, cooldownUntil.toString());
        sessionStorage.removeItem(AUTH_ATTEMPT_KEY); // Reset counter
        
        setRateLimited(true);
        setAuthError(`Too many login attempts. Please try again in 60 seconds.`);
        return;
      }
      
      // Validate CSRF token before submission
      const storedToken = sessionStorage.getItem('csrfToken');
      const tokenExpiration = parseInt(sessionStorage.getItem('csrfTokenExpires') || '0');
      
      // Check if token is valid and not expired
      if (storedToken !== csrfToken || Date.now() > tokenExpiration) {
        throw new Error("Security validation failed. Please refresh the page and try again.");
      }
      
      // Regenerate token on each submission for extra security
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      sessionStorage.setItem('csrfToken', newToken);
      const newExpiration = Date.now() + (10 * 60 * 1000);
      sessionStorage.setItem('csrfTokenExpires', newExpiration.toString());
      
      // Sanitize email input
      const sanitizedValues = {
        ...values,
        email: sanitizeEmail(values.email),
      };
      
      // Attempt login
      await onSubmit(sanitizedValues);
      
      // Clear attempts on success
      sessionStorage.removeItem(AUTH_ATTEMPT_KEY);
      
    } catch (error) {
      console.error("Form submission error:", error);
      
      // Increment failed attempts
      const attempts = parseInt(sessionStorage.getItem(AUTH_ATTEMPT_KEY) || '0') + 1;
      sessionStorage.setItem(AUTH_ATTEMPT_KEY, attempts.toString());
      
      setAuthError(error instanceof Error ? error.message : "An unexpected error occurred");
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
        {(form.formState.errors.root || authError) && (
          <Alert variant="destructive">
            <AlertDescription>
              {form.formState.errors.root?.message || authError}
            </AlertDescription>
          </Alert>
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
                  disabled={isLoading || rateLimited} 
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
                  disabled={isLoading || rateLimited}
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
          disabled={isLoading || rateLimited}
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
