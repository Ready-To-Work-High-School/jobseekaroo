
import { User } from '@supabase/supabase-js';
import { JobApplication, ApplicationStatus } from '@/types/application';
import {
  createApplication as createAppService,
  updateApplicationStatus as updateAppStatusService,
  getApplications as getAppsService,
  deleteApplication as deleteAppService
} from './applicationService';

export function useApplicationManagement(user: User | null) {
  const handleCreateApplication = async (
    application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ) => {
    if (!user) throw new Error('User must be logged in to create an application');
    return createAppService(user.id, application);
  };

  const handleUpdateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
    if (!user) throw new Error('User must be logged in to update an application');
    return updateAppStatusService(user.id, applicationId, status);
  };

  const handleGetApplications = async () => {
    if (!user) return [];
    return getAppsService(user.id);
  };

  const handleDeleteApplication = async (applicationId: string) => {
    if (!user) throw new Error('User must be logged in to delete an application');
    return deleteAppService(user.id, applicationId);
  };

  return {
    handleCreateApplication,
    handleUpdateApplicationStatus,
    handleGetApplications,
    handleDeleteApplication
  };
}
