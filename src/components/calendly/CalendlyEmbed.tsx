
import React, { useEffect } from 'react';
import { useScript } from '@/hooks/useScript';
import { useCalendlyConfig } from '@/hooks/useCalendlyConfig';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface CalendlyEmbedProps {
  url?: string;
  className?: string;
  userName?: string;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ 
  url,
  className,
  userName 
}) => {
  const { isConfigured, getUrlForUser } = useCalendlyConfig();
  const calendlyUrl = url || getUrlForUser(userName);
  
  const scriptStatus = useScript('https://assets.calendly.com/assets/external/widget.js');

  useEffect(() => {
    if (scriptStatus === 'ready' && window.Calendly && calendlyUrl) {
      console.log('Initializing Calendly with URL:', calendlyUrl);
      window.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: document.querySelector('.calendly-inline-widget'),
      });
    }
  }, [scriptStatus, calendlyUrl]);

  if (scriptStatus === 'loading') {
    return (
      <div 
        className="min-h-[650px] w-full flex items-center justify-center bg-muted/5"
        data-testid="calendly-loading"
      >
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading scheduling widget...</p>
        </div>
      </div>
    );
  }

  if (scriptStatus === 'error') {
    return (
      <div 
        className="min-h-[650px] w-full flex items-center justify-center bg-destructive/5 text-destructive border border-destructive/20 rounded-lg"
        data-testid="calendly-error"
      >
        <div className="text-center p-6">
          <p className="font-medium mb-2">Failed to load scheduling widget</p>
          <p className="text-sm">Please check your internet connection and try again later.</p>
        </div>
      </div>
    );
  }

  if (!calendlyUrl || !isConfigured) {
    return (
      <div 
        className="min-h-[650px] w-full flex items-center justify-center bg-amber-50 text-amber-800 border border-amber-200 rounded-lg"
        data-testid="calendly-missing-config"
      >
        <div className="text-center p-6">
          <p className="font-medium mb-2">Calendly Configuration Missing</p>
          <p className="text-sm mb-4">
            To enable scheduling, please add your Calendly Client ID to the environment variables.
          </p>
          <p className="text-xs text-amber-600">
            Set VITE_CALENDLY_CLIENT_ID in your environment configuration
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "calendly-inline-widget min-h-[650px] w-full",
        className
      )}
      data-testid="calendly-widget"
    />
  );
};

export default CalendlyEmbed;
