
import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const VystarInternship = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <img 
              src="/lovable-uploads/d84f89c0-eba4-4ea0-a757-0f58a4e079ff.png"
              alt="VyStar Credit Union Logo"
              className="h-12 mr-4"
            />
            <h1 className="text-3xl font-bold text-blue-900">VyStar Financial Services Internship Program</h1>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Program Overview</h2>
            <p className="mb-4">
              The VyStar Credit Union Financial Services Internship offers high school students a unique opportunity 
              to gain valuable experience in the banking and financial services industry. This 8-week summer program
              provides hands-on training in customer service, financial operations, and professional development.
            </p>
            <p>
              Interns will work directly with VyStar professionals, learning essential skills while earning a competitive
              stipend of $15 per hour.
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Application Process</h2>
            <div className="space-y-4">
              <p>To apply for the VyStar Financial Services Internship, please complete the following steps:</p>
              
              <ol className="list-decimal pl-5 space-y-2">
                <li>Fill out the online application form below</li>
                <li>Submit your resume and a brief statement of interest</li>
                <li>Obtain a recommendation from a teacher or school counselor</li>
                <li>If selected, participate in an interview with the VyStar HR team</li>
              </ol>
              
              <div className="bg-blue-50 border border-blue-100 rounded p-4 mt-4">
                <p className="text-blue-800 font-medium">Application Deadline: June 15, 2025</p>
                <p className="text-sm text-blue-700 mt-1">Limited positions available. Early applications are encouraged.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Apply Now</h2>
            <p className="mb-6">Complete the form below to submit your application:</p>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Select Grade</option>
                  <option>9th Grade</option>
                  <option>10th Grade</option>
                  <option>11th Grade</option>
                  <option>12th Grade</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Why are you interested in this internship?</label>
                <textarea rows={4} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" id="agree" />
                <label htmlFor="agree" className="ml-2 block text-sm text-gray-700">
                  I understand that submitting this application does not guarantee placement in the program.
                </label>
              </div>
              
              <div className="pt-4">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default VystarInternship;
