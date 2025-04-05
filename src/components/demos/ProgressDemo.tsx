
import * as React from "react";
import { Progress } from "@/components/ui/progress";

const ProgressDemo = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <div className="flex justify-between text-sm">
        <span>Progress: {progress}%</span>
        <span>{progress < 100 ? "In progress" : "Complete"}</span>
      </div>
      
      <Progress 
        value={progress} 
        className="h-2 w-full"
      />
    </div>
  );
};

export default ProgressDemo;
