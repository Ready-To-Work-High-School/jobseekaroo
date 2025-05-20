
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";

const CredentialCard = () => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-amber-200 bg-amber-50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-amber-600" />
            <CardTitle>Entrepreneurship & Small Business Certification</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our students earn the ESB certification, validating their understanding of business 
            principles, entrepreneurial concepts, and small business management. This industry-recognized 
            credential ensures they have the foundational knowledge needed in today's business environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href="https://www.youtube.com/watch?v=bjjLKdTgl6g" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                What is ESB Certification?
              </a>
            </Button>
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href="https://certiport.pearsonvue.com/Certifications/ESB/Certification/Overview" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Certiport ESB Overview
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-6 w-6 text-blue-600" />
            <CardTitle>Florida Ready to Work Program</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The Florida Ready to Work program provides students with valuable credentials and skills that employers recognize. 
            Our students actively participate in this program to enhance their employability and career readiness.
          </p>

          {/* Florida Ready to Work Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 bg-blue-100/60 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-blue-700 font-bold text-xl">874</p>
              <p className="text-xs text-blue-600">Hours Logged</p>
            </div>
            <div className="text-center">
              <p className="text-blue-700 font-bold text-xl">347</p>
              <p className="text-xs text-blue-600">Badges Earned</p>
            </div>
            <div className="text-center">
              <p className="text-blue-700 font-bold text-xl">63</p>
              <p className="text-xs text-blue-600">Certificates Earned</p>
            </div>
            <div className="text-center">
              <p className="text-blue-700 font-bold text-xl">50</p>
              <p className="text-xs text-blue-600">Credentials Earned</p>
            </div>
            <div className="text-center">
              <p className="text-blue-700 font-bold text-xl">699</p>
              <p className="text-xs text-blue-600">Learners Enrolled</p>
            </div>
            <div className="text-center">
              <p className="text-blue-700 font-bold text-xl">259</p>
              <p className="text-xs text-blue-600">Active Learners</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href="https://www.floridareadytowork.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Florida Ready to Work Official Site
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CredentialCard;
