
export interface ApprenticeshipProgram {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  duration: string;
  startDate: string;
  compensation: string;
  skillsTaught: string[];
  isActive: boolean;
}
