
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Award, ExternalLink, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CredentialEducationSection = () => {
  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold">Educational Resources & Credentials</h3>
        <p className="text-muted-foreground text-sm">
          Get access to industry-recognized credentials and educational resources
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2 text-amber-500" />
              Entrepreneurship Certification
            </CardTitle>
            <CardDescription>
              ESB (Entrepreneurship & Small Business) certified
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              The Entrepreneurship and Small Business certification validates knowledge in areas crucial to business success.
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/resources" className="flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                Learn More
              </a>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
              Microsoft Office Specialist
            </CardTitle>
            <CardDescription>
              Globally recognized certification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              Microsoft Office Specialist certification demonstrates proficiency in Microsoft Office applications.
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/resources" className="flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                Learn More
              </a>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-green-500" />
              Duval Ready Diploma
            </CardTitle>
            <CardDescription>
              Career readiness designation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              The Duval Ready designation signifies preparation for entering the workforce with essential skills.
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/resources" className="flex items-center justify-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Requirements
              </a>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2 text-purple-500" />
              Industry Certifications
            </CardTitle>
            <CardDescription>
              Additional specialized certifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              Explore additional certifications in various industries to enhance your qualifications.
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/resources" className="flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                Browse Certifications
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CredentialEducationSection;
