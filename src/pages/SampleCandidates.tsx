
import React from 'react';
import Layout from '@/components/Layout';
import { mockStudentProfiles } from '@/lib/mock-data/students';
import StudentProfileCard from '@/components/students/StudentProfileCard';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Building } from 'lucide-react';

const SampleCandidates = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sample Candidates - Job Seekers 4 HS</title>
        <meta name="description" content="Browse our pool of qualified high school candidates ready for employment opportunities." />
      </Helmet>
      
      <div className="bg-blue-50/50 pt-8 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="sm" asChild className="gap-1">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Back
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Sample Student Candidates</h1>
              <p className="text-muted-foreground mt-2">Preview our qualified student talent pool from Westside High School</p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border text-sm">
              <Users className="h-4 w-4 text-blue-600" />
              <span>Showing {mockStudentProfiles.length} of {mockStudentProfiles.length} candidates</span>
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Building className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-medium">For Employers</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              These profiles represent real students from our program. Creating an employer account gives you access to our full database of qualified candidates with verified skills and certifications.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link to="/sign-up">Create Employer Account</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/employer-dashboard">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStudentProfiles.map((student) => (
            <StudentProfileCard key={student.id} student={student} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg mb-4">
            Ready to connect with these qualified candidates?
          </p>
          <Button size="lg" asChild>
            <Link to="/employer-dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SampleCandidates;
