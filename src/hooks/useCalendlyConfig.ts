
import { useMemo } from 'react';

interface CalendlyConfig {
  clientId: string | undefined;
  isConfigured: boolean;
  defaultUrl: string | undefined;
  getUrlForUser: (userName?: string) => string | undefined;
}

export const useCalendlyConfig = (): CalendlyConfig => {
  const clientId = import.meta.env.VITE_CALENDLY_CLIENT_ID;
  
  const config = useMemo(() => {
    const isConfigured = Boolean(clientId);
    const defaultUrl = clientId ? `https://calendly.com/d/${clientId}` : undefined;
    
    const getUrlForUser = (userName?: string): string | undefined => {
      if (userName) {
        return `https://calendly.com/${userName.toLowerCase().replace(/\s+/g, '-')}`;
      }
      return defaultUrl;
    };
    
    return {
      clientId,
      isConfigured,
      defaultUrl,
      getUrlForUser,
    };
  }, [clientId]);
  
  return config;
};
