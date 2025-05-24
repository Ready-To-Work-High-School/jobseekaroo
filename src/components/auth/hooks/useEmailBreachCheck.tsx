
import { useState, useEffect } from 'react';
import { checkEmailBreach, EmailBreachResult } from '@/lib/security/emailBreachCheck';

export const useEmailBreachCheck = (email: string) => {
  const [emailBreachResult, setEmailBreachResult] = useState<EmailBreachResult | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  useEffect(() => {
    if (!email || !email.includes('@')) {
      setEmailBreachResult(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingEmail(true);
      try {
        const result = await checkEmailBreach(email);
        setEmailBreachResult(result);
      } catch (error) {
        console.error('Email breach check failed:', error);
      } finally {
        setCheckingEmail(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [email]);

  return { emailBreachResult, checkingEmail };
};
