
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const SettingsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
        <CardDescription>Configure system settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-10 text-gray-500">
          Admin settings panel is under development.
        </p>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
