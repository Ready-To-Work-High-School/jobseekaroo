
import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const NotSignedInAlert: React.FC = () => {
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>You are not signed in.</AlertTitle>
      <AlertDescription>
        Please <Link to="/sign-in" className="underline">sign in</Link> to view your profile.
      </AlertDescription>
    </Alert>
  );
};

export default NotSignedInAlert;
