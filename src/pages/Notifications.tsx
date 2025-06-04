
import React from 'react';
import Layout from '@/components/Layout';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import NotificationFilters from '@/components/notifications/NotificationFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Notifications = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Notifications</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <NotificationCenter />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <NotificationFilters />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
