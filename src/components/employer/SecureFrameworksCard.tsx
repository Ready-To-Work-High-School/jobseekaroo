
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Server, Database, Cloud, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchApi } from "@/utils/api-client";

interface Framework {
  name: string;
  description: string;
}

interface SecureData {
  message: string;
  frameworks: Framework[];
}

const SecureFrameworksCard = () => {
  const [frameworkDetails, setFrameworkDetails] = useState({
    express: false,
    supabase: false,
    render: false
  });
  
  const [apiData, setApiData] = useState<SecureData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [useApiData, setUseApiData] = useState(false);

  const toggleDetails = (framework: keyof typeof frameworkDetails) => {
    setFrameworkDetails({
      ...frameworkDetails,
      [framework]: !frameworkDetails[framework]
    });
  };
  
  const fetchFrameworkData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchApi<SecureData>("secure-data");
      if (result.data) {
        setApiData(result.data);
        setUseApiData(true);
      }
    } catch (error) {
      console.error("Failed to fetch framework data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Try to fetch data on initial load
  useEffect(() => {
    fetchFrameworkData();
  }, []);

  const getFrameworkIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'express.js':
        return <Server className="h-8 w-8 text-green-600 mb-2" />;
      case 'supabase':
        return <Database className="h-8 w-8 text-green-600 mb-2" />;
      case 'render':
        return <Cloud className="h-8 w-8 text-green-600 mb-2" />;
      default:
        return <Shield className="h-8 w-8 text-green-600 mb-2" />;
    }
  };

  return (
    <Card className="overflow-hidden border-green-200 bg-green-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-green-600" />
            <CardTitle>Secure Framework Implementation</CardTitle>
          </div>
          
          {useApiData && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchFrameworkData}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Loading...' : 'Refresh'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Our platform is built using industry-standard secure frameworks and best practices. 
          We implement Express.js, Supabase, or Render with security defaults baked in to ensure the protection 
          of both employer and student data throughout the application process.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {useApiData && apiData ? (
            /* Display data from API */
            apiData.frameworks.map((framework, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg border border-green-100">
                {getFrameworkIcon(framework.name)}
                <h3 className="font-medium text-center">{framework.name}</h3>
                <p className="text-sm text-center text-muted-foreground">
                  {framework.description}
                </p>
              </div>
            ))
          ) : (
            /* Default static content */
            <>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-green-100">
                <Server className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium text-center">Express.js</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Secure routing and middleware with built-in protection against common web vulnerabilities
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2" 
                  onClick={() => toggleDetails('express')}
                >
                  {frameworkDetails.express ? 'Hide Details' : 'View Details'}
                </Button>
                {frameworkDetails.express && (
                  <div className="mt-2 p-2 bg-green-50 rounded-md text-xs w-full">
                    <p>- CORS protection</p>
                    <p>- Helmet security headers</p>
                    <p>- XSS prevention</p>
                    <p>- Rate limiting</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-green-100">
                <Database className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium text-center">Supabase</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Serverless database with built-in authentication, storage, and edge functions
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2" 
                  onClick={() => toggleDetails('supabase')}
                >
                  {frameworkDetails.supabase ? 'Hide Details' : 'View Details'}
                </Button>
                {frameworkDetails.supabase && (
                  <div className="mt-2 p-2 bg-green-50 rounded-md text-xs w-full">
                    <p>- Row Level Security</p>
                    <p>- JWT authentication</p>
                    <p>- Edge functions</p>
                    <p>- Real-time subscriptions</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-green-100">
                <Cloud className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium text-center">Render</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Cloud platform with automatic SSL, global CDN, and continuous deployment
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2" 
                  onClick={() => toggleDetails('render')}
                >
                  {frameworkDetails.render ? 'Hide Details' : 'View Details'}
                </Button>
                {frameworkDetails.render && (
                  <div className="mt-2 p-2 bg-green-50 rounded-md text-xs w-full">
                    <p>- Automatic HTTPS/SSL</p>
                    <p>- DDoS protection</p>
                    <p>- Environment variables</p>
                    <p>- Secure CI/CD pipelines</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
          <Shield className="h-4 w-4 mr-1 text-green-600" />
          <span>All data transfers and storage follow industry best practices for security</span>
        </div>
        
        {useApiData && (
          <div className="mt-4 bg-green-100 p-2 rounded-md text-sm text-green-700 text-center">
            ✅ Connected to backend API
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecureFrameworksCard;
