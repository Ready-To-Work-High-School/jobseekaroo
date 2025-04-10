
import React from 'react';
import Layout from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p>Last Updated: April 10, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, update your profile,
            apply for jobs, or communicate with us. This may include:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Contact information (name, email, phone number)</li>
            <li>Account credentials</li>
            <li>Employment history and education</li>
            <li>Resume and cover letters</li>
            <li>Job preferences and career interests</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Provide and improve our services</li>
            <li>Connect job seekers with potential employers</li>
            <li>Personalize your experience</li>
            <li>Send notifications about job opportunities</li>
            <li>Respond to your requests and provide support</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">3. Sharing Your Information</h2>
          <p>
            We may share your information with employers when you apply for jobs, and with service providers 
            who help us operate our platform. We will not sell your personal information to third parties.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of transmission 
            over the Internet is completely secure, and we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">5. Your Choices</h2>
          <p>
            You can update your account information, manage your communication preferences, 
            or delete your account at any time through your account settings.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
            and deliver personalized content. You can manage your cookie preferences through your browser settings.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes 
            by posting a notice on our website or sending you an email.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@jobsearchplatform.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
