
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  
  // Function to get the redirect path based on auth status
  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };

  const bottomNavLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/resources", label: "Resources" },
    { href: getPath("/skills"), label: "Skills" },
    { href: "/for-employers", label: "For Employers" },
    { href: "/faq", label: "FAQ" },
    { href: "/success-stories", label: "Success Stories" },
    { href: "/license", label: "License" },
  ];

  return (
    <>
      <div className="bg-muted py-4 border-t">
        <div className="container mx-auto px-4">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {bottomNavLinks.map((link) => (
              <Link 
                key={link.href} 
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      <footer className="bg-secondary border-t py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src="/lovable-uploads/8587ce26-fbc1-463b-a0ef-e63f5fda9889.png" 
                  alt="JS4HS Logo" 
                  className="h-10 w-10"
                />
                <h3 className="font-bold text-lg">Job Seekers 4 High Schools</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting students with credential-ready opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><Link to={getPath("/jobs")} className="text-sm text-muted-foreground hover:text-foreground">Browse Jobs</Link></li>
                <li><Link to={getPath("/skills")} className="text-sm text-muted-foreground hover:text-foreground">Skills Development</Link></li>
                <li><Link to={getPath("/resume-assistant")} className="text-sm text-muted-foreground hover:text-foreground">Resume Help</Link></li>
                <li><Link to={getPath("/interview-prep")} className="text-sm text-muted-foreground hover:text-foreground">Interview Prep</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Employers</h4>
              <ul className="space-y-2">
                <li><Link to="/for-employers" className="text-sm text-muted-foreground hover:text-foreground">Employer Overview</Link></li>
                <li><Link to={getPath("/employer-dashboard")} className="text-sm text-muted-foreground hover:text-foreground">Employer Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><Link to={getPath("/resources")} className="text-sm text-muted-foreground hover:text-foreground">Career Resources</Link></li>
                <li><Link to={getPath("/analytics")} className="text-sm text-muted-foreground hover:text-foreground">Analytics Dashboard</Link></li>
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
