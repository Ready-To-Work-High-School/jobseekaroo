
import Layout from '@/components/Layout';
import { BarChart3, TrendingUp, Activity, Users, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import FreeForStudentsBadge from '@/components/badges/FreeForStudentsBadge';

const AnalyticsDashboard = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-cyan-500" />
            <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          </div>
          <FreeForStudentsBadge variant="default" />
        </div>
        
        <p className="text-lg mb-8">
          Comprehensive analytics for tracking job applications, skill development, and student engagement.
        </p>
        
        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Dashboard Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-background rounded shadow-sm student-card-hover">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium">Application Tracking</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Monitor application status, response rates, and interview invitations across all jobs.
              </p>
            </div>
            <div className="p-4 bg-background rounded shadow-sm student-card-hover">
              <div className="flex items-center mb-2">
                <Activity className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-medium">Skill Growth</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Visualize skill development progress and identify areas for improvement.
              </p>
            </div>
            <div className="p-4 bg-background rounded shadow-sm student-card-hover">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="font-medium">Engagement Metrics</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Track platform usage, profile completion, and activity patterns.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 student-card-hover">
            <h3 className="text-xl font-medium mb-4">Your Application Stats</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-muted-foreground">Application statistics visualization coming soon</p>
            </div>
          </Card>
          
          <Card className="p-6 student-card-hover">
            <h3 className="text-xl font-medium mb-4">Skill Development Progress</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-muted-foreground">Skill progress visualization coming soon</p>
            </div>
          </Card>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
            <Clock className="h-4 w-4 text-amber-600 mr-2" />
            <p className="text-sm text-amber-800">
              Analytics are updated daily at midnight
            </p>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="mb-4">
            Our analytics dashboard is currently being enhanced with more features. Please check back soon for the full experience.
          </p>
          
          <div className="inline-block p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center mb-2 justify-center">
              <FreeForStudentsBadge variant="small" />
            </div>
            <p className="text-sm text-amber-800">
              All analytics features are completely free for Westside High School students
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;
