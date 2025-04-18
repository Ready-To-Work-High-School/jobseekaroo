
import React, { createContext, useContext, ReactNode } from 'react';
import { School } from '@/types/school';

// Default school for when a real school is not available
const defaultSchool: School = {
  id: "default-school-id",
  name: "Default School",
  slug: "default-school",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

interface SchoolContextType {
  school: School;
}

const SchoolContext = createContext<SchoolContextType>({ school: defaultSchool });

export const useSchool = () => useContext(SchoolContext);

interface SchoolProviderProps {
  school?: School;
  children: ReactNode;
}

export const SchoolProvider: React.FC<SchoolProviderProps> = ({ 
  school = defaultSchool,
  children 
}) => {
  return (
    <SchoolContext.Provider value={{ school }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const getDefaultSchool = (): School => defaultSchool;
