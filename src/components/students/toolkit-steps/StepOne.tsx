
import React from 'react';

const StepOne = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Profile Setup</h3>
      
      <div className="bg-accent/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Why is your profile important?</h4>
        <p>A complete profile helps employers understand your skills, background, and career goals. It's your digital first impression!</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-3 items-start">
          <div className="bg-primary/10 rounded-full p-2 text-primary h-8 w-8 flex items-center justify-center">1</div>
          <div>
            <h5 className="font-medium">Add your basic information</h5>
            <p className="text-sm text-muted-foreground">Include your name, location, and contact details.</p>
          </div>
        </div>
        
        <div className="flex gap-3 items-start">
          <div className="bg-primary/10 rounded-full p-2 text-primary h-8 w-8 flex items-center justify-center">2</div>
          <div>
            <h5 className="font-medium">Upload a professional photo</h5>
            <p className="text-sm text-muted-foreground">Use a clear, professional headshot with good lighting.</p>
          </div>
        </div>
        
        <div className="flex gap-3 items-start">
          <div className="bg-primary/10 rounded-full p-2 text-primary h-8 w-8 flex items-center justify-center">3</div>
          <div>
            <h5 className="font-medium">List your education</h5>
            <p className="text-sm text-muted-foreground">Include your high school, grades, and any special achievements.</p>
          </div>
        </div>
        
        <div className="flex gap-3 items-start">
          <div className="bg-primary/10 rounded-full p-2 text-primary h-8 w-8 flex items-center justify-center">4</div>
          <div>
            <h5 className="font-medium">Add your skills</h5>
            <p className="text-sm text-muted-foreground">Include both technical and soft skills you've developed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
