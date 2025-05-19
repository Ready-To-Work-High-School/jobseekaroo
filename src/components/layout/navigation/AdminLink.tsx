
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

interface AdminLinkProps {
  isAdmin: boolean;
}

export const AdminLink = ({ isAdmin }: AdminLinkProps) => {
  const location = useLocation();
  
  if (!isAdmin) return null;
  
  return (
    <Link to="/admin" className={cn("text-sm font-medium transition-colors flex items-center gap-1", 
      location.pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground hover:text-primary")}>
      <Shield className="w-2.5 h-2.5" />
      Admin
    </Link>
  );
};
