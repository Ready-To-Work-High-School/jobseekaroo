
import { Link } from 'react-router-dom';

export const NavbarBrand = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2 relative">
        <div className="relative">
          {/* Enhanced accent glow behind the logo */}
          <div className="absolute -inset-3 rounded-md bg-gradient-to-r from-amber-400 via-blue-500 to-blue-700 opacity-75 blur-lg -z-10"></div>
          <Link to="/" className="relative flex items-center px-4 py-3">
            <img 
              src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
              alt="Job Seekers 4 High Schools"
              className="h-16 w-auto" 
            />
          </Link>
        </div>
      </div>
      <span className="text-xs text-muted-foreground ml-8">© {new Date().getFullYear()} All Rights Reserved</span>
    </div>
  );
};
