
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
        const schoolName = hostname.split('.')[0];
        
        if (schoolName !== 'localhost' && schoolName !== 'jobseekaroo') {
          // Fetch school data from Supabase with proper type handling
          const { data, error } = await supabase
            .from('schools')
            .select()
            .eq('slug', schoolName)
            .maybeSingle();
            
          if (error) throw error;
          
          if (data) {
            setSchoolData(data as School);
          }
        } else {
          // Redirect to main page if not on a school subdomain
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching school data:', error);
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
    // School not found
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
  
  return (
    <Layout>
      <Helmet>
        <title>{schoolData.name} Job Portal | Jobseekaroo</title>
        <meta name="description" content={`Find student jobs through ${schoolData.name}'s partnership with Jobseekaroo`} />
        <meta property="og:title" content={`${schoolData.name} Job Portal`} />
        <meta property="og:image" content={schoolData.logo_url || ''} />
      </Helmet>
      
      <div className={`container mx-auto py-8 ${fadeIn}`}>
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 rounded-xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            {schoolData.logo_url && (
              <img 
                src={schoolData.logo_url} 
                alt={`${schoolData.name} logo`} 
                className="h-20 lg:h-32 object-contain"
              />
            )}
            
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {schoolData.name} Student Job Portal
              </h1>
              <p className="text-lg text-muted-foreground">
                Exclusive job opportunities for {schoolData.name} students
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">For Students</h2>
              <p className="mb-6">
                Access exclusive job opportunities tailored for {schoolData.name} students. 
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
                Post job opportunities specifically for {schoolData.name} students and alumni.
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
              {/* Featured jobs would be rendered here */}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SchoolLanding;
