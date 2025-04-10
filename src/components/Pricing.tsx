
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import PricingPlans from './employer/premium/PricingPlans';
import FeeTeaser from './pricing/FeeTeaser';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Pricing = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your needs. Whether you're an employer looking for talent
            or a school helping students find opportunities.
          </p>
        </div>

        <FeeTeaser />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Need a custom plan?</h2>
          <p className="mb-6 max-w-xl mx-auto text-muted-foreground">
            For larger organizations or special requirements, we offer custom pricing and features.
            Contact our sales team to discuss your needs.
          </p>
          <Button asChild className="group">
            <Link to="/contact">
              Contact Sales
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
