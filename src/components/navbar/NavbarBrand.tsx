
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const NavbarBrand = () => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2 relative">
        <div className="relative">
          {/* Enhanced accent glow behind the logo */}
          <div className="absolute -inset-3 rounded-md bg-gradient-to-r from-amber-400 via-blue-500 to-blue-700 opacity-75 blur-lg -z-10 animate-pulse-slow"></div>
          <Link to="/" className="relative flex items-center px-4 py-3 logo-accent logo-shimmer">
            {!imageError ? (
              <picture>
                <source 
                  type="image/webp" 
                  srcSet="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.webp" 
                />
                <img 
                  src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
                  alt="Job Seekers 4 High Schools"
                  className="h-16 w-auto logo-shadow logo-hover-effect" 
                  width="160"
                  height="64"
                  onError={handleImageError}
                />
              </picture>
            ) : (
              <div className="h-16 w-40 bg-gray-100 rounded flex items-center justify-center text-gray-500 font-bold">
                JS4HS Logo
              </div>
            )}
          </Link>
        </div>
      </div>
      <span className="text-xs text-muted-foreground ml-8">© {new Date().getFullYear()} All Rights Reserved</span>
    </div>
  );
};
