
export type JobSimulation = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  thumbnail_url?: string;
  requirements: string[];
  skills_gained: string[];
  created_at: string;
  updated_at: string;
};

export type SimulationTask = {
  id: string;
  simulation_id: string;
  title: string;
  description: string;
  order_number: number;
  content: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type UserSimulationProgress = {
  id: string;
  user_id: string;
  simulation_id: string;
  current_task_id?: string;
  progress_percentage: number;
  completed: boolean;
  started_at: string;
  completed_at?: string;
};

export type SimulationCredential = {
  id: string;
  user_id: string;
  simulation_id: string;
  issue_date: string;
  certificate_id: string;
};
