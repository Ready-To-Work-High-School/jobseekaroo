
import { supabase } from './index';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

/**
 * Generic data access layer for Supabase
 * This helps abstract away direct Supabase calls from business logic
 */

// Generic type for handling database queries with proper typing
export interface QueryOptions {
  columns?: string;
  orderBy?: {
    column: string;
    ascending?: boolean;
  };
  limit?: number;
  offset?: number;
}

// Allowed table names for type safety
export type TableName = 'job_applications' | 'jobs' | 'profiles' | 'saved_jobs' |
  'job_recommendations' | 'skill_resources' | 'user_skills';

/**
 * Get a single item by ID
 */
export async function getById<T>(
  table: TableName,
  id: string,
  options: { columns?: string } = {}
): Promise<T> {
  const { data, error } = await supabase
    .from(table)
    .select(options.columns || '*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching ${table} by ID:`, error);
    throw error;
  }

  return data as T;
}

/**
 * Get multiple items with optional filtering
 */
export async function getItems<T>(
  table: TableName,
  filters?: Record<string, any>,
  options: QueryOptions = {}
): Promise<T[]> {
  let query = supabase
    .from(table)
    .select(options.columns || '*');

  // Apply all filters if they exist
  if (filters) {
    query = applyFilters(query, filters);
  }

  // Apply ordering if specified
  if (options.orderBy) {
    query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
  }

  // Apply pagination if specified
  if (options.limit) {
    query = query.limit(options.limit);
  }

  if (options.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching ${table} items:`, error);
    throw error;
  }

  return data as T[];
}

/**
 * Insert a new item
 */
export async function insertItem<T>(
  table: TableName, 
  item: any
): Promise<T> {
  const { data, error } = await supabase
    .from(table)
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error(`Error inserting into ${table}:`, error);
    throw error;
  }

  return data as T;
}

/**
 * Update an existing item
 */
export async function updateItem(
  table: TableName, 
  id: string, 
  updates: Record<string, any>
): Promise<void> {
  const { error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error(`Error updating ${table}:`, error);
    throw error;
  }
}

/**
 * Delete an item
 */
export async function deleteItem(
  table: TableName, 
  id: string
): Promise<void> {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    throw error;
  }
}

/**
 * Apply filters to a query
 * Helper function to handle different filter types
 */
function applyFilters(
  query: any,
  filters: Record<string, any>
): any {
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object' && 'operator' in value) {
        // Handle custom operators
        const { operator, value: operatorValue } = value;
        
        switch (operator) {
          case 'in':
            query = query.in(key, operatorValue);
            break;
          case 'gt':
            query = query.gt(key, operatorValue);
            break;
          case 'gte':
            query = query.gte(key, operatorValue);
            break;
          case 'lt':
            query = query.lt(key, operatorValue);
            break;
          case 'lte':
            query = query.lte(key, operatorValue);
            break;
          case 'like':
            query = query.like(key, `%${operatorValue}%`);
            break;
          default:
            query = query.eq(key, operatorValue);
        }
      } else {
        // Default to equality
        query = query.eq(key, value);
      }
    }
  });
  
  return query;
}
