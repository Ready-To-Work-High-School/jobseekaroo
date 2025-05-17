
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Info } from 'lucide-react';

const FreemiumInfoCard = () => {
  return (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Info className="h-4 w-4 mr-2 text-blue-600" />
          Freemium Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-blue-900">
          Your account is currently using our free tier. You can post up to 3 jobs and view up to 10 applications per month. 
          <a href="/employer/premium" className="text-blue-700 font-medium ml-1 hover:underline">
            Upgrade to Premium
          </a>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FreemiumInfoCard;
