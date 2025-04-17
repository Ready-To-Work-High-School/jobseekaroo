
import React from 'react';
import { Link } from 'react-router-dom';
import { useFadeIn } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Blocks, CheckCircle, ArrowRight } from 'lucide-react';
import JobSimulationsCard from '../students/JobSimulationsCard';

const JobSimulationsSection = () => {
  const fadeInFast = useFadeIn(200);

  return (
    <section className={`py-12 ${fadeInFast}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">Interactive Learning</Badge>
          <h2 className="text-3xl font-bold mb-3">Job Simulations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience real-world job scenarios and build practical skills that employers value.
            Try our interactive simulations to prepare for your future career.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Blocks className="h-5 w-5 text-blue-600" />
                Why Try Job Simulations?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Gain practical experience in a risk-free environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Build skills that translate directly to the workplace</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Add completed simulations to your resume to stand out</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Earn digital credentials recognized by employers</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/job-simulations" className="flex items-center">
                    Explore All Simulations <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <JobSimulationsCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSimulationsSection;
