
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  hideAuthLinks?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideAuthLinks }) => {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">JobConnect</Link>
        
        <nav>
          <ul className="flex gap-6">
            <li><Link to="/jobs" className="hover:text-primary">Jobs</Link></li>
            <li><Link to="/about-us" className="hover:text-primary">About</Link></li>
            {!hideAuthLinks && (
              <>
                <li><Link to="/login" className="hover:text-primary">Login</Link></li>
                <li><Link to="/signup" className="hover:text-primary">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
