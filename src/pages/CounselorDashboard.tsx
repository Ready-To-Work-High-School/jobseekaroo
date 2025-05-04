
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Users, BarChart3, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const CounselorDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Counselor Dashboard Access Required</h1>
        <p className="mb-8">Please sign in to access the counselor dashboard.</p>
        <Button asChild>
          <Link to="/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Counselor Dashboard</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="p-6">
          <Users className="h-8 w-8 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Student Guidance</h3>
          <p className="text-muted-foreground mb-4">Manage career counseling sessions and student pathways</p>
          <Button className="w-full" asChild>
            <Link to="/school/guidance">Student Guidance</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <BarChart3 className="h-8 w-8 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Career Assessment</h3>
          <p className="text-muted-foreground mb-4">Administer and review career aptitude assessments</p>
          <Button className="w-full" asChild>
            <Link to="/school/assessments">View Assessments</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <Calendar className="h-8 w-8 text-purple-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Counseling Schedule</h3>
          <p className="text-muted-foreground mb-4">Manage appointment calendar and session notes</p>
          <Button className="w-full" asChild>
            <Link to="/school/schedule">View Schedule</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <BookOpen className="h-8 w-8 text-orange-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Resources</h3>
          <p className="text-muted-foreground mb-4">Access counseling resources and career development materials</p>
          <Button className="w-full" asChild>
            <Link to="/school/counselor-resources">View Resources</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CounselorDashboard;
