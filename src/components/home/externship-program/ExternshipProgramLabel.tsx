
import React from 'react';
import { motion } from 'framer-motion';

const ExternshipProgramLabel = ({ company = "Finance" }: { company?: string }) => {
  const isCSX = company.includes("CSX");
  
  return (
    <div className={`externship-program-label ${isCSX ? 'csx-label' : ''}`}>
      {isCSX ? 'CSX Transportation Externship' : 'Finance Externship'}
      
      {isCSX && (
        <img 
          src="/lovable-uploads/2f5babe6-5aa1-4d84-936a-f459a5c19b6b.png" 
          alt="CSX Transportation Logo" 
          className="externship-logo"
          width="16"
          height="16"
        />
      )}
    </div>
  );
};

export default ExternshipProgramLabel;
