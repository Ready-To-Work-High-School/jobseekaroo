
import Layout from '@/components/Layout';
import { Building2 } from 'lucide-react';
import AdminFeatures from '@/components/school/AdminFeatures';
import TeacherFeatures from '@/components/school/TeacherFeatures';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const SchoolIntegration = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Main content */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <img 
                  src="/lovable-uploads/a051d480-e6ba-4e2e-8f5c-69229c03b3f9.png" 
                  alt="Job Seekers 4 High Schools Logo" 
                  className="h-8 w-8 object-contain"
                />
                <Building2 className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold">School Integration</h1>
              </div>
              
              <p className="text-lg mb-8 text-muted-foreground">
                Empower your students with tools designed specifically for educational institutions. 
                Our platform helps schools manage student career development effectively.
              </p>
            </div>
            
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">For School Administrators</h2>
                <AdminFeatures />
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">For Teachers & Counselors</h2>
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
                    <Link to="/schedule">Schedule Integration Call</Link>
                  </Button>
                )}
              </section>
            </div>
          </div>

          {/* Right side - Single large logo */}
          <div className="hidden lg:flex flex-col items-center justify-center sticky top-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border">
              <img 
                src="/lovable-uploads/a051d480-e6ba-4e2e-8f5c-69229c03b3f9.png" 
                alt="Job Seekers 4 High Schools - Main Logo" 
                className="w-48 h-48 object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolIntegration;
