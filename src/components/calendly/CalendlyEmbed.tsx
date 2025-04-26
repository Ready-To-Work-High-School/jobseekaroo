
import React, { useEffect } from 'react';
import { useScript } from '@/hooks/useScript';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface CalendlyEmbedProps {
  url?: string;
  className?: string;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ 
  url = `https://calendly.com/d/${process.env.CALENDLY_CLIENT_ID}`,
  className 
}) => {
  const scriptStatus = useScript('https://assets.calendly.com/assets/external/widget.js');

  useEffect(() => {
    if (scriptStatus === 'ready' && window.Calendly) {
      window.Calendly.initInlineWidget({
        url,
        parentElement: document.querySelector('.calendly-inline-widget'),
      });
    }
  }, [scriptStatus, url]);

  if (scriptStatus === 'loading') {
    return (
      <div className="min-h-[650px] w-full flex items-center justify-center bg-muted/5">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (scriptStatus === 'error') {
    return (
      <div className="min-h-[650px] w-full flex items-center justify-center bg-destructive/5 text-destructive">
        Failed to load scheduling widget. Please try again later.
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "calendly-inline-widget min-h-[650px] w-full",
        className
      )} 
    />
  );
};

export default CalendlyEmbed;
