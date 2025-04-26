
import React, { useEffect } from 'react';
import { useScript } from '@/hooks/useScript';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface CalendlyEmbedProps {
  url?: string;
  className?: string;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ 
  url,
  className 
}) => {
  // Safely access environment variables and format URL correctly
  const defaultUrl = process.env.CALENDLY_CLIENT_ID ? 
    `https://calendly.com/d/${process.env.CALENDLY_CLIENT_ID}` : 
    '';
    
  // Use provided URL or fallback to default
  const calendlyUrl = url || defaultUrl;
  const scriptStatus = useScript('https://assets.calendly.com/assets/external/widget.js');

  useEffect(() => {
    if (scriptStatus === 'ready' && window.Calendly && calendlyUrl) {
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
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (scriptStatus === 'error') {
    return (
      <div 
        className="min-h-[650px] w-full flex items-center justify-center bg-destructive/5 text-destructive"
        data-testid="calendly-error"
      >
        Failed to load scheduling widget. Please try again later.
      </div>
    );
  }

  if (!calendlyUrl) {
    return (
      <div 
        className="min-h-[650px] w-full flex items-center justify-center bg-amber-50 text-amber-600 border border-amber-200"
        data-testid="calendly-missing-config"
      >
        Calendly configuration is missing. Please check your environment variables.
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
