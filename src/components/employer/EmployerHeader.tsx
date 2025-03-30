
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Shield } from 'lucide-react';
import { useSlideIn } from '@/utils/animations';

const EmployerHeader = () => {
  const headerAnimation = useSlideIn(100);

  return (
    <div className={headerAnimation}>
      <div className="text-center mb-12">
        <Badge variant="outline" className="border-amber-500 text-amber-700 mb-4">
          For Businesses & Organizations
        </Badge>
        <h1 className="text-4xl font-bold mb-6">
          Hire Trained Students with Verified Skills
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with Westside High School's Entrepreneurship and Nursing Academies to find pre-trained students
          with industry-recognized credentials who are ready to join your workforce.
        </p>
        
        <div className="mt-8">
          <Button asChild size="lg" className="gap-2">
            <Link to="/employer-dashboard">
              Access Employer Dashboard
              <ExternalLink className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Post jobs and manage applications in one place
          </p>
        </div>
        
        <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
          <Shield className="h-4 w-4 mr-1 text-green-600" />
          <span>Secure employer area - All links and content verified for your protection</span>
        </div>
      </div>
    </div>
  );
};

export default EmployerHeader;
