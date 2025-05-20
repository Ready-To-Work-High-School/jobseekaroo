
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

      {/* Hidden shield for CEO access - only visible on hover */}
      {isCeo && (
        <Link 
          to="/ceo-portal" 
          className="relative opacity-10 hover:opacity-100 transition-opacity duration-300 group"
          aria-label="CEO Portal Access"
        >
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400 opacity-70 group-hover:opacity-100 group-hover:animate-ping"></div>
          <Shield className="h-2.5 w-2.5 text-amber-500 bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 bg-clip-text" /> {/* Reduced shield size */}
        </Link>
      )}
      
      {/* Admin badge - visible for admins who aren't CEOs */}
      {isAdmin && !isCeo && (
        <Link
          to="/admin"
          className="flex items-center justify-center h-5 w-5 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
          aria-label="Admin Panel"
        >
          <Shield className="h-2 w-2 text-white" /> {/* Reduced shield size */}
        </Link>
      )}
      
      <NavbarNotifications />
      <ModeToggle />
      <AuthStatus />
    </div>
  );
};
