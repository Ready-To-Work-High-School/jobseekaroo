
import Layout from '@/components/Layout';
import { MessageSquare } from 'lucide-react';

const CommunicationTools = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-8 w-8 text-indigo-500" />
          <h1 className="text-4xl font-bold">Communication Tools</h1>
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
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Our communication tools are currently being enhanced. Full functionality will be available soon.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationTools;
