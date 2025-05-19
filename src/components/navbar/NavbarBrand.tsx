
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const NavbarBrand = () => {
  const [imageError, setImageError] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleLogoClick = (e) => {
    // If ctrl/cmd key is pressed, increment counter
    if (e.ctrlKey || e.metaKey) {
      // Prevent default browser behavior (opening in new tab)
      e.preventDefault();
      e.stopPropagation();
      
      const newCount = clickCount + 1;
      setClickCount(newCount);
      
      // After 3 clicks with ctrl/cmd key, redirect to CEO portal
      if (newCount >= 3) {
        setClickCount(0);
        window.location.href = '/ceo-portal';
      } else {
        // Show hint briefly
        setShowHint(true);
        setTimeout(() => setShowHint(false), 2000);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 relative">
      <Link 
        to="/" 
        className="relative flex items-center"
        onClick={handleLogoClick}
        title="Home"
      >
        {!imageError ? (
          <span className="relative flex items-center">
            {/* Glow effect behind the logo */}
            <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-500 opacity-50 blur-[6px] pointer-events-none animate-pulse"></span>
            <img
              src="/lovable-uploads/07748c3e-c8ae-4f0e-a79d-89da75c12094.png"
              alt="JS4HS Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain relative z-10"
              onError={handleImageError}
              loading="eager"
            />
          </span>
        ) : (
          <span className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-sm z-10">
            JS4HS
          </span>
        )}
      </Link>
      
      {/* Hidden hint that appears only after ctrl+clicking */}
      {showHint && (
        <div className="absolute left-0 top-full mt-1 p-1 bg-black/80 text-white text-xs rounded whitespace-nowrap z-50">
          {clickCount}/3 clicks to CEO access
        </div>
      )}
    </div>
  );
};
