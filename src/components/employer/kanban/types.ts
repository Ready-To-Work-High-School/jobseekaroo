
export interface KanbanItem {
  id: string;
  studentId: string;
  name: string;
  grade: string | number;
  academy?: string;
  avatar?: string | null;
  status: string | null;
  notes: string;
}

export interface KanbanStage {
  id: string;
  title: string;
  items: KanbanItem[];
}
