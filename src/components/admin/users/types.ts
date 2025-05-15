
import { UserProfile } from '@/types/user';

export interface AdminUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  created_at: string;
  updated_at?: string;
  redeemed_at?: string;
  premium_status?: string;
}

export interface UserManagementContainerProps {
  initialFilter?: string;
}

export interface UserTableProps {
  users: UserProfile[];
  loading: boolean;
}
