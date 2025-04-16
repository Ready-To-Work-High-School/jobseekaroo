import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Mail, Shield, TrendingUp } from 'lucide-react';

const CallToAction = () => {
  return (
    <div className="max-w-5xl mx-auto text-center mb-16">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4">Growing Demand for Young Workers</h2>
        <p className="text-lg mb-4">
          The gig economy's growth shows a rising demand for young, flexible workers. Our platform helps you tap into this trend with a focus on stable local jobs.
        </p>
        <div className="inline-block bg-white px-4 py-2 rounded border border-blue-200">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="font-medium">34% of 16-19 year-olds are seeking employment opportunities</span>
          </span>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-6">Ready to Connect with Our Students?</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Our students from both the Entrepreneurship and Nursing Academies are eager to apply their skills and learning in real-world settings.
        Connect with us today to find your next great hire.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          asChild 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Link to="/employer-dashboard" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Hire Students
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="mailto:Colemanp3@duvalschools.org" className="gap-2">
            <Mail className="h-4 w-4" />
            Contact Us
          </a>
        </Button>
      </div>
      
      <div className="mt-4 flex justify-center">
        <Badge variant="outline" className="gap-1 py-1.5 border-green-500">
          <Shield className="h-3.5 w-3.5 text-green-600" />
          <span className="text-green-700">Secure Communication</span>
        </Badge>
      </div>
      
      <p className="text-xs text-muted-foreground mt-3">
        All communication is monitored for your safety. Report suspicious activity to site administrators.
      </p>
    </div>
  );
};

export default CallToAction;
