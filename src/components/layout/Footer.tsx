
import { Link } from 'react-router-dom';

const Footer = () => {
  const bottomNavLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/resources", label: "Resources" },
    { href: "/skills", label: "Skills" },
    { href: "/for-employers", label: "For Employers" },
    { href: "/faq", label: "FAQ" },
    { href: "/success-stories", label: "Success Stories" },
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
              <h3 className="font-bold text-lg mb-3">Job Seekers 4 High Schools</h3>
              <p className="text-sm text-muted-foreground">
                Connecting students with credential-ready opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground">Browse Jobs</Link></li>
                <li><Link to="/skills" className="text-sm text-muted-foreground hover:text-foreground">Skills Development</Link></li>
                <li><Link to="/resume-assistant" className="text-sm text-muted-foreground hover:text-foreground">Resume Help</Link></li>
                <li><Link to="/interview-prep" className="text-sm text-muted-foreground hover:text-foreground">Interview Prep</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Employers</h4>
              <ul className="space-y-2">
                <li><Link to="/for-employers" className="text-sm text-muted-foreground hover:text-foreground">Employer Overview</Link></li>
                <li><Link to="/employer-dashboard" className="text-sm text-muted-foreground hover:text-foreground">Employer Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">Career Resources</Link></li>
                <li><Link to="/analytics" className="text-sm text-muted-foreground hover:text-foreground">Analytics Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Job Seekers 4 High Schools. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
