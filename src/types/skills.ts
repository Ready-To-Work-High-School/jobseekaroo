
export interface UserSkill {
  id: string;
  user_id: string;
  skill_name: string;
  proficiency_level: number;
  is_learning: boolean;
  target_level?: number;
  created_at: string;
  updated_at: string;
}

export interface SkillResource {
  id: string;
  skill_name: string;
  resource_title: string;
  resource_url: string;
  resource_type: string;
  description?: string;
  created_at: string;
}

export interface SkillGap {
  skill_name: string;
  required_level: number;
  current_level: number;
  gap: number;
}

export interface InterviewQuestion {
  id: string;
  role: string;
  question: string;
  category: 'behavioral' | 'technical' | 'situational';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PracticeSession {
  id: string;
  user_id: string;
  date: string;
  duration: number;
  questions_attempted: number;
  feedback: string;
  recording_url?: string;
}

export interface SkillProgress {
  skill_id: string;
  skill_name: string;
  start_level: number;
  current_level: number;
  target_level: number;
  progress_percentage: number;
  last_updated: string;
  learning_resources: SkillResource[];
}
