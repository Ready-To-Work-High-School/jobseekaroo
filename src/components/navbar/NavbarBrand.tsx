
import { Link } from 'react-router-dom';

export const NavbarBrand = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2 relative">
        <div className="relative">
          {/* Enhanced accent glow behind the text for the larger logo */}
          <div className="absolute -inset-3 rounded-md bg-gradient-to-r from-amber-400 via-blue-500 to-blue-700 opacity-75 blur-lg -z-10"></div>
          <Link to="/" className="relative text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent px-4 py-3">
            Job Seekers 4 High Schools
          </Link>
        </div>
      </div>
      <span className="text-xs text-muted-foreground ml-8">© {new Date().getFullYear()} All Rights Reserved</span>
    </div>
  );
};
