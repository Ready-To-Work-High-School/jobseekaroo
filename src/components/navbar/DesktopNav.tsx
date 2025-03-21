
import { NavLink } from './NavLink';
import { useAuth } from '@/contexts/AuthContext';

export const DesktopNav = () => {
  const { user } = useAuth();
  
  return (
    <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/jobs">Find Jobs</NavLink>
      {user && <NavLink to="/skills">Skills</NavLink>}
      {user && <NavLink to="/applications">Applications</NavLink>}
      <NavLink to="/resources">Resources</NavLink>
      <NavLink to="/for-employers">For Employers</NavLink>
      <NavLink to="/resume-assistant">Resume Assistant</NavLink>
    </nav>
  );
};
