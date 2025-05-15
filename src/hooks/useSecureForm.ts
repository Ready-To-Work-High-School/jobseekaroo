
import { FormEvent, useCallback } from 'react';
import { sanitizeFormData, ensureHttps } from '@/utils/security';

/**
 * Hook to make form submissions more secure by sanitizing inputs
 * and ensuring form submissions use HTTPS
 */
export const useSecureForm = <T extends Record<string, any>>(
  onSubmit: (data: T) => void
) => {
  const handleSecureSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(event.currentTarget);
      const formValues: Record<string, any> = {};
      
      // Convert FormData to object
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      
      // Sanitize the data
      const sanitizedData = sanitizeFormData(formValues as T);
      
      // Make sure action URL uses HTTPS
      const formElement = event.currentTarget;
      const actionUrl = formElement.getAttribute('action');
      
      if (actionUrl && actionUrl.startsWith('http:')) {
        formElement.setAttribute('action', ensureHttps(actionUrl));
      }
      
      // Call the original onSubmit with sanitized data
      onSubmit(sanitizedData);
    },
    [onSubmit]
  );
  
  return { handleSecureSubmit };
};

export default useSecureForm;
