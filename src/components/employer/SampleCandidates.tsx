
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRandomStudents } from '@/lib/mock-data/students';
import StudentProfileGrid from '../students/StudentProfileGrid';
import { Users, ArrowRight } from 'lucide-react';

const SampleCandidates = () => {
  // Get 3 random students for display
  const sampleStudents = getRandomStudents(3);
  
  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Sample Candidates</CardTitle>
              <CardDescription>
                Preview the quality candidates from Westside High School's specialized academies
              </CardDescription>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Showing 3 of 7 candidates</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <StudentProfileGrid students={sampleStudents} variant="compact" />
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              These are just a few examples of our student talent pool. Create an employer account to access our full database of qualified candidates.
            </p>
            <Button className="gap-2">
              See All Candidates <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SampleCandidates;
