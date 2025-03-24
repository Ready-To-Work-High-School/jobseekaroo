import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const MainNavigation = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <nav className="hidden md:flex items-center space-x-1">
      <Link to="/" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
        Home
      </Link>
      {user && (
        <Link to="/dashboard" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
          Dashboard
        </Link>
      )}
      <Link to="/jobs" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
        Find Jobs
      </Link>
      {user ? (
        <>
          <Link to="/skills" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
            Skills
          </Link>
          <Link to="/applications" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
            Applications
          </Link>
          <Link to="/resume" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
            Resume
          </Link>
        </>
      ) : (
        <Link to="/resources" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
          Resources
        </Link>
      )}
      <Link to="/entrepreneurship-academy" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
        Academy
      </Link>
    </nav>
  );
};

export default MainNavigation;
