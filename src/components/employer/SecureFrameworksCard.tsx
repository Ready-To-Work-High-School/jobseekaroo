
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Server, Lock } from "lucide-react";

const SecureFrameworksCard = () => {
  return (
    <Card className="overflow-hidden border-green-200 bg-green-50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-green-600" />
          <CardTitle>Secure Framework Implementation</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Our platform is built using industry-standard secure frameworks and best practices. 
          We implement Express.js with security defaults baked in to ensure the protection 
          of both employer and student data throughout the application process.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-green-100">
            <Server className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-center">Express.js</h3>
            <p className="text-sm text-center text-muted-foreground">
              Secure routing and middleware with built-in protection against common web vulnerabilities
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-green-100">
            <Lock className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-center">Data Encryption</h3>
            <p className="text-sm text-center text-muted-foreground">
              End-to-end encryption for all sensitive employer and student information
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-green-100">
            <Shield className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-center">Security Audits</h3>
            <p className="text-sm text-center text-muted-foreground">
              Regular security assessments and vulnerability testing to maintain platform integrity
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
          <Shield className="h-4 w-4 mr-1 text-green-600" />
          <span>All data transfers and storage follow industry best practices for security</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureFrameworksCard;
