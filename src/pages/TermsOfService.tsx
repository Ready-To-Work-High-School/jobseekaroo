
import React from 'react';
import Layout from '@/components/Layout';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p>Last Updated: April 10, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our job search platform, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">2. Description of Service</h2>
          <p>
            Our platform provides a service that connects job seekers with employers. We offer job listings, 
            application tools, and other career resources to help facilitate the job search process.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">3. User Accounts</h2>
          <p>
            To access certain features of our platform, you may be required to create an account. You are responsible 
            for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">4. User Content</h2>
          <p>
            By submitting content to our platform (including resumes, job applications, and other materials), 
            you grant us a non-exclusive license to use, store, and share that content as necessary to provide our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">5. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, 
            and disclose information about you.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">6. Prohibited Activities</h2>
          <p>Users may not:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Use our platform for any illegal purpose</li>
            <li>Post false, inaccurate, or misleading content</li>
            <li>Attempt to gain unauthorized access to other user accounts</li>
            <li>Use automated methods to access our platform without our permission</li>
            <li>Interfere with the proper functioning of our platform</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">7. Changes to Terms</h2>
          <p>
            We may modify these Terms of Service at any time. Continued use of our platform after changes 
            constitutes acceptance of the modified terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">8. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@jobsearchplatform.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
