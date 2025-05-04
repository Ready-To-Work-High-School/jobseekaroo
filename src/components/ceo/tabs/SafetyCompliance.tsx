
import React from 'react';
import { Shield } from 'lucide-react';
import CeoFeatureCard from '@/components/ceo/CeoFeatureCard';

const SafetyCompliance: React.FC = () => {
  return (
    <CeoFeatureCard
      icon={<Shield className="h-5 w-5 text-green-600" />}
      title="Enhanced Safety Measures"
      description="Industry-leading safety features for student job seekers"
    >
      <ul className="space-y-4">
        <li className="flex items-start gap-2">
          <Shield className="h-5 w-5 text-green-600 mt-1" />
          <div>
            <p className="font-medium">School Verification</p>
            <p className="text-muted-foreground">All student accounts verified through trusted school systems</p>
          </div>
        </li>
        <li className="flex items-start gap-2">
          <Shield className="h-5 w-5 text-blue-600 mt-1" />
          <div>
            <p className="font-medium">Employer Background Checks</p>
            <p className="text-muted-foreground">Mandatory checks ensure trustworthy employer profiles</p>
          </div>
        </li>
        <li className="flex items-start gap-2">
          <Shield className="h-5 w-5 text-purple-600 mt-1" />
          <div>
            <p className="font-medium">Protected Communication</p>
            <p className="text-muted-foreground">Monitored messaging system with content filtering to keep interactions safe</p>
          </div>
        </li>
      </ul>
    </CeoFeatureCard>
  );
};

export default SafetyCompliance;
