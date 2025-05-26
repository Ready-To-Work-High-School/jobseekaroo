
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
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <SearchBar />
      </div>

      {/* Hidden shield for CEO access - more visible for testing */}
      {(isCeo || true) && ( // temporarily show for all users for testing
        <div className="relative group">
          <Link 
            to="/ceo-portal" 
            className="relative opacity-30 hover:opacity-100 transition-all duration-500 group"
            aria-label="CEO Portal Access"
          >
            {/* Gradient background with glow effect */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 opacity-50 blur-[6px] group-hover:opacity-80 group-hover:blur-none transition-all duration-300"></div>
            <div className="relative flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 shadow-lg">
              <Shield className="h-3 w-3 text-white" />
            </div>
            
            {/* Pulse effect on hover */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 opacity-0 group-hover:opacity-40 group-hover:animate-ping transition-opacity duration-300"></div>
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
