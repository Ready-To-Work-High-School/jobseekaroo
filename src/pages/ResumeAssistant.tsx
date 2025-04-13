
import React from 'react';
import Layout from '@/components/Layout';
import { FileText } from 'lucide-react';

const ResumeAssistant = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold">Resume Assistant</h1>
        </div>
        
        <p className="text-lg mb-8">
          Our resume assistant helps you create a professional resume that stands out to employers.
          This page is currently under development.
        </p>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-center">Coming Soon</h2>
          <p className="text-center">
            The Resume Assistant is currently being developed. Please check back soon for this feature.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAssistant;
