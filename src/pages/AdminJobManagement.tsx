
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminJobForm from '@/components/admin/AdminJobForm';
import InternshipScraper from '@/components/admin/InternshipScraper';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/hooks/useAuth';
import { isAdmin } from '@/utils/adminUtils';

export default function AdminJobManagement() {
  const [activeTab, setActiveTab] = useState('add-job');
  const fadeIn = useFadeIn(300);
  const { userProfile } = useAuth();
  
  // Check if user is admin or CEO
  const hasAccess = isAdmin(userProfile);
  
  if (!hasAccess) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardHeader>
              <CardTitle>Access Restricted</CardTitle>
              <CardDescription>
                You don't have permission to access this page. This area is restricted to administrators and CEOs.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Job Management</h1>
          <p className="text-muted-foreground mt-2">
            Create new job listings or scrape internship opportunities
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="add-job">Create New Job</TabsTrigger>
            <TabsTrigger value="scrape-internships">Internship Scraper</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add-job">
            <AdminJobForm />
          </TabsContent>
          
          <TabsContent value="scrape-internships">
            <InternshipScraper />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
