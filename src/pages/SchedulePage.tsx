
import React from "react";
import Layout from "@/components/Layout";
import CalendlyEmbed from "@/components/calendly/CalendlyEmbed";
import { AlertCircle } from "lucide-react";

const SchedulePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Schedule an Appointment</h1>
          <p className="text-muted-foreground mb-8">
            Book a convenient time to discuss your career opportunities and get personalized guidance 
            from our team. Sessions typically last 30 minutes.
          </p>
          
          {!process.env.CALENDLY_CLIENT_ID && (
            <div className="flex items-center gap-2 p-4 mb-6 text-amber-600 bg-amber-50 rounded-lg border border-amber-200">
              <AlertCircle className="h-5 w-5" />
              <p>Please configure your Calendly client ID in the environment variables.</p>
            </div>
          )}

          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <CalendlyEmbed 
              className="rounded-lg" 
              url={`https://calendly.com/d/${process.env.CALENDLY_CLIENT_ID}`} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePage;
