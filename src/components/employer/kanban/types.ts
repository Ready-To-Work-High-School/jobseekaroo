
export interface KanbanItem {
  id: string;
  studentId: string;
  name: string;
  grade: number;
  academy: string;
  avatar?: string;
  status: 'pending' | 'interviewing' | 'selected' | 'rejected' | 'hired' | null;
  notes: string;
}

export interface KanbanStage {
  id: string;
  title: string;
  items: KanbanItem[];
}
