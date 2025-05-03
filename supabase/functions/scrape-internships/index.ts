
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.14.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Perform scraping using fetch
    console.log("Starting internship scraping for Jacksonville, FL");
    
    // List of sites to scrape
    const sites = [
      "https://www.indeed.com/jobs?q=internship&l=Jacksonville%2C+FL",
      "https://www.glassdoor.com/Job/jacksonville-internship-jobs-SRCH_IL.0,12_IC1154108_KO13,23.htm",
      "https://www.linkedin.com/jobs/search/?keywords=internship&location=Jacksonville%2C%20Florida"
    ];
    
    const allJobs = [];
    
    for (const site of sites) {
      try {
        console.log(`Scraping: ${site}`);
        const response = await fetch(site);
        const html = await response.text();
        
        // Basic extraction - in a real app, you would use a proper HTML parser
        let jobs = extractJobsFromHTML(html, site);
        allJobs.push(...jobs);
        
      } catch (error) {
        console.error(`Error scraping ${site}:`, error);
      }
    }
    
    // Store results in database
    if (allJobs.length > 0) {
      // Insert scraped jobs into a temporary table for review
      const { data, error } = await supabaseClient
        .from('scraped_jobs')
        .insert(allJobs.map(job => ({
          title: job.title,
          company_name: job.company,
          location_city: 'Jacksonville',
          location_state: 'FL',
          description: job.description,
          source_url: job.url,
          job_type: 'internship',
          is_verified: false // Requires admin verification before publishing
        })));
        
      if (error) throw error;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Scraped ${allJobs.length} internship listings`,
        jobs: allJobs 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error in scrape-internships function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 500 
      }
    );
  }
});

// Helper function to extract jobs from HTML - basic implementation
function extractJobsFromHTML(html: string, sourceUrl: string): any[] {
  const jobs = [];
  
  // Different parsing logic based on source
  if (sourceUrl.includes("indeed.com")) {
    // Very basic extraction - for demonstration only
    // In a real app, use a proper HTML parser like cheerio/DOMParser
    const jobCards = html.split('jobCard_mainContent');
    
    for (let i = 1; i < jobCards.length; i++) {
      const card = jobCards[i];
      
      try {
        // Extremely simplistic parsing
        const titleMatch = card.match(/<h2[^>]*>(.*?)<\/h2>/);
        const companyMatch = card.match(/companyName">(.*?)<\/span>/);
        
        if (titleMatch && companyMatch) {
          jobs.push({
            title: titleMatch[1].replace(/<[^>]*>/g, '').trim(),
            company: companyMatch[1].replace(/<[^>]*>/g, '').trim(),
            description: "Internship opportunity in Jacksonville, FL", // Placeholder
            url: `https://www.indeed.com/viewjob?jk=${card.match(/jk=([^"&]+)/)?.[1] || ''}`
          });
        }
      } catch (err) {
        console.log("Error parsing job card:", err);
      }
    }
  } else if (sourceUrl.includes("glassdoor.com")) {
    // Similar parsing for glassdoor
    // Simplified for demonstration
    const listings = html.match(/JobCard_jobCard[^>]*>(.*?)<\/li>/gs) || [];
    
    listings.forEach(listing => {
      try {
        const titleMatch = listing.match(/jobTitle">(.*?)<\/a>/);
        const companyMatch = listing.match(/employer">(.*?)<\/a>/);
        
        if (titleMatch && companyMatch) {
          jobs.push({
            title: titleMatch[1].replace(/<[^>]*>/g, '').trim(),
            company: companyMatch[1].replace(/<[^>]*>/g, '').trim(),
            description: "Glassdoor internship listing in Jacksonville, FL", // Placeholder
            url: sourceUrl
          });
        }
      } catch (err) {
        console.log("Error parsing glassdoor listing:", err);
      }
    });
  }
  // Add more site-specific parsers
  
  console.log(`Extracted ${jobs.length} jobs from ${sourceUrl}`);
  return jobs;
}
