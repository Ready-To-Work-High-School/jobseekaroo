
import { Link } from 'react-router-dom';

export const NavbarBrand = () => {
  return (
    <Link to="/" className="flex flex-col items-start">
      <div className="flex items-center gap-2 relative">
        <div className="h-9 w-9 relative">
          {/* Added blue-gold gradient glow around logo */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
          <img 
            src="/lovable-uploads/6a344606-c844-465c-b643-7ff460697a49.png" 
            alt="JS4HS Logo" 
            className="h-full w-full object-contain relative z-10"
          />
        </div>
        <div className="relative">
          {/* Accent glow behind the text */}
          <div className="absolute -inset-1 rounded-md bg-gradient-to-r from-amber-400 via-blue-500 to-blue-700 opacity-75 blur-sm -z-10"></div>
          <span className="relative text-xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent px-2 py-1">
            Job Seekers 4 High Schools
          </span>
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground ml-8">© {new Date().getFullYear()} All Rights Reserved</span>
    </Link>
  );
};
