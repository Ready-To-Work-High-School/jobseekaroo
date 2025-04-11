
import Layout from '@/components/Layout';
import { MessageSquare, Shield, FileText, Bell } from 'lucide-react';
import FreeForStudentsBadge from '@/components/badges/FreeForStudentsBadge';

const CommunicationTools = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-indigo-500" />
            <h1 className="text-4xl font-bold">Communication Tools</h1>
          </div>
          <FreeForStudentsBadge variant="default" />
        </div>
        
        <p className="text-lg mb-8">
          Secure messaging system between students, employers, and school administrators.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-medium">Secure Messaging</h3>
                <p className="text-sm text-muted-foreground">End-to-end encrypted communication for privacy and security.</p>
              </li>
              <li>
                <h3 className="font-medium">Message Templates</h3>
                <p className="text-sm text-muted-foreground">Pre-written professional templates for common communications.</p>
              </li>
              <li>
                <h3 className="font-medium">File Sharing</h3>
                <p className="text-sm text-muted-foreground">Safely share resumes, portfolios, and other documents.</p>
              </li>
              <li>
                <h3 className="font-medium">Notification System</h3>
                <p className="text-sm text-muted-foreground">Stay updated with real-time alerts for new messages and responses.</p>
              </li>
            </ul>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Safety Measures</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-medium">Content Moderation</h3>
                <p className="text-sm text-muted-foreground">AI-powered moderation to detect inappropriate content.</p>
              </li>
              <li>
                <h3 className="font-medium">Adult Supervision</h3>
                <p className="text-sm text-muted-foreground">School administrators can monitor communications for student safety.</p>
              </li>
              <li>
                <h3 className="font-medium">Report System</h3>
                <p className="text-sm text-muted-foreground">Easy reporting of suspicious or inappropriate messages.</p>
              </li>
              <li>
                <h3 className="font-medium">Verified Contacts</h3>
                <p className="text-sm text-muted-foreground">Only communicate with verified employers and school staff.</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100 student-section-bg">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Coming Soon: Enhanced Communication Suite</h2>
              <p className="text-md text-indigo-800">
                We're expanding our communication tools with video interviews, group discussions, and more!
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FreeForStudentsBadge variant="default" className="mb-2" />
              <p className="text-sm text-indigo-700">For Westside High School students</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium">Message Templates</h3>
              <p className="text-sm text-blue-700">Professional templates for common scenarios</p>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-100 flex items-center">
            <Shield className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium">Safety First</h3>
              <p className="text-sm text-green-700">All communications are monitored and protected</p>
            </div>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-center">
            <Bell className="h-6 w-6 text-amber-600 mr-3" />
            <div>
              <h3 className="font-medium">Instant Notifications</h3>
              <p className="text-sm text-amber-700">Never miss an important message</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Our communication tools are currently being enhanced. Full functionality will be available soon.
          </p>
          
          <div className="inline-block p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center mb-2 justify-center">
              <FreeForStudentsBadge variant="small" />
            </div>
            <p className="text-sm text-amber-800">
              All communication features are completely free for Westside High School students
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationTools;
