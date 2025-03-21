
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

interface SearchFormProps {
  className?: string;
  variant?: 'default' | 'minimal';
  initialZipCode?: string;
  initialRadius?: number;
}

const SearchForm = ({ 
  className, 
  variant = 'default',
  initialZipCode = '',
  initialRadius = 0
}: SearchFormProps) => {
  const [searchParams] = useSearchParams();
  const [zipCode, setZipCode] = useState(initialZipCode);
  const [radius, setRadius] = useState(initialRadius);
  const [isValid, setIsValid] = useState(true);
  const [showRadius, setShowRadius] = useState(initialRadius > 0);
  const navigate = useNavigate();

  const validateZipCode = (zip: string) => {
    // Basic validation for US zip code (5 digits)
    return /^\d{5}$/.test(zip);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode.trim()) {
      setIsValid(false);
      return;
    }
    
    const isZipValid = validateZipCode(zipCode);
    setIsValid(isZipValid);
    
    if (isZipValid) {
      const params = new URLSearchParams(searchParams);
      params.set('zipCode', zipCode);
      
      if (radius > 0) {
        params.set('radius', radius.toString());
      } else {
        params.delete('radius');
      }
      
      navigate(`/jobs?${params.toString()}`);
    }
  };

  const toggleRadius = () => {
    setShowRadius(!showRadius);
    if (!showRadius) {
      setRadius(10); // Default radius when toggled on
    } else {
      setRadius(0); // Reset radius when toggled off
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative",
        variant === 'default' && "w-full max-w-md",
        variant === 'minimal' && "w-full max-w-xs",
        className
      )}
    >
      <div className="flex items-center">
        <div className="relative flex-1">
          <div className="absolute left-3 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter ZIP code"
            className={cn(
              "w-full pl-10 pr-20 py-3 rounded-full border focus-ring",
              "bg-white text-foreground placeholder:text-muted-foreground/60",
              "transition-all duration-200",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              variant === 'default' && "text-base",
              variant === 'minimal' && "text-sm py-2",
              !isValid && "border-destructive focus-visible:ring-destructive",
              isValid && zipCode ? "border-primary bg-blue-50/50" : ""
            )}
            aria-invalid={!isValid}
          />
        </div>
        
        <button
          type="submit"
          className={cn(
            "ml-2 rounded-full focus-ring",
            "text-white font-medium",
            "transition-all duration-200 hover:bg-primary/90",
            variant === 'default' ? (
              "bg-primary px-4 py-2"
            ) : (
              "bg-primary px-3 py-1 text-sm"
            )
          )}
        >
          {variant === 'default' ? 'Find Jobs' : 'Search'}
        </button>
      </div>
      
      <div className="mt-2 flex items-center">
        <button 
          type="button" 
          onClick={toggleRadius}
          className={cn(
            "text-xs underline text-primary px-2 py-1",
            "hover:text-primary/80 transition-colors"
          )}
        >
          {showRadius ? "Remove radius" : "Add radius filter"}
        </button>
        
        {showRadius && (
          <div className="flex-1 flex flex-col gap-1 px-2">
            <div className="flex items-center gap-2">
              <Slider
                value={[radius]}
                min={1}
                max={50}
                step={1}
                onValueChange={(values) => setRadius(values[0])}
                className="flex-1"
              />
              <span className="text-xs font-medium min-w-[45px]">
                {radius} mile{radius !== 1 ? 's' : ''}
              </span>
            </div>
            <Progress value={(radius / 50) * 100} className="h-1" />
          </div>
        )}
      </div>
      
      {!isValid && (
        <p className="absolute -bottom-6 left-0 text-xs text-destructive">
          Please enter a valid 5-digit ZIP code
        </p>
      )}
    </form>
  );
};

export default SearchForm;
