
export interface UserBadge {
  id: string;
  name: string;
  earned_at?: string;
}

export interface StudentBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
  type: 'skill' | 'character' | 'achievement';
}
