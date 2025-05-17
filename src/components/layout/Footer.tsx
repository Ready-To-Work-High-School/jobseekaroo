
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">JobSeekers4HS</h3>
            <p className="text-muted-foreground">
              Connecting high school students with career opportunities
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link to="/jobs" className="text-muted-foreground hover:text-foreground">Browse Jobs</Link></li>
              <li><Link to="/employer-dashboard" className="text-muted-foreground hover:text-foreground">For Employers</Link></li>
              <li><Link to="/notifications" className="text-muted-foreground hover:text-foreground">Notifications</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: support@jobseekers4hs.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Office: 123 Education Street, Learning City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-4 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} JobSeekers4HS. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
