
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Circle, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/utils/adminUtils';

export const NavLinks = () => {
  const location = useLocation();
  const { userProfile } = useAuth();
  
  const handleCeoPortalClick = () => {
    // Only log click for analytics, no visible feedback
    console.log('CEO portal accessed');
  };
  
  return (
    <div className="flex items-center gap-6">
      <Link to="/" className={cn("text-sm font-medium transition-colors", 
        location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        Your First Job, Made Simple
      </Link>
      
      <Link to="/for-employers" className={cn("text-sm font-medium transition-colors", 
        location.pathname === "/for-employers" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        Fast lane to hire eager high schoolers
      </Link>
      
      <Link to="/about" className={cn("text-sm font-medium transition-colors", 
        location.pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary")}>
        Partnering with schools to boost career readiness
      </Link>
      
      {isAdmin(userProfile) && (
        <Link to="/admin" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
          location.pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground hover:text-primary")}>
          <Shield className="w-4 h-4" />
          Admin
        </Link>
      )}
      
      {/* Hidden CEO Portal Link */}
      <Link 
        to="/ceo-portal" 
        onClick={handleCeoPortalClick}
        className={cn(
          "opacity-0 hover:opacity-100 transition-opacity duration-300",
          "text-sm font-medium flex items-center gap-1",
          location.pathname === "/ceo-portal" ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}
        aria-label="CEO Portal"
      >
        <Circle className="w-3 h-3" />
      </Link>
    </div>
  );
};
