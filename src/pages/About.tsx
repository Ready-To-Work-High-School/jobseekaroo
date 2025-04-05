
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';

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
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>Connect students with credential-ready employment opportunities</li>
              <li>Provide skills development resources tailored to in-demand careers</li>
              <li>Offer resume and interview preparation assistance</li>
              <li>Facilitate relationships between schools, students, and employers</li>
              <li>Support entrepreneurship and innovation among young people</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Partners</h2>
            <p className="text-lg mb-4">
              We work with leading companies, educational institutions, and community organizations to create 
              a comprehensive support network for students transitioning from school to career.
            </p>
            <p className="text-lg">
              Our partnerships span across industries, ensuring diverse opportunities for students with varied 
              interests and career goals.
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
