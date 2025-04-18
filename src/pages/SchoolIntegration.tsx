
import Layout from '@/components/Layout';
import { Building2 } from 'lucide-react';
import AdminFeatures from '@/components/school/AdminFeatures';
import TeacherFeatures from '@/components/school/TeacherFeatures';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

const SchoolIntegration = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">School Integration</h1>
        </div>
        
        <p className="text-lg mb-12 text-muted-foreground max-w-2xl">
          Empower your students with tools designed specifically for educational institutions. 
          Our platform helps schools manage student career development effectively.
        </p>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">For School Administrators</h2>
            <AdminFeatures />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">For Teachers & Counselors</h2>
            <TeacherFeatures />
          </section>
          
          <section className="bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="mb-6 text-muted-foreground">
              Connect with our education team to set up your school's customized platform. 
              We'll guide you through every step of the integration process.
            </p>
            {user ? (
              <Button size="lg" className="font-semibold" asChild>
                <Link to="/school-dashboard">Access School Dashboard</Link>
              </Button>
            ) : (
              <Button size="lg" className="font-semibold" asChild>
                <Link to="/sign-in">Schedule Integration Call</Link>
              </Button>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolIntegration;
