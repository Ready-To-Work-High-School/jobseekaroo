
import React from 'react';
import Layout from '@/components/Layout';
import FirstJobToolkitContent from '@/components/students/FirstJobToolkitContent';
import { Toaster } from '@/components/ui/toaster';

const FirstJobToolkit = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <FirstJobToolkitContent />
        <Toaster />
      </div>
    </Layout>
  );
};

export default FirstJobToolkit;
