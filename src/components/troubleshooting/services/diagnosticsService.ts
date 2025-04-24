
import { checkMissingLinks, checkCriticalComponents } from '../utils/componentChecker';

export const runSystemDiagnostics = () => {
  const linkIssues = checkMissingLinks();
  const componentIssues = checkCriticalComponents();
  
  return [...linkIssues, ...componentIssues];
};

