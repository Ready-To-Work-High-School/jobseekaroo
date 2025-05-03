
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.14.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ScrapedJob type to match our database schema
type ScrapedJob = {
  title: string;
  company_name: string;
  location_city: string;
  location_state: string;
  description: string | null;
  source_url: string | null;
  job_type: string;
  is_verified: boolean;
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
    
    const allJobs: ScrapedJob[] = [];
    
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
      // Insert scraped jobs into our scraped_jobs table for review
      const { data, error } = await supabaseClient
        .from('scraped_jobs')
        .insert(allJobs);
        
      if (error) {
        console.error("Error inserting scraped jobs:", error);
        throw error;
      }
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
function extractJobsFromHTML(html: string, sourceUrl: string): ScrapedJob[] {
  const jobs: ScrapedJob[] = [];
  
  // Different parsing logic based on source
  if (sourceUrl.includes("indeed.com")) {
    // Very basic extraction - for demonstration only
    // In a real app, use a proper HTML parser like cheerio/DOMParser
    const jobCards = html.split('jobCard_mainContent');
    
    for (let i = 1; i < Math.min(jobCards.length, 10); i++) {
      const card = jobCards[i];
      
      try {
        // Extremely simplistic parsing
        const titleMatch = card.match(/<h2[^>]*>(.*?)<\/h2>/);
        const companyMatch = card.match(/companyName">(.*?)<\/span>/);
        
        if (titleMatch && companyMatch) {
          jobs.push({
            title: titleMatch[1].replace(/<[^>]*>/g, '').trim(),
            company_name: companyMatch[1].replace(/<[^>]*>/g, '').trim(),
            description: "Internship opportunity in Jacksonville, FL", // Placeholder
            location_city: "Jacksonville",
            location_state: "FL",
            job_type: "internship",
            source_url: `https://www.indeed.com/viewjob?jk=${card.match(/jk=([^"&]+)/)?.[1] || ''}`,
            is_verified: false
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
    
    for (let i = 0; i < Math.min(listings.length, 10); i++) {
      const listing = listings[i];
      try {
        const titleMatch = listing.match(/jobTitle">(.*?)<\/a>/);
        const companyMatch = listing.match(/employer">(.*?)<\/a>/);
        
        if (titleMatch && companyMatch) {
          jobs.push({
            title: titleMatch[1].replace(/<[^>]*>/g, '').trim(),
            company_name: companyMatch[1].replace(/<[^>]*>/g, '').trim(),
            description: "Glassdoor internship listing in Jacksonville, FL", // Placeholder
            location_city: "Jacksonville",
            location_state: "FL",
            job_type: "internship",
            source_url: sourceUrl,
            is_verified: false
          });
        }
      } catch (err) {
        console.log("Error parsing glassdoor listing:", err);
      }
    }
  } else if (sourceUrl.includes("linkedin.com")) {
    // Basic LinkedIn extraction - this would need to be adjusted based on their current HTML structure
    const listings = html.match(/<li class="jobs-search-results__list-item(.*?)<\/li>/gs) || [];
    
    for (let i = 0; i < Math.min(listings.length, 10); i++) {
      const listing = listings[i];
      try {
        const titleMatch = listing.match(/job-card-list__title">(.*?)<\/h3>/);
        const companyMatch = listing.match(/job-card-container__company-name">(.*?)<\/a>/);
        
        if (titleMatch && companyMatch) {
          jobs.push({
            title: titleMatch[1].replace(/<[^>]*>/g, '').trim(),
            company_name: companyMatch[1].replace(/<[^>]*>/g, '').trim(),
            description: "LinkedIn internship opportunity in Jacksonville", // Placeholder
            location_city: "Jacksonville",
            location_state: "FL",
            job_type: "internship",
            source_url: sourceUrl,
            is_verified: false
          });
        }
      } catch (err) {
        console.log("Error parsing LinkedIn listing:", err);
      }
    }
  }
  
  console.log(`Extracted ${jobs.length} jobs from ${sourceUrl}`);
  return jobs;
}
