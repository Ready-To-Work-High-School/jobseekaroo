
import Layout from '@/components/Layout';
import { BarChart3 } from 'lucide-react';

const AnalyticsDashboard = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="h-8 w-8 text-cyan-500" />
          <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
        </div>
        
        <p className="text-lg mb-8">
          Comprehensive analytics for tracking job applications, skill development, and student engagement.
        </p>
        
        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Dashboard Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-background rounded shadow-sm">
              <h3 className="font-medium mb-2">Application Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor application status, response rates, and interview invitations across all jobs.
              </p>
            </div>
            <div className="p-4 bg-background rounded shadow-sm">
              <h3 className="font-medium mb-2">Skill Growth</h3>
              <p className="text-sm text-muted-foreground">
                Visualize skill development progress and identify areas for improvement.
              </p>
            </div>
            <div className="p-4 bg-background rounded shadow-sm">
              <h3 className="font-medium mb-2">Engagement Metrics</h3>
              <p className="text-sm text-muted-foreground">
                Track platform usage, profile completion, and activity patterns.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-center mb-8">
          Our analytics dashboard is currently being enhanced with more features. Please check back soon for the full experience.
        </p>
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;
