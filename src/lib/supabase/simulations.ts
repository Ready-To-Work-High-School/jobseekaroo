import { JobSimulation, SimulationTask } from '@/types/jobSimulation';
import { supabase } from '@/integrations/supabase/client';

export const startSimulation = async (userId: string, simulationId: string): Promise<void> => {
  try {
    const { error: progressError } = await supabase
      .from('user_simulation_progress')
      .insert([
        {
          user_id: userId,
          simulation_id: simulationId,
          progress_percentage: 0,
          completed: false
        }
      ]);
      
    if (progressError) {
      console.error('Error starting simulation:', progressError);
      throw progressError;
    }
  } catch (error) {
    console.error('Exception starting simulation:', error);
    throw error;
  }
};

export const getJobSimulations = async (): Promise<JobSimulation[]> => {
  try {
    console.log('Fetching job simulations from Supabase...');
    const { data, error } = await supabase
      .from('job_simulations')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching job simulations:', error);
      return [];
    }
    
    console.log(`Found ${data?.length} simulations`);
    return data || [];
  } catch (error) {
    console.error('Exception fetching job simulations:', error);
    return [];
  }
};

export const getSimulationTasks = async (simulationId: string): Promise<SimulationTask[]> => {
  try {
    console.log(`Fetching tasks for simulation ${simulationId}`);
    const { data, error } = await supabase
      .from('simulation_tasks')
      .select('*')
      .eq('simulation_id', simulationId)
      .order('order_number', { ascending: true });
      
    if (error) {
      console.error('Error fetching simulation tasks:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching simulation tasks:', error);
    return [];
  }
};

export const getUserSimulationProgress = async (userId: string, simulationId?: string) => {
  try {
    let query = supabase
      .from('user_simulation_progress')
      .select(`
        *,
        job_simulations(*)
      `);
      
    if (simulationId) {
      query = query.eq('simulation_id', simulationId);
    }
    
    query = query.eq('user_id', userId);
    
    const { data, error } = await query;
      
    if (error) {
      console.error('Error fetching user simulation progress:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching user simulation progress:', error);
    return [];
  }
};

export const updateSimulationProgress = async (
  userId: string, 
  simulationId: string, 
  progressPercentage: number,
  completed: boolean = false
) => {
  try {
    const { error } = await supabase
      .from('user_simulation_progress')
      .update({
        progress_percentage: progressPercentage,
        completed,
        completed_at: completed ? new Date().toISOString() : null
      })
      .eq('user_id', userId)
      .eq('simulation_id', simulationId);
      
    if (error) {
      console.error('Error updating simulation progress:', error);
      throw error;
    }
  } catch (error) {
    console.error('Exception updating simulation progress:', error);
    throw error;
  }
};
