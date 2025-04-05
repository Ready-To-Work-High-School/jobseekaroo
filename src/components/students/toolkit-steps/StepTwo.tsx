
import React from 'react';
import { FileText } from 'lucide-react';

const StepTwo = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Resume Builder</h3>
      
      <div className="bg-accent/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Why is your resume important?</h4>
        <p>Your resume is often the first thing employers see. A well-structured resume increases your chances of getting an interview.</p>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted p-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h4 className="font-medium">Resume Essentials</h4>
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h5 className="font-medium">Contact Information</h5>
            <p className="text-sm text-muted-foreground">Your name, email, phone number, and location.</p>
          </div>
          
          <div className="space-y-1">
            <h5 className="font-medium">Education</h5>
            <p className="text-sm text-muted-foreground">Your high school, major courses, GPA, and graduation date.</p>
          </div>
          
          <div className="space-y-1">
            <h5 className="font-medium">Skills</h5>
            <p className="text-sm text-muted-foreground">List relevant skills that match the job description.</p>
          </div>
          
          <div className="space-y-1">
            <h5 className="font-medium">Experience</h5>
            <p className="text-sm text-muted-foreground">Include volunteering, internships, school projects, and club leadership.</p>
          </div>
          
          <div className="space-y-1">
            <h5 className="font-medium">Achievements</h5>
            <p className="text-sm text-muted-foreground">Awards, certifications, or special recognition.</p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 items-start">
        <div className="bg-primary/10 rounded-full p-2 text-primary h-8 w-8 flex items-center justify-center">💡</div>
        <div>
          <h5 className="font-medium">Pro Tip</h5>
          <p className="text-sm text-muted-foreground">Use action verbs like "organized," "led," "created," and "managed" to describe your experiences.</p>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
