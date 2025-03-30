
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Server, Lock, Code, RefreshCw } from "lucide-react";
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
    django: false,
    spring: false
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
      case 'django':
        return <Code className="h-8 w-8 text-green-600 mb-2" />;
      case 'spring':
        return <Lock className="h-8 w-8 text-green-600 mb-2" />;
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
          We implement Express.js, Django, or Spring with security defaults baked in to ensure the protection 
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
                <Code className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium text-center">Django</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Python-based framework with robust security features and built-in protection
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2" 
                  onClick={() => toggleDetails('django')}
                >
                  {frameworkDetails.django ? 'Hide Details' : 'View Details'}
                </Button>
                {frameworkDetails.django && (
                  <div className="mt-2 p-2 bg-green-50 rounded-md text-xs w-full">
                    <p>- CSRF protection</p>
                    <p>- SQL injection prevention</p>
                    <p>- Clickjacking protection</p>
                    <p>- Authentication system</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-green-100">
                <Lock className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium text-center">Spring</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Java framework with comprehensive security modules for enterprise applications
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2" 
                  onClick={() => toggleDetails('spring')}
                >
                  {frameworkDetails.spring ? 'Hide Details' : 'View Details'}
                </Button>
                {frameworkDetails.spring && (
                  <div className="mt-2 p-2 bg-green-50 rounded-md text-xs w-full">
                    <p>- OAuth2 integration</p>
                    <p>- JWT authentication</p>
                    <p>- Method-level security</p>
                    <p>- HTTPS enforcement</p>
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
