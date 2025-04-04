
import React, { useState, useRef, useEffect } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface RedemptionCodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  isValid?: boolean;
}

const RedemptionCodeInput: React.FC<RedemptionCodeInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  isValid = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle completion detection
  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [value, length, onComplete]);

  return (
    <div className="space-y-4">
      <InputOTP
        maxLength={length}
        value={value}
        onChange={onChange}
        disabled={disabled}
        containerClassName="gap-3 justify-center"
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <InputOTPGroup>
          {Array.from({ length }).map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className={cn(
                "w-12 h-12 text-lg transition-all duration-300 border-2",
                isAnimating && "animate-pulse",
                isValid && "border-green-500 bg-green-50",
                isFocused && "ring-2 ring-offset-2 ring-primary",
                value.length === length && i < value.length && "border-primary"
              )}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      
      {isValid && (
        <div className="flex items-center justify-center text-green-600 animate-fade-in">
          <Check className="w-5 h-5 mr-1" />
          <span>Valid code</span>
        </div>
      )}
    </div>
  );
};

export default RedemptionCodeInput;
