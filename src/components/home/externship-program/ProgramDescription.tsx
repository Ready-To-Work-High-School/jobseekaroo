
import React from 'react';
import { motion } from 'framer-motion';

interface ProgramDescriptionProps {
  company?: string;
}

const ProgramDescription = ({ company = "Finance" }: ProgramDescriptionProps) => {
  const isCSX = company.includes("CSX");
  
  return (
    <motion.p 
      className="text-gray-700"
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { type: "spring", stiffness: 100 }
        }
      }}
    >
      {isCSX ? (
        <>
          Premium opportunity for Westside High School students to gain hands-on experience in transportation and logistics. 
          Observe industry professionals in action and build valuable connections at CSX Transportation, one of Jacksonville's top employers.
        </>
      ) : (
        <>
          Premium opportunity for Westside High School Entrepreneurship Academy students to gain hands-on experience in finance and investment banking. 
          Observe industry professionals in action and build valuable connections at Macquarie Group.
        </>
      )}
    </motion.p>
  );
};

export default ProgramDescription;
