
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Blocks, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobSimulationsCard = () => {
  return (
    <Card className="shadow-md border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-100">
            <Blocks className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <CardTitle className="text-xl">Job Simulations</CardTitle>
            <CardDescription>Experience real-world work scenarios</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Start your career journey with virtual job simulations. Gain practical skills 
          and a hiring advantage through real-world work experience.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-start gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Career Paths</h4>
              <p className="text-xs text-muted-foreground">
                Guided paths to landing your dream entry-level role
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Briefcase className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Individual Sims</h4>
              <p className="text-xs text-muted-foreground">
                Develop specific skills for your target job
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
          <Link to="/job-simulations">
            Explore Job Simulations
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobSimulationsCard;
