
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WorkflowEditor from '@/components/employer/workflow/WorkflowEditor';
import FormBuilder from '@/components/employer/formbuilder/FormBuilder';
import { Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const EmployerToolsPage = () => {
  const [activeTab, setActiveTab] = useState("workflows");
  const { userProfile } = useAuth();
  const hasPremium = userProfile?.preferences?.hasPremium === true;

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Recruitment Tools</h1>
            <p className="text-muted-foreground mt-1">
              Advanced tools to streamline your candidate screening process
            </p>
          </div>
          
          {hasPremium && (
            <div className="flex items-center bg-amber-50 text-amber-800 px-3 py-1 rounded border border-amber-200">
              <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-medium">Premium Tools Enabled</span>
            </div>
          )}
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="workflows">Candidate Workflows</TabsTrigger>
            <TabsTrigger value="forms">Custom Forms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="workflows">
            <WorkflowEditor />
          </TabsContent>
          
          <TabsContent value="forms">
            <FormBuilder />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployerToolsPage;
