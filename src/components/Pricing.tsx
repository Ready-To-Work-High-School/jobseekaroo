
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import PricingPlans from './employer/premium/PricingPlans';
import FeeTeaser from './pricing/FeeTeaser';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Pricing = () => {
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your needs. Whether you're an employer looking for talent
            or a school helping students find opportunities.
          </p>
        </div>

        <PricingPlans />

        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">What happens when I upgrade or downgrade?</h4>
              <p className="text-gray-600">
                When you upgrade, you'll immediately get access to all the new features of your plan. 
                When downgrading, you'll keep your current plan until the end of your billing cycle.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Is there a long-term commitment?</h4>
              <p className="text-gray-600">
                No. All our plans are month-to-month or annual with no long-term commitment. 
                You can cancel or change your plan at any time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600">
                Yes, we offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, 
                contact our support team within 14 days of purchase for a full refund.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Need a custom plan?</h2>
            <p className="mb-6 max-w-xl mx-auto text-muted-foreground">
              For larger organizations or special requirements, we offer custom pricing and features.
              Our team will work with you to build the perfect solution for your needs.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-1" />
                <span className="text-sm">Custom onboarding</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-1" />
                <span className="text-sm">Dedicated support</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-1" />
                <span className="text-sm">Volume discounts</span>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild className="group">
                <Link to="/contact">
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
