
import { ReactNode } from 'react';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  icon: ReactNode;
}

export interface CareerPath {
  title: string;
  description: string;
  icon: ReactNode;
  highlights?: string[];
  nextSteps?: string[];
  educationPaths?: {
    title: string;
    description: string;
  }[];
}

export interface UserProfileTab {
  id: string;
  title: string;
  icon: ReactNode;
}

