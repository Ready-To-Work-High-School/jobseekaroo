
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { useAuth } from "@/contexts/auth";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { NavbarNotifications } from "@/components/notifications/NavbarNotifications";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthStatus from "@/components/AuthStatus";

export const NavbarRight = () => {
  const { user, userProfile } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();
  
  // Only show CEO shield for actual CEOs with admin privileges
  const shouldShowCeoShield = isCeo && isAdmin && userProfile?.user_type === 'admin';
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <SearchBar />
      </div>

      {/* CEO Shield - only visible to actual CEOs */}
      {shouldShowCeoShield && (
        <div className="relative group">
          <Link 
            to="/ceo-portal" 
            className="relative opacity-60 hover:opacity-100 transition-all duration-500 group"
            aria-label="CEO Portal Access"
          >
            {/* Stronger gradient background with glow effect */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 opacity-60 blur-[8px] group-hover:opacity-90 group-hover:blur-none transition-all duration-300"></div>
            
            {/* Main shield container */}
            <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 shadow-xl border border-white/20">
              <Shield className="h-4 w-4 text-white drop-shadow-sm" />
            </div>
            
            {/* Enhanced pulse effect on hover */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 opacity-0 group-hover:opacity-50 group-hover:animate-ping transition-opacity duration-300"></div>
            
            {/* Subtle rotating ring effect */}
            <div className="absolute -inset-1 rounded-full border-2 border-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 opacity-20 group-hover:opacity-40 group-hover:animate-spin transition-opacity duration-500" style={{animationDuration: '3s'}}></div>
          </Link>
        </div>
      )}
      
      {/* Admin badge - visible for admins who aren't CEOs */}
      {isAdmin && !isCeo && (
        <Link
          to="/admin"
          className="flex items-center justify-center h-5 w-5 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
          aria-label="Admin Panel"
        >
          <Shield className="h-2 w-2 text-white" />
        </Link>
      )}
      
      <NavbarNotifications />
      <ModeToggle />
      <AuthStatus />
    </div>
  );
};
