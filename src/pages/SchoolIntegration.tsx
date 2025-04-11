
import Layout from '@/components/Layout';
import { Building2, CheckCircle } from 'lucide-react';

const SchoolIntegration = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-8 w-8 text-orange-500" />
          <h1 className="text-4xl font-bold">School Integration</h1>
        </div>
        
        <p className="text-lg mb-8">
          Tools for schools to manage student accounts, track progress, and integrate with existing systems.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">For School Administrators</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Bulk student account management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Progress tracking and reporting dashboards</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Customizable school-branded portal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>API integration with school information systems</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">For Teachers & Counselors</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Student activity monitoring tools</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Career pathway alignment resources</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Classroom assignment integration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Guidance counselor toolkit</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Ready to Integrate?</h2>
          <p className="mb-4">
            We work closely with schools to ensure a smooth integration process. Our team will guide you through 
            each step of setting up your school's customized platform.
          </p>
          <p>
            Contact our school partnerships team at <a href="mailto:schools@jobseekers4hs.org" className="text-blue-600 hover:underline">schools@jobseekers4hs.org</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolIntegration;
