
import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmployerInfoSection = () => {
  return (
    <div className="mt-12 bg-white/80 p-6 rounded-lg shadow-md border border-blue-200">
      <h3 className="text-xl font-bold mb-4 text-blue-900 text-center">For Employers</h3>
      <div className="space-y-3 mb-6">
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" />
          <p className="text-sm font-medium">Students with these credentials demonstrate workforce readiness</p>
        </div>
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" />
          <p className="text-sm font-medium">Each badge represents completion of industry-standard assessments</p>
        </div>
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" />
          <p className="text-sm font-medium">Badges are verified and can be validated through the Florida Ready To Work program, IBM and credentialing agencies</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="gap-2 bg-blue-700 hover:bg-blue-800 shadow-md" asChild>
          <a href="mailto:Colemanp3@duvalschools.org">
            Verify Student Credentials
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" className="gap-2 border-blue-700 text-blue-700 hover:bg-blue-50 shadow-sm" asChild>
          <a href="mailto:Colemanp3@duvalschools.org">
            Become a Partner Employer
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default EmployerInfoSection;
