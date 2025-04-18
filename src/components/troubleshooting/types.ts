
export interface CommonIssue {
  id: string;
  title: string;
  icon: any;
  description: string;
  solutions: string[];
}

export interface TroubleshootProps {
  trigger?: React.ReactNode;
  initialIssue?: string;
}
