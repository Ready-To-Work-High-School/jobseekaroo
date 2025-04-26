
import React, { useEffect } from 'react';
import { useScript } from '@/hooks/useScript';
import { cn } from '@/lib/utils';

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
