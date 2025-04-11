
import Layout from '@/components/Layout';
import { Star } from 'lucide-react';

const PremiumServices = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Star className="h-8 w-8 text-yellow-500" />
          <h1 className="text-4xl font-bold">Premium Services</h1>
        </div>
        
        <p className="text-lg mb-8">
          Enhanced features for employers and schools, including priority job listings and advanced analytics.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">For Employers</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-medium">Priority Job Listings</h3>
                <p className="text-sm text-muted-foreground">Get your job postings featured at the top of search results.</p>
              </li>
              <li>
                <h3 className="font-medium">Advanced Applicant Filtering</h3>
                <p className="text-sm text-muted-foreground">Use sophisticated filters to find the perfect candidates.</p>
              </li>
              <li>
                <h3 className="font-medium">Detailed Analytics</h3>
                <p className="text-sm text-muted-foreground">Access comprehensive insights about your job postings and applicants.</p>
              </li>
              <li>
                <h3 className="font-medium">Bulk Communication</h3>
                <p className="text-sm text-muted-foreground">Send messages to multiple candidates simultaneously.</p>
              </li>
            </ul>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">For Schools</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-medium">Custom Branding</h3>
                <p className="text-sm text-muted-foreground">Personalize the platform with your school's colors and logo.</p>
              </li>
              <li>
                <h3 className="font-medium">Advanced Reporting</h3>
                <p className="text-sm text-muted-foreground">Generate detailed reports on student engagement and outcomes.</p>
              </li>
              <li>
                <h3 className="font-medium">API Integration</h3>
                <p className="text-sm text-muted-foreground">Connect with your existing school systems and databases.</p>
              </li>
              <li>
                <h3 className="font-medium">Dedicated Support</h3>
                <p className="text-sm text-muted-foreground">Get priority assistance from our customer support team.</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-center">Coming Soon</h2>
          <p className="text-center">
            Our premium services are currently being finalized. Contact us for early access or to
            receive notifications when these features become available.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumServices;
