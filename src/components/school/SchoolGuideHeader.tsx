
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, School } from 'lucide-react';
import { Link } from 'react-router-dom';

const SchoolGuideHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild className="p-0 mr-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold flex items-center">
          <School className="mr-2" /> School Guide
        </h1>
      </div>
    </div>
  );
};

export default SchoolGuideHeader;
