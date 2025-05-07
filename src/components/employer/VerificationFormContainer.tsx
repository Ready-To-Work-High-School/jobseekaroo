
import React from 'react';
import { VerificationForm } from './VerificationForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const VerificationFormContainer: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/employer/dashboard');
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Employer Verification</h1>
      <VerificationForm 
        userId={user?.id} 
        onSuccess={handleSuccess} 
      />
    </div>
  );
};
