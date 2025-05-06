
import React from 'react';
import { Link } from 'react-router-dom';

const SkillsHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Enhanced gradient to match ESB badge style with stronger accent */}
      <Link to="/admin?adminTest=true" className="relative" aria-label="Admin Access" title="Admin Access">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-700 to-amber-400 opacity-30 blur-lg glow-pulse"></div>
        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-500 to-blue-600 opacity-25 blur-xl"></div>
        <img 
          src="/lovable-uploads/8587ce26-fbc1-463b-a0ef-e63f5fda9889.png" 
          alt="Admin Access" 
          className="h-4 w-4 relative z-10 w-full h-full object-contain rounded-md"
        />
      </Link>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your skills, track skill gaps, and find learning resources
        </p>
      </div>
    </div>
  );
};

export default SkillsHeader;
