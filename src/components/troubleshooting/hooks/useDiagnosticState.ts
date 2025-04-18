
import { useState } from 'react';

export const useDiagnosticState = () => {
  const [isChecking, setIsChecking] = useState(false);
  
  const startChecking = () => setIsChecking(true);
  const stopChecking = () => setIsChecking(false);
  
  return {
    isChecking,
    startChecking,
    stopChecking
  };
};
