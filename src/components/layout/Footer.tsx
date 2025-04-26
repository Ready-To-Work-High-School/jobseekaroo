
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, FileText, Briefcase, Book } from 'lucide-react';

const Footer = () => {
  const { user } = useAuth();

  // Function to get the redirect path based on auth status
  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };

  // Main navigation categories for the footer
  const mainCategories = [
    {
      title: "Our Program",
      path: "/entrepreneurship-academy"
    },
    {
      title: "For Job Seekers",
      path: "/jobs"
    },
    {
      title: "For Employers",
      path: "/for-employers"
    },
    {
      title: "Resources",
      path: "/resources"
    },
    {
      title: "FAQ",
      path: "/faq"
    },
    {
      title: "About",
      path: "/about"
    }
  ];
  
  // Bottom navigation links with simplified design
  const bottomNavLinks = mainCategories.map(category => ({
    href: category.path,
    label: category.title
  }));

  return (
    <>
      <div className="bg-muted py-4 border-t">
        <div className="container mx-auto px-4">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {bottomNavLinks.map(link => 
              <Link 
                key={link.href} 
                to={link.href} 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            )}
          </nav>
        </div>
      </div>
      
      <footer className="bg-secondary border-t py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-700 to-amber-400 opacity-30 blur-lg glow-pulse"></div>
                  <img src="/lovable-uploads/8587ce26-fbc1-463b-a0ef-e63f5fda9889.png" alt="JS4HS Logo" className="h-6 w-6 relative z-10 w-full h-full object-contain rounded-md" />
                </div>
                <h3 className="font-bold text-lg">Job Seekers 4 High Schools</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting students with credential-ready opportunities.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-600" />
                <Link to="/admin?adminTest=true" className="text-xs text-muted-foreground hover:text-blue-600" aria-label="API Demo" title="API Demo">
                  Developer API Demo
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Job Seekers</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary/60" />
                  <Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground">Browse Jobs</Link>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary/60" />
                  <Link to={getPath("/resume-assistant")} className="text-sm text-muted-foreground hover:text-foreground">Resume Builder</Link>
                </li>
                <li className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-primary/60" />
                  <Link to={getPath("/interview-prep")} className="text-sm text-muted-foreground hover:text-foreground">Interview Prep</Link>
                </li>
                <li><Link to={getPath("/skill-development")} className="text-sm text-muted-foreground hover:text-foreground">Skills Development</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Employers</h4>
              <ul className="space-y-2">
                <li><Link to="/for-employers" className="text-sm text-muted-foreground hover:text-foreground">Employer Overview</Link></li>
                <li><Link to={getPath("/employer/dashboard")} className="text-sm text-muted-foreground hover:text-foreground">Employer Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">Career Resources</Link></li>
                <li><Link to={getPath("/platform-guide")} className="text-sm text-muted-foreground hover:text-foreground">Platform Guide</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Job Seekers 4 High Schools. All rights reserved.
            </p>
            <p className="mt-1">
              All content, design, and functionality on this site is protected by copyright law and may not be reproduced without permission.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
