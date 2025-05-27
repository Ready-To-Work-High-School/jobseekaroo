
import Layout from '@/components/Layout';
import { Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SchoolEvents = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Required</h1>
          <p className="mb-8">Please sign in to access events management.</p>
          <Button asChild>
            <Link to="/school-auth">School Sign In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Career Events</h1>
        </div>
        
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-6">
            <Link to="/school-dashboard">Back to Dashboard</Link>
          </Button>
        </div>
        
        <div className="bg-muted p-12 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Career Events Management</h2>
          <p className="text-muted-foreground mb-4">
            This is where you can schedule and manage career fairs, workshops, and other events.
            Event planning and calendar features are coming soon.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolEvents;
