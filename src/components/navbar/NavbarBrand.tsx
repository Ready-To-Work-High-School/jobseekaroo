
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const NavbarBrand = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="relative flex items-center">
        {!imageError ? (
          <span className="relative flex items-center">
            {/* Glow effect behind the logo */}
            <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-400 via-amber-300 to-purple-500 opacity-50 blur-[6px] pointer-events-none animate-pulse"></span>
            <img
              src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.webp"
              alt="JS4HS Logo"
              width={42}
              height={42}
              className="h-10 w-10 object-contain relative z-10"
              onError={handleImageError}
              loading="eager"
            />
          </span>
        ) : (
          <span className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-sm z-10">
            JS4HS
          </span>
        )}
      </Link>
    </div>
  );
};

