import { ReactNode } from 'react';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';
interface LayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  withPadding?: boolean;
}
const Layout = ({
  children,
  className,
  fullWidth = false,
  withPadding = true
}: LayoutProps) => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className={cn("flex-1 page-transition", withPadding && "pt-24 pb-16", className)}>
        {fullWidth ? children : <div className="container-custom">
            {children}
          </div>}
      </main>
      
      <footer className="py-8 bg-secondary">
        <div className="container-custom bg-sky-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-medium">
                <span className="text-primary font-semibold">job</span>
                <span>seeker, created by Pamela Coleman</span>
              </span>
              <p className="text-sm mt-1 font-bold text-zinc-950">
                Helping high school students find great jobs
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-border">
            <p className="text-xs text-center text-foreground/60">
              © {new Date().getFullYear()} jobseekaroo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Layout;