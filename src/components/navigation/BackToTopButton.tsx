
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToTopButton = () => {
  const navigate = useNavigate();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Detect scroll position to show/hide scroll to top functionality
  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollPosition = window.scrollY;
      setShowScrollToTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 flex flex-col gap-2 z-40">
      {showScrollToTop && (
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full shadow-md"
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
      <Button 
        variant="secondary" 
        size="icon" 
        className="rounded-full shadow-md"
        onClick={handleGoBack}
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default BackToTopButton;
