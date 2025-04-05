
import React from 'react';
import Layout from '@/components/Layout';
import FirstJobToolkitContent from '@/components/students/FirstJobToolkitContent';

const FirstJobToolkit = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <FirstJobToolkitContent />
      </div>
    </Layout>
  );
};

export default FirstJobToolkit;
