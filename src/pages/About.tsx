
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { BookOpen, Briefcase, GraduationCap, TrendingUp, UserCheck } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us | Job Seekers 4 High Schools</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">About Job Seekers 4 High Schools</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              At Job Seekers 4 High Schools, our mission is to bridge the gap between high school education and 
              meaningful career opportunities. We empower students with the skills, resources, and connections 
              they need to succeed in today's rapidly evolving job market.
            </p>
            <p className="text-lg">
              We believe every student deserves access to quality career preparation and job opportunities that 
              align with their skills, interests, and aspirations.
            </p>
          </div>
          
          <div className="mb-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <UserCheck className="mr-2 text-blue-600" />
              Serving an Untapped Niche
            </h2>
            <p className="text-lg mb-4">
              While platforms like LinkedIn target professionals and Indeed takes a broad approach, we focus exclusively 
              on high school students aged 16-18 who are often overlooked by mainstream job platforms.
            </p>
            <div className="bg-white p-4 rounded border border-blue-200 mb-4">
              <p className="font-medium text-blue-800">
                According to a 2023 U.S. Bureau of Labor Statistics report, approximately 34% of 16-19-year-olds 
                were in the labor force, yet many struggle to find age-appropriate jobs.
              </p>
            </div>
            <p className="text-lg">
              We've built the platform these students need: specialized for entry-level, part-time, or internship 
              roles that don't require prior experience.
            </p>
          </div>
          
          <div className="mb-12 bg-amber-50 p-6 rounded-lg border border-amber-100">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Briefcase className="mr-2 text-amber-600" />
              Meeting Employer Demand
            </h2>
            <p className="text-lg mb-4">
              Businesses in retail, hospitality, startups, and other sectors actively seek young, eager workers 
              for flexible roles. Our platform streamlines their hiring process by offering access to a pool of 
              pre-vetted, motivated high school students.
            </p>
            <p className="text-lg">
              With the growing gig economy, we help connect employers with local talent for more stable, 
              sustainable employment opportunities.
            </p>
          </div>
          
          <div className="mb-12 bg-green-50 p-6 rounded-lg border border-green-100">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <GraduationCap className="mr-2 text-green-600" />
              Educational Value
            </h2>
            <p className="text-lg mb-4">
              High school students need early career exposure. Our platform doubles as a tool for resume-building, 
              developing job skills like interviewing, and networking—perfectly aligned with schools' career-readiness goals.
            </p>
            <p className="text-lg">
              We support programs like Career Technical Education (CTE) that emphasize the importance of work 
              experience for students, giving them a competitive edge in their future careers.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
            <p className="text-lg mb-4">
              Whether you're a student seeking opportunities, an educator looking to enhance your school's 
              career preparation resources, or an employer wanting to connect with talented young people, 
              we welcome your participation.
            </p>
            <div className="flex justify-center mt-6">
              <a 
                href="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                Contact Us to Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
