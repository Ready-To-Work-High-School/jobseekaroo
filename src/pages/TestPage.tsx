
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestTube, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TestPage = () => {
  const testResults = [
    { name: 'Database Connection', status: 'pass', message: 'Connected successfully' },
    { name: 'Authentication Service', status: 'pass', message: 'Auth flow working' },
    { name: 'Job Listings API', status: 'pass', message: 'API responding normally' },
    { name: 'Email Service', status: 'warning', message: 'Some delays detected' },
    { name: 'File Upload Service', status: 'pass', message: 'Upload working correctly' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <TestTube className="h-5 w-5 text-gray-500" />;
    }
  };

  const runTests = () => {
    // Placeholder for running tests
    console.log('Running system tests...');
  };

  return (
    <Layout>
      <Helmet>
        <title>System Tests - Job Seekers 4 HS</title>
        <meta name="description" content="System health and testing dashboard." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <TestTube className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">System Tests</h1>
          </div>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health Check</CardTitle>
                <div className="flex gap-3">
                  <Button onClick={runTests}>
                    <TestTube className="mr-2 h-4 w-4" />
                    Run Tests
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(test.status)}
                        <div>
                          <h3 className="font-medium">{test.name}</h3>
                          <p className="text-sm text-muted-foreground">{test.message}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        test.status === 'pass' ? 'bg-green-100 text-green-800' :
                        test.status === 'fail' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {test.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Development Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Environment</h4>
                    <p className="text-sm text-muted-foreground">Development</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Last Updated</h4>
                    <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">React Version</h4>
                    <p className="text-sm text-muted-foreground">18.3.1</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">TypeScript</h4>
                    <p className="text-sm text-muted-foreground">Enabled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
