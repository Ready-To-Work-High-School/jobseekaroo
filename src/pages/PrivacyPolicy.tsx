
import React from 'react';
import Layout from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-muted-foreground">Last Updated: April 27, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Job Seekers 4 High Schools ("we," "our," or "us") is committed to protecting the privacy of high school students 
            and other users of our platform. This Privacy Policy explains how we collect, use, and safeguard your personal information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <div className="space-y-4">
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6">
              <li>Name and contact information</li>
              <li>Educational information</li>
              <li>Employment history and preferences</li>
              <li>Skills and qualifications</li>
              <li>Resume and application materials</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To create and manage your account</li>
            <li>To match you with job opportunities</li>
            <li>To communicate with potential employers</li>
            <li>To improve our services and user experience</li>
            <li>To ensure platform safety and security</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Protection of Student Information</h2>
          <div className="space-y-4">
            <p>
              We comply with the Children's Online Privacy Protection Act (COPPA) and other applicable laws protecting student privacy.
              For users under 13, we require verifiable parental consent before collecting personal information.
            </p>
            <p>
              For high school students ages 14-17, we implement additional safeguards:
            </p>
            <ul className="list-disc pl-6">
              <li>Limited data collection to essential information only</li>
              <li>Restricted sharing with verified employers only</li>
              <li>Enhanced privacy settings and controls</li>
              <li>Regular data security audits</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
          <p>
            We use industry-standard security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of sensitive data</li>
            <li>Secure server infrastructure</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights and Choices</h2>
          <div className="space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of communications</li>
              <li>Control your privacy settings</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Parental Rights</h2>
          <p>
            Parents/guardians of users under 18 have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Review their child's personal information</li>
            <li>Request deletion of their child's data</li>
            <li>Approve changes to privacy settings</li>
            <li>Restrict information sharing</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of any material changes via email 
            or through the platform. Continued use of our services after such modifications constitutes acceptance 
            of the updated Privacy Policy.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p className="mb-8">
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p>Email: legal@jobseeker4hs.org</p>
            <p>Phone: (917) 794-7422</p>
            <p>Address: 5533 Firestone Rd. Jacksonville, FL 32244</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
