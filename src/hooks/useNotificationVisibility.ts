
import { useState, useEffect } from 'react';

export const useNotificationVisibility = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-notification-center]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return { isOpen, setIsOpen };
};
