
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RequestsTabProps {
  isCeo?: boolean;
}

const RequestsTab: React.FC<RequestsTabProps> = ({ isCeo = false }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Code Generation Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {isCeo ? (
            <p>As a CEO, you can approve or deny code generation requests.</p>
          ) : (
            <p>Submit requests for new redemption codes here.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestsTab;
