
import Layout from '@/components/Layout';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const SafetyCompliance = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-emerald-500" />
          <h1 className="text-4xl font-bold">Safety & Compliance</h1>
        </div>
        
        <p className="text-lg mb-8">
          Built-in safety features ensuring age-appropriate opportunities and COPPA/FERPA compliance.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Safety Measures</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Age-appropriate job screening and filtering</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Safe messaging system with monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Verified employer accounts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Parental consent systems</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Compliance Framework</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>COPPA (Children's Online Privacy Protection Act) compliant</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>FERPA (Family Educational Rights and Privacy Act) compliant</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Regular security audits and penetration testing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Data minimization and privacy by design</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 p-4 border border-amber-200 bg-amber-50 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <p>
              For any safety concerns or to report suspicious activity, please contact our trust and safety team 
              immediately at <a href="mailto:safety@jobseekers4hs.org" className="text-blue-600 hover:underline">safety@jobseekers4hs.org</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SafetyCompliance;
