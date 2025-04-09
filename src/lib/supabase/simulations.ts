
import { supabase } from './index';
import { JobSimulation, SimulationTask, UserSimulationProgress, SimulationCredential } from '@/types/jobSimulation';

// Fetch all job simulations
export const getJobSimulations = async (): Promise<JobSimulation[]> => {
  const { data, error } = await supabase
    .from('job_simulations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching job simulations:', error);
    throw error;
  }
  
  return data || [];
};

// Fetch a specific job simulation by ID
export const getJobSimulation = async (id: string): Promise<JobSimulation> => {
  const { data, error } = await supabase
    .from('job_simulations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching job simulation with id ${id}:`, error);
    throw error;
  }
  
  return data;
};

// Fetch tasks for a specific simulation
export const getSimulationTasks = async (simulationId: string): Promise<SimulationTask[]> => {
  const { data, error } = await supabase
    .from('simulation_tasks')
    .select('*')
    .eq('simulation_id', simulationId)
    .order('order_number', { ascending: true });
  
  if (error) {
    console.error(`Error fetching tasks for simulation ${simulationId}:`, error);
    throw error;
  }
  
  return data || [];
};

// Get user progress for a simulation
export const getUserSimulationProgress = async (
  userId: string,
  simulationId: string
): Promise<UserSimulationProgress | null> => {
  const { data, error } = await supabase
    .from('user_simulation_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('simulation_id', simulationId)
    .maybeSingle();
  
  if (error) {
    console.error(`Error fetching user progress for simulation ${simulationId}:`, error);
    throw error;
  }
  
  return data;
};

// Start a simulation (create or update progress)
export const startSimulation = async (
  userId: string,
  simulationId: string,
  firstTaskId?: string
): Promise<UserSimulationProgress> => {
  // Check if the user has already started this simulation
  const existingProgress = await getUserSimulationProgress(userId, simulationId);
  
  if (existingProgress) {
    return existingProgress;
  }
  
  // Create new progress record
  const { data, error } = await supabase
    .from('user_simulation_progress')
    .insert([
      {
        user_id: userId,
        simulation_id: simulationId,
        current_task_id: firstTaskId,
        progress_percentage: 0,
        completed: false
      }
    ])
    .select()
    .single();
  
  if (error) {
    console.error(`Error starting simulation ${simulationId}:`, error);
    throw error;
  }
  
  return data;
};

// Update user progress
export const updateSimulationProgress = async (
  progressId: string,
  updates: Partial<UserSimulationProgress>
): Promise<UserSimulationProgress> => {
  const { data, error } = await supabase
    .from('user_simulation_progress')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', progressId)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating simulation progress ${progressId}:`, error);
    throw error;
  }
  
  return data;
};

// Complete a simulation
export const completeSimulation = async (
  progressId: string
): Promise<UserSimulationProgress> => {
  const { data, error } = await supabase
    .from('user_simulation_progress')
    .update({
      completed: true,
      progress_percentage: 100,
      completed_at: new Date().toISOString()
    })
    .eq('id', progressId)
    .select()
    .single();
  
  if (error) {
    console.error(`Error completing simulation ${progressId}:`, error);
    throw error;
  }
  
  return data;
};

// Get user's credentials
export const getUserCredentials = async (userId: string): Promise<SimulationCredential[]> => {
  const { data, error } = await supabase
    .from('simulation_credentials')
    .select(`
      *,
      job_simulations(*)
    `)
    .eq('user_id', userId)
    .order('issue_date', { ascending: false });
  
  if (error) {
    console.error(`Error fetching credentials for user ${userId}:`, error);
    throw error;
  }
  
  return data || [];
};

// Get all simulations with user progress
export const getSimulationsWithProgress = async (userId: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from('job_simulations')
    .select(`
      *,
      user_simulation_progress!inner(*)
    `)
    .eq('user_simulation_progress.user_id', userId);
  
  if (error) {
    console.error(`Error fetching simulations with progress for user ${userId}:`, error);
    throw error;
  }
  
  return data || [];
};
