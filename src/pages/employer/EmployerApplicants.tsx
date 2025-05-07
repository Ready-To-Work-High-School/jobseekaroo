
import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import ApplicantsTab from '@/components/employer/ApplicantsTab';
import { useFadeIn } from '@/utils/animations';

const EmployerApplicants = () => {
  const fadeIn = useFadeIn(300);
  
  return (
    <Layout>
      <div className={`container mx-auto px-4 py-6 ${fadeIn}`}>
        <h1 className="text-3xl font-bold mb-6">Applicants</h1>
        <p className="text-muted-foreground mb-6">
          Review and manage applicants for your job postings
        </p>
        
        <ApplicantsTab />
      </div>
    </Layout>
  );
};

export default EmployerApplicants;
