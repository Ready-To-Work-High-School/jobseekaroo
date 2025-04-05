
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, BookOpen, Search, User, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  if (!isMobile || !user) return null;
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 h-16">
      <div className="grid grid-cols-5 h-full">
        <NavButton
          icon={<Home className={isActive('/') ? 'text-primary' : 'text-muted-foreground'} />}
          label="Home"
          onClick={() => navigate('/')}
          active={isActive('/')}
        />
        <NavButton
          icon={<Search className={isActive('/jobs') ? 'text-primary' : 'text-muted-foreground'} />}
          label="Jobs"
          onClick={() => navigate('/jobs')}
          active={isActive('/jobs')}
        />
        <NavButton
          icon={<Briefcase className={isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'} />}
          label="Dashboard"
          onClick={() => navigate('/dashboard')}
          active={isActive('/dashboard')}
        />
        <NavButton
          icon={<BookOpen className={isActive('/first-job-bootcamp') ? 'text-primary' : 'text-muted-foreground'} />}
          label="Bootcamp"
          onClick={() => navigate('/first-job-bootcamp')}
          active={isActive('/first-job-bootcamp')}
        />
        <NavButton
          icon={<User className={isActive('/profile') ? 'text-primary' : 'text-muted-foreground'} />}
          label="Profile"
          onClick={() => navigate('/profile')}
          active={isActive('/profile')}
        />
      </div>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}

const NavButton = ({ icon, label, onClick, active }: NavButtonProps) => {
  return (
    <button 
      className="flex flex-col items-center justify-center h-full"
      onClick={onClick}
    >
      <div className="h-6 w-6">{icon}</div>
      <span className={`text-xs mt-1 ${active ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </button>
  );
};

export default MobileBottomNav;
