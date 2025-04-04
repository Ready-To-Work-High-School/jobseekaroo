
import { useState, useEffect } from "react";
import { fetchApi } from "@/utils/api-client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Framework {
  name: string;
  description: string;
}

interface SecureData {
  message: string;
  frameworks: Framework[];
}

const ServerDataDisplay = () => {
  const [data, setData] = useState<SecureData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSecureData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchApi<SecureData>("secure-data");
      
      if (result.error) {
        setError(result.error);
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.data) {
        setData(result.data);
        toast({
          title: "Success",
          description: "Data loaded successfully from the server",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecureData();
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle>Secure Backend Data</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchSecureData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <CardDescription>
          This data is fetched from the Express.js backend server
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {loading && (
          <div className="flex justify-center p-4">
            <div className="animate-pulse text-center">
              <p>Loading server data...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 font-medium">Error: {error}</p>
            <p className="text-sm text-red-600 mt-1">
              Make sure your server is running with <code>npm run server</code>
            </p>
          </div>
        )}
        
        {data && !loading && !error && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="font-medium">{data.message}</p>
            </div>
            
            <h3 className="font-medium text-lg">Security Frameworks:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.frameworks.map((framework, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-md hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold">{framework.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{framework.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServerDataDisplay;
