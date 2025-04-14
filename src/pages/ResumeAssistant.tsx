
import React from 'react';
import Layout from '@/components/Layout';
import { FileText } from 'lucide-react';
import ResumeChat from '@/components/resume/ResumeChat';

const ResumeAssistant = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold">Resume Assistant</h1>
        </div>
        
        <p className="text-lg mb-8">
          Our AI-powered resume assistant helps you create a professional resume that stands out to employers.
          Upload your current resume for feedback, or generate a new one from scratch.
        </p>
        
        <ResumeChat />
      </div>
    </Layout>
  );
};

export default ResumeAssistant;
