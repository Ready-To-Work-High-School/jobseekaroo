
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showAutocomplete?: boolean;
  autocompleteItems?: string[];
  onAutocompleteSelect?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showAutocomplete, autocompleteItems, onAutocompleteSelect, ...props }, ref) => {
    const [showDropdown, setShowDropdown] = React.useState(false);

    React.useEffect(() => {
      // Close dropdown when user clicks outside
      const handleClickOutside = () => setShowDropdown(false);
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (props.onFocus) props.onFocus(e);
      if (showAutocomplete && autocompleteItems?.length) {
        setShowDropdown(true);
      }
    };

    const handleItemClick = (item: string) => {
      if (onAutocompleteSelect) {
        onAutocompleteSelect(item);
      }
      setShowDropdown(false);
    };

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onClick={(e) => e.stopPropagation()}
          {...props}
        />
        
        {showAutocomplete && showDropdown && autocompleteItems && autocompleteItems.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul className="py-1">
              {autocompleteItems.map((item, index) => (
                <li 
                  key={index}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
)
Input.displayName = "Input"

export { Input }
