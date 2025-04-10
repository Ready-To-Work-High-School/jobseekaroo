
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

// Get environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the anon key
    const supabase = createClient(
      supabaseUrl,
      supabaseAnonKey
    )

    // Query the employer_job_counts view we created
    const { data, error } = await supabase
      .from('employer_job_counts')
      .select('*')
      .order('job_count', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Database error:', error.message)
      throw error
    }

    // Return the data with proper headers
    return new Response(JSON.stringify({ 
      employers: data || [],
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error fetching employer stats:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
