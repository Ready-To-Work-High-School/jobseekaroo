
import React from "react";
import Layout from "@/components/Layout";
import CalendlyEmbed from "@/components/calendly/CalendlyEmbed";

const SchedulePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Schedule an Appointment</h1>
        <CalendlyEmbed 
          className="rounded-lg shadow-md" 
          url={`https://calendly.com/d/${process.env.CALENDLY_CLIENT_ID}`} 
        />
      </div>
    </Layout>
  );
};

export default SchedulePage;
