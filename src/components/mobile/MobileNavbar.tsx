
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Search, Briefcase, UserCircle, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MobileMenu } from '@/components/navbar/MobileMenu';

const MobileNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  if (!user) return null;
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-40 md:hidden">
      <div className="grid grid-cols-5 h-16">
        <button 
          className="flex flex-col items-center justify-center gap-1"
          onClick={() => navigate('/')}
        >
          <Home className={`h-5 w-5 ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button 
          className="flex flex-col items-center justify-center gap-1"
          onClick={() => navigate('/jobs')}
        >
          <Search className={`h-5 w-5 ${isActive('/jobs') ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="text-xs font-medium">Jobs</span>
        </button>
        
        <button 
          className="flex flex-col items-center justify-center gap-1"
          onClick={() => navigate('/applications')}
        >
          <Briefcase className={`h-5 w-5 ${isActive('/applications') ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="text-xs font-medium">Apply</span>
        </button>
        
        <button 
          className="flex flex-col items-center justify-center gap-1"
          onClick={() => navigate('/profile')}
        >
          <UserCircle className={`h-5 w-5 ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="text-xs font-medium">Profile</span>
        </button>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center gap-1">
              <Menu className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs font-medium">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <MobileMenu />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNavbar;
