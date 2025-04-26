
export interface WorkflowRule {
  id: string;
  condition: {
    type: 'application_received' | 'candidate_score' | 'stage_moved' | 'time_elapsed';
    value?: number | string;
    comparison?: 'equal' | 'greater' | 'less' | 'contains';
  };
  action: {
    type: 'move_to_stage' | 'send_message' | 'assign_tag' | 'schedule_interview';
    value: string;
  };
  enabled: boolean;
}

export interface CustomFormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
  required: boolean;
  options?: string[];
  pointValue: number;
  description?: string;
}

export interface CustomForm {
  id: string;
  title: string;
  description: string;
  fields: CustomFormField[];
}
