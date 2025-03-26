
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink } from "lucide-react";

const CredentialCard = () => {
  return (
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
  );
};

export default CredentialCard;
