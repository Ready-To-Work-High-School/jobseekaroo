
import * as React from "react";
import { Progress } from "@/components/ui/progress";

const ProgressDemo = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="border-2 border-purple-500 rounded-lg bg-purple-50 p-6 shadow-md">
        <div className="space-y-4">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-purple-700">Progress: {progress}%</span>
            <span className="text-purple-700">{progress < 100 ? "In progress" : "Complete"}</span>
          </div>
          
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-purple-100">
            <div 
              className="h-full progress-lavender-gold-purple transition-all" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDemo;
