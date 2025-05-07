import React, { useState, useEffect } from 'react';
import { useSlideIn } from '@/utils/animations';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from 'lucide-react';

const EnhancedJobListings = () => {
  // Fix the type error by passing a number instead of a string
  const animationClass = useSlideIn(300);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'San Francisco' },
    { id: 2, title: 'Data Scientist', company: 'Data Inc', location: 'New York' },
    { id: 3, title: 'Product Manager', company: 'Product Co', location: 'Seattle' },
  ]);

  const handleSearch = () => {
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="px-4 py-2 border rounded-l w-full md:w-1/2 lg:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch} className="rounded-l-none">
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className={`shadow-md ${animationClass}`}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedJobListings;
