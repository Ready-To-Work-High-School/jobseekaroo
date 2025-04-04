
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2, KeyRound } from 'lucide-react';
import { testEncryptionService } from '@/lib/supabase/encryption';
import { Separator } from '@/components/ui/separator';

const EncryptionServiceTest: React.FC = () => {
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleTestEncryption = async () => {
    setIsLoading(true);
    setTestResult(null);
    try {
      console.log('Testing encryption service...');
      const result = await testEncryptionService();
      console.log('Encryption test result:', result);
      setTestResult(result);
    } catch (error) {
      console.error('Error testing encryption service:', error);
      setTestResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          Encryption Service Test
        </CardTitle>
        <CardDescription>
          Test if the encryption service is properly configured
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleTestEncryption} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Encryption Service'
          )}
        </Button>

        {testResult && (
          <>
            <Alert variant={testResult.success ? "default" : "destructive"}>
              {testResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {testResult.success ? 'Success' : 'Error'}
              </AlertTitle>
              <AlertDescription>
                {testResult.message}
              </AlertDescription>
            </Alert>

            {!testResult.success && (
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full"
                >
                  {showDetails ? 'Hide' : 'Show'} Troubleshooting Details
                </Button>
                
                {showDetails && (
                  <div className="mt-4 p-4 bg-muted rounded-md text-xs space-y-2">
                    <p className="font-semibold">Common issues:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>The ENCRYPTION_KEY environment variable is not set in your Supabase project</li>
                      <li>Edge Function error or timeout</li>
                      <li>Network connectivity issues</li>
                    </ul>
                    <Separator className="my-2" />
                    <p className="font-semibold">Possible Solutions:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Check that the ENCRYPTION_KEY is set in Supabase project settings</li>
                      <li>Verify the Edge Function logs for any errors</li>
                      <li>Ensure your network can connect to Supabase services</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EncryptionServiceTest;
