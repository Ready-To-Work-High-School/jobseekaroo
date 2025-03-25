
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Briefcase, Mail } from 'lucide-react';

const CallToAction = () => {
  return (
    <div className="max-w-5xl mx-auto text-center mb-16">
      <h2 className="text-3xl font-bold mb-6">Ready to Connect with Our Students?</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Our students from both the Entrepreneurship and Nursing Academies are eager to apply their skills and learning in real-world settings.
        Connect with us today to find your next great hire.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link to="/employer-dashboard" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Post a Job
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="mailto:Colemanp3@duvalschools.org" className="gap-2">
            <Mail className="h-4 w-4" />
            Contact Us
          </a>
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
