
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

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
    
    // Calculate password strength
    let score = 0;
    let message = '';
    
    // Length check
    if (password.length >= 12) {
      score += 1;
    }
    
    // Complexity checks
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (hasUpperCase) score += 1;
    if (hasLowerCase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecialChar) score += 1;
    
    // Common patterns check
    const commonPatterns = [
      /^(?=.*password)/i, /^12345/, /^qwerty/i, /^admin/i,
      /password/i, /letmein/i, /welcome/i, /123456/, /abc123/i
    ];
    
    if (commonPatterns.some(pattern => pattern.test(password))) {
      score = Math.max(1, score - 2); // Reduce score for common patterns
    }
    
    // Sequential characters check
    const sequentialPatterns = [
      /abc/i, /bcd/i, /cde/i, /def/i, /efg/i, /fgh/i, /ghi/i, /hij/i,
      /123/, /234/, /345/, /456/, /567/, /678/, /789/
    ];
    
    if (sequentialPatterns.some(pattern => pattern.test(password))) {
      score = Math.max(1, score - 1); // Reduce score for sequential characters
    }
    
    // Set message based on score
    if (score <= 2) {
      message = 'Weak';
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
          strength.score <= 2 ? "text-red-600" : 
          strength.score <= 4 ? "text-amber-600" : 
          "text-green-600"
        )}>
          {strength.message}
          {strength.score <= 2 && <XCircle className="ml-1 inline h-4 w-4" />}
          {strength.score > 2 && strength.score <= 4 && <AlertCircle className="ml-1 inline h-4 w-4" />}
          {strength.score > 4 && <CheckCircle className="ml-1 inline h-4 w-4" />}
        </span>
      </div>
      
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-300",
            strength.score <= 2 ? "bg-red-500" : 
            strength.score <= 4 ? "bg-amber-500" : 
            "bg-green-500"
          )}
          style={{ width: `${Math.min(100, (strength.score / 5) * 100)}%` }}
        />
      </div>
      
      {strength.score <= 4 && (
        <ul className="mt-2 text-xs text-gray-600 space-y-1 list-disc pl-5">
          {password.length < 12 && (
            <li>Use at least 12 characters</li>
          )}
          {!(/[A-Z]/.test(password)) && (
            <li>Include uppercase letters</li>
          )}
          {!(/[a-z]/.test(password)) && (
            <li>Include lowercase letters</li>
          )}
          {!(/\d/.test(password)) && (
            <li>Include numbers</li>
          )}
          {!(/[!@#$%^&*(),.?":{}|<>]/.test(password)) && (
            <li>Include special characters (!@#$%^&*)</li>
          )}
        </ul>
      )}
    </div>
  );
}
