
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/auth';
import { BookOpen, Users, CheckSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Teacher Dashboard Access Required</h1>
          <p className="mb-8">Please sign in to access the teacher dashboard.</p>
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
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <Users className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Class Management</h3>
            <p className="text-muted-foreground mb-4">Manage students and class assignments</p>
            <Button className="w-full" asChild>
              <Link to="/school/classes">View Classes</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <CheckSquare className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Assignments</h3>
            <p className="text-muted-foreground mb-4">Create and grade career development assignments</p>
            <Button className="w-full" asChild>
              <Link to="/school/assignments">View Assignments</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <FileText className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Lesson Plans</h3>
            <p className="text-muted-foreground mb-4">Access career readiness curriculum and lesson plans</p>
            <Button className="w-full" asChild>
              <Link to="/school/lesson-plans">View Lesson Plans</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <BookOpen className="h-8 w-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <p className="text-muted-foreground mb-4">Access teaching resources and professional development</p>
            <Button className="w-full" asChild>
              <Link to="/school/teacher-resources">View Resources</Link>
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
