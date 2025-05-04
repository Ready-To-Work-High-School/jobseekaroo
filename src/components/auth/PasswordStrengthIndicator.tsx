
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const [strength, setStrength] = useState<{score: number; message: string}>({ score: 0, message: '' });
  
  useEffect(() => {
    if (!password) {
      setStrength({ score: 0, message: '' });
      return;
    }
    
    // Simplified strength calculation
    let score = 0;
    let message = '';
    
    // Length check
    if (password.length >= 6) {
      score = 3; // Consider it "Moderate" if it meets minimum length
    }
    
    // Additional points for complexity
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (hasUpperCase) score += 0.5;
    if (hasLowerCase) score += 0.5;
    if (hasNumbers) score += 0.5;
    if (hasSpecialChar) score += 0.5;
    
    // Set message based on score
    if (password.length < 6) {
      message = 'Too Short';
    } else if (score <= 3) {
      message = 'Basic';
    } else if (score <= 4) {
      message = 'Moderate';
    } else {
      message = 'Strong';
    }
    
    setStrength({ score, message });
  }, [password]);
  
  if (!password) {
    return null;
  }
  
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">Password strength:</span>
        <span className={cn(
          "text-sm font-medium",
          password.length < 6 ? "text-red-600" : 
          strength.score <= 3 ? "text-amber-600" : 
          "text-green-600"
        )}>
          {strength.message}
          {password.length < 6 && <XCircle className="ml-1 inline h-4 w-4" />}
          {password.length >= 6 && <CheckCircle className="ml-1 inline h-4 w-4" />}
        </span>
      </div>
      
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-300",
            password.length < 6 ? "bg-red-500" : 
            strength.score <= 3 ? "bg-amber-500" : 
            "bg-green-500"
          )}
          style={{ width: `${password.length < 6 ? 20 : Math.min(100, (strength.score / 5) * 100)}%` }}
        />
      </div>
      
      {password.length < 6 && (
        <ul className="mt-2 text-xs text-gray-600 space-y-1 list-disc pl-5">
          <li>Use at least 6 characters</li>
        </ul>
      )}
    </div>
  );
}
