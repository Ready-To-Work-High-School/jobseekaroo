
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, ChartBar, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EmployerHeader = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">For Employers</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Connect with qualified high school students for entry-level positions, internships, 
          and part-time opportunities. Shape the future workforce while filling your hiring needs.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge variant="outline" className="px-3 py-1 flex items-center gap-2 badge-highlight">
            <Shield className="h-4 w-4" />
            <span>Verified Schools</span>
          </Badge>
          
          <Badge variant="outline" className="px-3 py-1 flex items-center gap-2 badge-highlight">
            <Users className="h-4 w-4" />
            <span>Qualified Candidates</span>
          </Badge>
          
          <Badge variant="outline" className="px-3 py-1 flex items-center gap-2 badge-highlight">
            <ChartBar className="h-4 w-4" />
            <span>Hiring Analytics</span>
          </Badge>
          
          <Badge variant="outline" className="px-3 py-1 flex items-center gap-2 badge-highlight">
            <Sparkles className="h-4 w-4" />
            <span>Premium Features</span>
          </Badge>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/employer-dashboard">Post a Job</Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/sample-candidates">See Sample Candidates</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployerHeader;
