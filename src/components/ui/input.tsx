
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showAutocomplete?: boolean;
  autocompleteItems?: string[];
  onAutocompleteSelect?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showAutocomplete, autocompleteItems = [], onAutocompleteSelect, ...props }, ref) => {
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          {...props}
        />
        
        {showAutocomplete && showSuggestions && autocompleteItems.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-background border border-input rounded-md shadow-md max-h-60 overflow-auto">
            {autocompleteItems.map((item, index) => (
              <div 
                key={index}
                className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                onClick={() => {
                  if (onAutocompleteSelect) {
                    onAutocompleteSelect(item);
                  }
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
