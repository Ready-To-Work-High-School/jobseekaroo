
import { supabase } from '@/integrations/supabase/client';
import { JobSimulation, SimulationTask, UserSimulationProgress } from '@/types/jobSimulation';

export async function getJobSimulations(): Promise<JobSimulation[]> {
  try {
    const { data, error } = await supabase
      .from('job_simulations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching job simulations:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getJobSimulations:', error);
    return [];
  }
}

export async function getSimulationById(id: string): Promise<JobSimulation | null> {
  try {
    const { data, error } = await supabase
      .from('job_simulations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching simulation by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getSimulationById:', error);
    return null;
  }
}

export async function getSimulationTasks(simulationId: string): Promise<SimulationTask[]> {
  try {
    const { data, error } = await supabase
      .from('simulation_tasks')
      .select('*')
      .eq('simulation_id', simulationId)
      .order('order_number', { ascending: true });

    if (error) {
      console.error('Error fetching simulation tasks:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getSimulationTasks:', error);
    return [];
  }
}

export async function startSimulation(userId: string, simulationId: string): Promise<void> {
  try {
    // Check if the user already has a progress record for this simulation
    const { data: existingProgress } = await supabase
      .from('user_simulation_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('simulation_id', simulationId)
      .single();

    if (existingProgress) {
      console.log('User already started this simulation, returning existing progress');
      return;
    }

    // Get the first task of the simulation
    const { data: firstTask } = await supabase
      .from('simulation_tasks')
      .select('*')
      .eq('simulation_id', simulationId)
      .order('order_number', { ascending: true })
      .limit(1)
      .single();

    // Create a new progress record
    const { error } = await supabase
      .from('user_simulation_progress')
      .insert({
        user_id: userId,
        simulation_id: simulationId,
        current_task_id: firstTask?.id,
        progress_percentage: 0,
        completed: false
      });

    if (error) {
      console.error('Error starting simulation:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in startSimulation:', error);
    throw error;
  }
}

export async function getUserSimulationProgress(
  userId: string,
  simulationId: string
): Promise<UserSimulationProgress | null> {
  try {
    const { data, error } = await supabase
      .from('user_simulation_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('simulation_id', simulationId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user simulation progress:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserSimulationProgress:', error);
    return null;
  }
}

export async function updateSimulationProgress(
  userId: string,
  simulationId: string,
  currentTaskId: string | null,
  progressPercentage: number,
  completed: boolean
): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_simulation_progress')
      .update({
        current_task_id: currentTaskId,
        progress_percentage: progressPercentage,
        completed: completed,
        completed_at: completed ? new Date().toISOString() : null
      })
      .eq('user_id', userId)
      .eq('simulation_id', simulationId);

    if (error) {
      console.error('Error updating simulation progress:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateSimulationProgress:', error);
    throw error;
  }
}

export async function getUserSimulationCredentials(userId: string): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('simulation_credentials')
      .select('*, job_simulations(*)')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user simulation credentials:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserSimulationCredentials:', error);
    return [];
  }
}
