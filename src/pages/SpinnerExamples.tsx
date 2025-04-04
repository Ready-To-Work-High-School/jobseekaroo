
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Spinner from '@/components/ui/spinner';
import AdvancedSpinner from '@/components/ui/advanced-spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SpinnerExamples = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Spinner Components</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Basic Spinner</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </div>
              
              <Button onClick={simulateLoading} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Loading...
                  </>
                ) : (
                  'Click to load'
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Advanced Spinner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4">
                <AdvancedSpinner variant="circle" size="md" text="Loading..." centered />
                <AdvancedSpinner variant="refresh" size="md" text="Refreshing..." centered />
                <AdvancedSpinner variant="dots" size="md" text="Processing..." centered />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Separator className="my-6" />
        
        <h2 className="text-2xl font-bold mb-4">Spinner Usage Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="h-40 flex items-center justify-center">
                <AdvancedSpinner variant="circle" size="lg" text="Loading data..." centered />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="h-40 flex items-center justify-center">
                <div className="text-center">
                  <AdvancedSpinner variant="dots" size="md" centered className="mb-4" />
                  <p className="text-sm text-muted-foreground">Please wait while we process your request</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="h-40 flex flex-col items-center justify-center">
                <AdvancedSpinner variant="refresh" size="xl" centered className="mb-2" />
                <div className="text-center mt-4">
                  <p className="font-medium">Syncing your profile</p>
                  <p className="text-sm text-muted-foreground">This may take a few moments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SpinnerExamples;
