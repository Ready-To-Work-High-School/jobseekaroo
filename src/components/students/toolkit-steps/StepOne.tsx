
import React from 'react';

const StepOne = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Profile Setup</h3>
      
      <div className="bg-accent/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Why Your Profile Matters</h4>
        <p>Your digital first impression that helps employers understand your potential.</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-3 items-start">
          <div className="bg-primary/10 rounded-full p-2 text-primary h-8 w-8 flex items-center justify-center">1</div>
          <div>
            <h5 className="font-medium">Basic Info</h5>
            <p className="text-sm text-muted-foreground">Name, location, contact details.</p>
          </div>
        </div>
        
        <div className="flex gap-3 items-start">
          <div className="bg-primary/10 rounded-full p-2 text-primary h-8 w-8 flex items-center justify-center">2</div>
          <div>
            <h5 className="font-medium">Professional Photo</h5>
            <p className="text-sm text-muted-foreground">Clear headshot with good lighting.</p>
          </div>
        </div>
        
        <div className="flex gap-3 items-start">
          <div className="bg-primary/10 rounded-full p-2 text-primary h-8 w-8 flex items-center justify-center">3</div>
          <div>
            <h5 className="font-medium">Education Details</h5>
            <p className="text-sm text-muted-foreground">High school, grades, achievements.</p>
          </div>
        </div>
        
        <div className="flex gap-3 items-start">
          <div className="bg-primary/10 rounded-full p-2 text-primary h-8 w-8 flex items-center justify-center">4</div>
          <div>
            <h5 className="font-medium">Skills Showcase</h5>
            <p className="text-sm text-muted-foreground">Technical and soft skills.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
