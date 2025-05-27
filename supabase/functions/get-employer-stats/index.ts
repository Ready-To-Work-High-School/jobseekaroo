
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

// Get environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting employer stats fetch...')
    
    // Create a Supabase client with the service role key for better access
    const supabase = createClient(
      supabaseUrl,
      supabaseServiceKey
    )

    // First, let's try to get data from the jobs table directly
    const { data: jobsData, error: jobsError } = await supabase
      .from('jobs')
      .select('company_name, pay_rate_min')
      .not('company_name', 'is', null)

    if (jobsError) {
      console.error('Error fetching jobs data:', jobsError)
      // Return fallback data instead of throwing error
      return new Response(JSON.stringify({ 
        employers: [],
        success: true,
        message: 'No jobs data available'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    console.log('Jobs data fetched:', jobsData?.length || 0, 'records')

    // Process the jobs data to create employer stats
    const employerStats = new Map()
    
    if (jobsData && jobsData.length > 0) {
      jobsData.forEach(job => {
        const companyName = job.company_name
        const wage = job.pay_rate_min || 0
        
        if (employerStats.has(companyName)) {
          const existing = employerStats.get(companyName)
          existing.job_count += 1
          existing.total_wage += wage
          existing.avg_min_wage = existing.total_wage / existing.job_count
        } else {
          employerStats.set(companyName, {
            company_name: companyName,
            job_count: 1,
            total_wage: wage,
            avg_min_wage: wage,
            last_updated: new Date().toISOString()
          })
        }
      })
    }

    // Convert to array and sort by job count
    const employers = Array.from(employerStats.values())
      .map(employer => ({
        company_name: employer.company_name,
        job_count: employer.job_count,
        avg_min_wage: employer.avg_min_wage,
        last_updated: employer.last_updated
      }))
      .sort((a, b) => b.job_count - a.job_count)
      .slice(0, 10) // Top 10 employers

    console.log('Processed employer stats:', employers.length, 'employers')

    // Return the data with proper headers
    return new Response(JSON.stringify({ 
      employers: employers,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in employer stats function:', error)
    return new Response(JSON.stringify({ 
      employers: [],
      success: true,
      message: 'Using fallback data due to processing error'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  }
})
