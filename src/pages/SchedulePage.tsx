
import React from "react";
import Layout from "@/components/Layout";
import CalendlyEmbed from "@/components/calendly/CalendlyEmbed";
import { AlertCircle, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SchedulePage = () => {
  const calendlyClientId = import.meta.env.VITE_CALENDLY_CLIENT_ID;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-4">Schedule an Integration Call</h1>
            <p className="text-muted-foreground">
              Book a convenient time to discuss your school's needs and get personalized guidance 
              on integrating our platform with your educational institution. Sessions typically last 30 minutes.
            </p>
          </div>
          
          {!calendlyClientId && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Calendly scheduling is currently being configured. Please check back soon or contact support for assistance.
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <CalendlyEmbed 
              className="rounded-lg" 
              url={calendlyClientId ? `https://calendly.com/d/${calendlyClientId}` : undefined}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePage;
