
import { useAuth } from '@/contexts/auth';
import { SearchBar } from './SearchBar';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import AuthStatus from '@/components/AuthStatus';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import AdminTestLink from '@/components/shared/AdminTestLink';

export const NavbarRight = () => {
  const { user, userProfile } = useAuth();

  // Determine if user is a CEO/admin
  const isCeo = userProfile?.user_type === 'admin' &&
    (
      userProfile?.job_title?.toLowerCase()?.includes('ceo') ||
      userProfile?.job_title?.toLowerCase()?.includes('chief executive') ||
      userProfile?.company_name?.toLowerCase()?.includes('ceo')
    );

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <SearchBar />

      <ThemeToggle />

      {/* CEO Shield - visible only for admins/CEOs */}
      {user && isCeo && (
        <Link
          to="/ceo-portal"
          className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-600 via-blue-500 to-amber-400 text-white rounded-full font-semibold gap-2 shadow hover:opacity-90"
          aria-label="CEO Portal"
        >
          {/* SVG shield with gradient */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="ceoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <path fill="url(#ceoGradient)" stroke="none" d="M12 2L3 7v6c0 5 3.5 7 9 7s9-2 9-7V7l-9-5z" />
            <path d="M12 22c-5.5 0-9-2-9-7V7l9-5 9 5v8c0 5-3.5 7-9 7z" stroke="#00000050" strokeWidth="1" fill="none"/>
          </svg>
          <span className="hidden md:inline">CEO Portal</span>
        </Link>
      )}

      {/* Admin Secret Shield Access (if not CEO) */}
      {user && !isCeo && (
        <div className="relative mr-1">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-700 to-amber-400 opacity-30 blur-lg glow-pulse"></div>
          <div className="relative z-10">
            <AdminTestLink variant="navbar" />
          </div>
        </div>
      )}

      {user ? (
        <div className="flex items-center">
          <NotificationCenter />
          <AuthStatus />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="font-medium">
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

