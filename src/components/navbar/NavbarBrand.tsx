
import { Link } from 'react-router-dom';

export const NavbarBrand = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2 relative">
        <Link to="/admin?adminTest=true" className="h-4 w-4 relative" aria-label="Admin Access" title="Admin Access">
          {/* Enhanced gradient to match ESB badge style with stronger accent */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-700 to-amber-400 opacity-30 blur-lg glow-pulse"></div>
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-500 to-blue-600 opacity-25 blur-xl"></div>
          <img 
            src="/lovable-uploads/8587ce26-fbc1-463b-a0ef-e63f5fda9889.png" 
            alt="Admin Access" 
            className="w-full h-full object-contain relative z-10 rounded-md"
          />
        </Link>
        <div className="relative">
          {/* Accent glow behind the text */}
          <div className="absolute -inset-1 rounded-md bg-gradient-to-r from-amber-400 via-blue-500 to-blue-700 opacity-75 blur-sm -z-10"></div>
          <Link to="/" className="relative text-xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent px-2 py-1">
            Job Seekers 4 High Schools
          </Link>
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground ml-8">© {new Date().getFullYear()} All Rights Reserved</span>
    </div>
  );
};
