
import { User } from '@supabase/supabase-js';
import { saveJob, unsaveJob, isSavedJob, getSavedJobs } from './savedJobsService';

export function useJobManagement(user: User | null) {
  const handleSaveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to save jobs');
    await saveJob(user.id, jobId);
  };

  const handleUnsaveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to unsave jobs');
    await unsaveJob(user.id, jobId);
  };

  const handleIsSavedJob = async (jobId: string) => {
    if (!user) return false;
    return isSavedJob(user.id, jobId);
  };

  const handleGetSavedJobs = async () => {
    if (!user) return [];
    return getSavedJobs(user.id);
  };

  return {
    handleSaveJob,
    handleUnsaveJob,
    handleIsSavedJob,
    handleGetSavedJobs
  };
}
