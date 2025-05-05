
import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SkillsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" asChild className="p-0">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold flex items-center">
          <BookOpen className="mr-2 h-6 w-6" /> Skills Development
        </h1>
        <p className="text-muted-foreground mt-1">Track, develop, and showcase your professional skills</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link to="/job-simulations">Explore Simulations</Link>
        </Button>
      </div>
    </div>
  );
};

export default SkillsHeader;
