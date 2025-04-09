
import React from 'react';
import { Blocks, Monitor, Briefcase, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JobSimulationsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <Blocks className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Experience Real Work with Job Simulations</h2>
            </div>
            
            <p className="mb-6 text-muted-foreground">
              Start your career journey with tailored simulations that provide hands-on experience 
              and develop your practical skills, giving you a significant hiring advantage.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Career Paths</h3>
                  <p className="text-sm text-muted-foreground">
                    Embark on a guided path to landing a dream entry-level role with collections of relevant job simulations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Individual Job Simulations</h3>
                  <p className="text-sm text-muted-foreground">
                    Experience the real work done on the job and develop practical skills for your future career.
                  </p>
                </div>
              </div>
            </div>
            
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="https://www.theforage.com/simulations" target="_blank" rel="noopener noreferrer" className="gap-2 flex items-center">
                <Monitor className="h-4 w-4" />
                Explore Job Simulations
              </a>
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-1.5 bg-blue-100 rounded-lg blur-sm"></div>
            <div className="relative bg-white p-5 rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                  100% Free
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Virtual Work Experience</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Marketing & Business simulations
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Tech & Data Science programs
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Finance & Accounting projects
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Engineering & Product roles
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mb-4">
                Gain valuable skills and experience that you can add directly to your resume.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="https://www.theforage.com/simulations" target="_blank" rel="noopener noreferrer">
                  Start a Simulation Today
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSimulationsSection;
