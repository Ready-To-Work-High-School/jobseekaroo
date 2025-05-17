
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotSignedInAlert = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Authentication Required</AlertTitle>
      <AlertDescription>
        <p className="mb-4">You need to be signed in to view and edit your profile.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button variant="default" asChild>
            <Link to="/signup">Create Account</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default NotSignedInAlert;
