
import { JobSimulation, SimulationTask, UserSimulationProgress, SimulationCredential } from '@/types/jobSimulation';
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

export const getJobSimulation = async (simulationId: string): Promise<JobSimulation | null> => {
  try {
    const { data, error } = await supabase
      .from('job_simulations')
      .select('*')
      .eq('id', simulationId)
      .single();
      
    if (error) {
      console.error('Error fetching job simulation:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching job simulation:', error);
    return null;
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

export const getUserSimulationProgress = async (userId: string, simulationId?: string): Promise<UserSimulationProgress | null> => {
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
    
    // Adding this filter before calling single() to fix the TypeScript error
    query = query.eq('user_id', userId);
    
    const { data, error } = await query.maybeSingle();
      
    if (error) {
      console.error('Error fetching user simulation progress:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    // Transform the data to match UserSimulationProgress type
    const progress: UserSimulationProgress = {
      id: data.id,
      user_id: data.user_id,
      simulation_id: data.simulation_id,
      current_task_id: data.current_task_id || undefined,
      progress_percentage: data.progress_percentage,
      completed: data.completed,
      started_at: data.started_at,
      completed_at: data.completed_at || undefined
    };
    
    return progress;
  } catch (error) {
    console.error('Exception fetching user simulation progress:', error);
    return null;
  }
};

export const updateSimulationProgress = async (
  progressId: string,
  updates: {
    current_task_id?: string;
    progress_percentage: number;
    completed?: boolean;
  }
) => {
  try {
    const updateData: any = {
      progress_percentage: updates.progress_percentage,
    };
    
    if (updates.completed !== undefined) {
      updateData.completed = updates.completed;
      updateData.completed_at = updates.completed ? new Date().toISOString() : null;
    }
    
    if (updates.current_task_id !== undefined) {
      updateData.current_task_id = updates.current_task_id;
    }
    
    const { error } = await supabase
      .from('user_simulation_progress')
      .update(updateData)
      .eq('id', progressId);
      
    if (error) {
      console.error('Error updating simulation progress:', error);
      throw error;
    }
  } catch (error) {
    console.error('Exception updating simulation progress:', error);
    throw error;
  }
};

export const createSimulationCredential = async (
  userId: string,
  simulationId: string,
  certificateId: string
): Promise<SimulationCredential | null> => {
  try {
    const { data, error } = await supabase
      .from('simulation_credentials')
      .insert([
        {
          user_id: userId,
          simulation_id: simulationId,
          certificate_id: certificateId
        }
      ])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating simulation credential:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Exception creating simulation credential:', error);
    throw error;
  }
};

export const getUserCredentials = async (userId: string): Promise<SimulationCredential[]> => {
  try {
    const { data, error } = await supabase
      .from('simulation_credentials')
      .select(`
        *,
        job_simulations(*)
      `)
      .eq('user_id', userId)
      .order('issue_date', { ascending: false });
      
    if (error) {
      console.error('Error fetching user credentials:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching user credentials:', error);
    return [];
  }
};
