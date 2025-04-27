
import React from "react";
import CalendlyEmbed from "@/components/calendly/CalendlyEmbed";
import Layout from "@/components/Layout";

const TestPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Test Calendly Embed</h1>
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <CalendlyEmbed />
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
