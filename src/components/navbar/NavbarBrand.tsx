
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NavbarBrand = () => {
  return (
    <Link to="/" className="flex flex-col items-start">
      <div className="flex items-center gap-2">
        <Home className="h-6 w-6 text-primary" aria-hidden="true" />
        <span className="text-xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent">
          Job Seekers 4 High Schools
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground ml-8">© {new Date().getFullYear()} - All Rights Reserved</span>
    </Link>
  );
};
