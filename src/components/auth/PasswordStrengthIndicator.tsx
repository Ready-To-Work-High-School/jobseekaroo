
import React from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  // Simple password strength calculation
  const getStrength = (): { strength: number; label: string; color: string } => {
    if (!password) {
      return { strength: 0, label: 'No password', color: 'bg-gray-300' };
    }
    
    let strength = 0;
    
    // Length check
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Map strength to label and color
    switch (true) {
      case strength <= 1:
        return { strength: 1, label: 'Weak', color: 'bg-red-500' };
      case strength <= 3:
        return { strength: 2, label: 'Fair', color: 'bg-yellow-500' };
      case strength <= 4:
        return { strength: 3, label: 'Good', color: 'bg-blue-500' };
      default:
        return { strength: 4, label: 'Strong', color: 'bg-green-500' };
    }
  };
  
  const { strength, label, color } = getStrength();
  const percentage = (strength / 4) * 100;
  
  if (!password) return null;
  
  return (
    <div className="mt-2">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={`text-xs mt-1 ${strength <= 1 ? 'text-red-500' : strength <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
        Password strength: {label}
      </p>
      
      {strength <= 2 && (
        <p className="text-xs text-gray-600 mt-1">
          Tip: Use a combination of uppercase, lowercase, numbers, and special characters
        </p>
      )}
    </div>
  );
};
