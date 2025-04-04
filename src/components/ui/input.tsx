
import * as React from "react"
import { cn } from "@/lib/utils"
import { sanitizeHtml, escapeHtml } from "@/utils/sanitization"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showAutocomplete?: boolean;
  autocompleteItems?: string[];
  onAutocompleteSelect?: (value: string) => void;
  sanitizeInput?: boolean; // New prop to control sanitization
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showAutocomplete, autocompleteItems, onAutocompleteSelect, sanitizeInput = true, ...props }, ref) => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [sanitizedValue, setSanitizedValue] = React.useState('');

    React.useEffect(() => {
      // Close dropdown when user clicks outside
      const handleClickOutside = () => setShowDropdown(false);
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // If there's a value and sanitizeInput is true, sanitize it using enhanced function
    React.useEffect(() => {
      if (props.value && typeof props.value === 'string' && sanitizeInput) {
        setSanitizedValue(sanitizeHtml(props.value));
      } else if (props.value) {
        setSanitizedValue(String(props.value));
      } else {
        setSanitizedValue('');
      }
    }, [props.value, sanitizeInput]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (props.onFocus) props.onFocus(e);
      if (showAutocomplete && autocompleteItems?.length) {
        setShowDropdown(true);
      }
    };

    const handleItemClick = (item: string) => {
      if (onAutocompleteSelect) {
        // Sanitize before passing to select handler
        onAutocompleteSelect(sanitizeInput ? sanitizeHtml(item) : item);
      }
      setShowDropdown(false);
    };

    // Handle onChange to sanitize input as user types
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        if (sanitizeInput) {
          // Create a new synthetic event with sanitized value
          const newEvent = Object.create(e);
          newEvent.target = { ...e.target, value: sanitizeHtml(e.target.value) };
          props.onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
        } else {
          props.onChange(e);
        }
      }
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
          onChange={handleChange}
          {...props}
        />
        
        {showAutocomplete && showDropdown && autocompleteItems && autocompleteItems.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul className="py-1">
              {autocompleteItems.map((item, index) => {
                // Make sure item is sanitized
                const sanitizedItem = sanitizeInput ? escapeHtml(item) : item;
                return (
                  <li 
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(item);
                    }}
                  >
                    {sanitizedItem}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
)
Input.displayName = "Input"

export { Input }
