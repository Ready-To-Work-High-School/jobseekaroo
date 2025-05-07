
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Shield } from "lucide-react";
import { SearchBar } from "./SearchBar";
import NotificationsDropdown from "./NotificationsDropdown";
import { useAuth } from "@/contexts/auth";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { useAdminStatus } from "@/hooks/useAdminStatus";

export const NavbarRight = () => {
  const { user, userProfile } = useAuth();
  const { isCeo } = useAdminStatus();
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <SearchBar />
      </div>

      {/* Hidden shield for CEO access */}
      {isCeo && (
        <Link 
          to="/ceo-portal" 
          className="relative opacity-20 hover:opacity-100 transition-opacity duration-300 group"
          aria-label="CEO Portal Access"
        >
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 opacity-70 group-hover:opacity-100 group-hover:animate-ping"></div>
          <Shield className="h-5 w-5 text-amber-500 bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 bg-clip-text" />
        </Link>
      )}
      
      {user && <NotificationsDropdown />}
      <ModeToggle />
    </div>
  );
};
