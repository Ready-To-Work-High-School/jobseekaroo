
import React, { useState } from 'react';
import { 
  Languages, 
  Accessibility, 
  Map, 
  Contact, 
  Share, 
  Mail, 
  Linkedin, 
  Facebook 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { icon: Languages, label: 'Translate', href: '#translate' },
    { icon: Accessibility, label: 'Accessibility', href: '#accessibility' },
    { icon: Map, label: 'Sitemap', href: '#sitemap' },
    { icon: Contact, label: 'Contact', href: '#contact' },
    { icon: Share, label: 'Share', href: '#share' },
    { icon: Mail, label: 'Mail', href: 'mailto:contact@jobseekers4hs.org' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' }
  ];

  return (
    <div className={`fixed right-0 top-1/3 z-50 flex items-start transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-12'}`}>
      {/* Toggle button */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={togglePanel} 
        className="h-10 w-12 rounded-l-lg rounded-r-none border-r-0 bg-secondary"
        aria-label={isOpen ? 'Close side panel' : 'Open side panel'}
      >
        {isOpen ? (
          <span className="text-xl font-bold">&raquo;</span>
        ) : (
          <span className="text-xl font-bold">&laquo;</span>
        )}
      </Button>
      
      {/* Panel content */}
      <div className={`flex h-auto flex-col gap-2 rounded-l-lg border bg-secondary p-2 shadow-md`}>
        <TooltipProvider delayDuration={300}>
          {links.map((link, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  asChild
                >
                  <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                    <link.icon className="h-5 w-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SidePanel;
