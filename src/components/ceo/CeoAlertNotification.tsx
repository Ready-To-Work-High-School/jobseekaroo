
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';

const CeoAlertNotification: React.FC = () => {
  const [newEmployerAlert, setNewEmployerAlert] = useState(true);
  const navigate = useNavigate();

  if (!newEmployerAlert) return null;

  return (
    <div className="mb-8">
      <Alert>
        <Bell className="h-5 w-5 text-amber-500" />
        <AlertTitle className="font-bold">Attention: New Employer Sign-up!</AlertTitle>
        <AlertDescription>
          A new employer has registered. Please review their company info and approve or deny their job posting(s) as needed.<br />
          <Button
            className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500"
            onClick={() => {
              setNewEmployerAlert(false);
              navigate('/admin/employer-verification');
            }}
          >
            Go to Employer Approvals
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CeoAlertNotification;
