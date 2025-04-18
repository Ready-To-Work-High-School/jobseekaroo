
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/auth';
import { Building2, Users, BarChart3, Calendar, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const SchoolDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">School Dashboard Access Required</h1>
          <p className="mb-8">Please sign in to access the school dashboard.</p>
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">School Dashboard</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <Users className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Student Management</h3>
            <p className="text-muted-foreground mb-4">Manage student accounts and track enrollment status</p>
            <Button className="w-full" asChild>
              <Link to="/school/students">View Students</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <BarChart3 className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Progress Analytics</h3>
            <p className="text-muted-foreground mb-4">View detailed reports on student career development</p>
            <Button className="w-full" asChild>
              <Link to="/school/analytics">View Analytics</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <Calendar className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Career Events</h3>
            <p className="text-muted-foreground mb-4">Schedule and manage career fairs and workshops</p>
            <Button className="w-full" asChild>
              <Link to="/school/events">Manage Events</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <Book className="h-8 w-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <p className="text-muted-foreground mb-4">Access educational materials and guides</p>
            <Button className="w-full" asChild>
              <Link to="/school/resources">View Resources</Link>
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolDashboard;
