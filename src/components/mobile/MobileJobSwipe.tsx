import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSlideIn } from '@/utils/animations';
import { Heart, X } from 'lucide-react';

const MobileJobSwipe = () => {
  // Fix the type error by passing a number instead of a string
  const animationClass = useSlideIn(300);
  
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', company: 'Tech Co' },
    { id: 2, title: 'Data Scientist', company: 'Data Corp' },
    { id: 3, title: 'Product Manager', company: 'Product Inc' },
  ]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  const handleLike = () => {
    console.log('Liked job:', jobs[currentJobIndex]);
    nextJob();
  };

  const handleDislike = () => {
    console.log('Disliked job:', jobs[currentJobIndex]);
    nextJob();
  };

  const nextJob = () => {
    setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobs.length);
  };

  const currentJob = jobs[currentJobIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className={`w-full max-w-sm ${animationClass}`}>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">{currentJob.title}</h2>
          <p className="text-gray-600">{currentJob.company}</p>
        </CardContent>
        <div className="flex justify-around p-4">
          <Button variant="destructive" onClick={handleDislike}>
            <X className="h-5 w-5 mr-2" />
            Dislike
          </Button>
          <Button variant="secondary" onClick={handleLike}>
            <Heart className="h-5 w-5 mr-2" />
            Like
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MobileJobSwipe;
