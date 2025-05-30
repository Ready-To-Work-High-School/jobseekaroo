
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { useFadeIn } from '@/utils/animations';
import { School } from '@/types/school';
import { sanitizeHtml, escapeHtml } from '@/utils/sanitization';

const SchoolLanding = () => {
  const [schoolData, setSchoolData] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const fadeIn = useFadeIn(300);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchoolData = async () => {
      setLoading(true);
      
      try {
        // Extract school name from hostname
        const hostname = window.location.hostname;
        
        // Enhanced regex to match school.domain.tld pattern (with both variations of the domain)
        const schoolRegex = /^([^.]+)\.(jobseekaroo\.com|jobseekers4hs\.org|jobseeker4hs\.org|localhost)(?::\d+)?$/;
        const schoolMatch = hostname.match(schoolRegex);
        
        let schoolName = null;
        
        if (schoolMatch) {
          // Extract the school slug from the subdomain
          schoolName = schoolMatch[1];
          console.log(`Detected school subdomain: ${schoolName}`);
        } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
          // For local development, check if there's a school parameter in the URL
          const urlParams = new URLSearchParams(window.location.search);
          schoolName = urlParams.get('school');
          
          if (schoolName) {
            console.log(`Using school param from URL: ${schoolName}`);
          } else {
            // For testing on localhost without a param, redirect to main landing
            navigate('/');
            return;
          }
        }
        
        if (schoolName && schoolName !== 'jobseekaroo' && schoolName !== 'www' && schoolName !== 'jobseekers4hs' && schoolName !== 'jobseeker4hs') {
          // Use a raw query approach to avoid TypeScript issues
          const { data: schoolData, error } = await supabase
            .from('schools')
            .select('*')
            .eq('slug', schoolName)
            .maybeSingle();
            
          if (error) {
            console.error('Error fetching school data:', error);
            throw error;
          }
          
          if (schoolData) {
            // Sanitize school data before setting it to state
            const sanitizedData = {
              ...schoolData,
              name: sanitizeHtml(schoolData.name || ''),
              description: sanitizeHtml(schoolData.description || ''),
              logo_url: sanitizeHtml(schoolData.logo_url || ''),
              // Ensure any other fields that might contain HTML are sanitized
              featured_jobs: schoolData.featured_jobs 
                ? schoolData.featured_jobs.map((job: any) => ({
                    ...job,
                    title: sanitizeHtml(job.title || ''),
                    description: sanitizeHtml(job.description || ''),
                    company: sanitizeHtml(job.company || '')
                  }))
                : []
            };
            
            console.log('School data found and sanitized');
            setSchoolData(sanitizedData as unknown as School);
          } else {
            console.log(`No school found with slug: ${schoolName}`);
            // School not found in database, but we're on a subdomain - show generic not found
          }
        } else {
          // Not on a school subdomain and no school parameter, redirect to main page
          navigate('/');
        }
      } catch (error) {
        console.error('Error in fetchSchoolData:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSchoolData();
  }, [navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 w-3/4 mb-4 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 w-2/3 mb-6 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 w-full rounded mb-8"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!schoolData) {
    // School not found but we're on a school subdomain
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">School Not Found</h1>
          <p className="mb-8">The requested school page could not be found.</p>
          <Button asChild>
            <Link to="/">Go to Homepage</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Sanitized school name and data for meta tags
  const sanitizedSchoolName = escapeHtml(schoolData.name || '');
  const sanitizedLogoUrl = escapeHtml(schoolData.logo_url || '');
  
  // Render the school-branded landing page with the school data
  return (
    <Layout>
      <Helmet>
        {/* Use sanitized values in Helmet to prevent XSS */}
        <title>{sanitizedSchoolName} Job Portal | Jobseekers4HS</title>
        <meta name="description" content={`Find student jobs through ${sanitizedSchoolName}'s partnership with Jobseekers4HS`} />
        <meta property="og:title" content={`${sanitizedSchoolName} Job Portal`} />
        {sanitizedLogoUrl && <meta property="og:image" content={sanitizedLogoUrl} />}
        {/* Prevent any script injection */}
        <meta http-equiv="Content-Security-Policy" content="script-src 'self' https://cdn.gpteng.co" />
      </Helmet>
      
      <div className={`container mx-auto py-8 ${fadeIn}`}>
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 rounded-xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            {schoolData.logo_url && (
              <img 
                src={sanitizedLogoUrl} 
                alt={`${sanitizedSchoolName} logo`} 
                className="h-20 lg:h-32 object-contain"
                onError={(e) => {
                  // Fallback for failed image loads
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                  (e.target as HTMLImageElement).alt = 'Logo placeholder';
                }}
              />
            )}
            
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {sanitizedSchoolName} Student Job Portal
              </h1>
              <p className="text-lg text-muted-foreground">
                Exclusive job opportunities for {sanitizedSchoolName} students
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">For Students</h2>
              <p className="mb-6">
                Access exclusive job opportunities tailored for {sanitizedSchoolName} students. 
                Create a profile to showcase your skills and experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">For Employers</h2>
              <p className="mb-6">
                Post job opportunities specifically for {sanitizedSchoolName} students and alumni.
                Get a free trial of premium features for your first posting.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link to="/sign-up?type=employer">Sign Up</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/employer-premium">Learn About Premium</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {schoolData.featured_jobs && schoolData.featured_jobs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Opportunities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 
                Featured jobs would be rendered here with sanitized content
                Example: 
                {schoolData.featured_jobs.map((job) => (
                  <JobCard 
                    key={job.id}
                    title={job.title} // Already sanitized in the data processing stage
                    company={job.company}
                    description={job.description}
                  />
                ))}
              */}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SchoolLanding;
