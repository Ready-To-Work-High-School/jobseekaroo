
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Briefcase, Shield, Users } from "lucide-react";

const PlatformFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle>Enhanced Job Postings</CardTitle>
          </div>
          <CardDescription>Post jobs with confidence</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span>Required field validation ensures complete listings</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span>Automated wage and hours compliance checks</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span>Premium placement options for greater visibility</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Employer Verification</CardTitle>
          </div>
          <CardDescription>Trusted hiring environment</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span>Automated business verification during signup</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span>EIN and business registration validation</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span>Manual review process for added security</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformFeatures;
