
import React from 'react';

const SkillsHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img 
        src="/lovable-uploads/6a344606-c844-465c-b643-7ff460697a49.png" 
        alt="JS4HS Logo" 
        className="h-12 w-12"
      />
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
