
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface RadiusSelectorProps {
  showRadius: boolean;
  toggleRadius: () => void;
  radius: number;
  setRadius: (radius: number) => void;
}

const RadiusSelector = ({ 
  showRadius, 
  toggleRadius, 
  radius, 
  setRadius 
}: RadiusSelectorProps) => {
  const [animateValue, setAnimateValue] = useState(false);
  
  // Animate value when it changes
  useEffect(() => {
    if (showRadius) {
      setAnimateValue(true);
      const timer = setTimeout(() => setAnimateValue(false), 500);
      return () => clearTimeout(timer);
    }
  }, [radius, showRadius]);
  
  // Calculate progress percentage based on radius value (1-50 range)
  const getProgressPercentage = () => {
    return ((radius - 1) / 49) * 100;
  };
  
  // Calculate progress colors based on radius value
  const getProgressColor = () => {
    if (radius < 10) return 'bg-green-500';
    if (radius < 25) return 'bg-blue-500';
    return 'bg-indigo-600';
  };
  
  return (
    <div className="mt-2">
      <button 
        type="button" 
        onClick={toggleRadius}
        className={cn(
          "text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-200",
          showRadius ? (
            "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
          ) : (
            "bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200"
          )
        )}
      >
        {showRadius ? "Remove radius" : "Add radius filter"}
      </button>
      
      {showRadius && (
        <div className="mt-2 flex flex-col gap-1 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm px-3 py-2 rounded-md text-xs flex items-center font-medium flex-1">
              <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                <MapPin size={12} className="text-blue-600" />
              </div>
              
              <span className="mr-3 text-gray-700">Search Radius:</span>
              
              <div className="flex-1 flex items-center gap-2">
                <Slider
                  value={[radius]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={(values) => setRadius(values[0])}
                  className="flex-1"
                />
                
                <div 
                  className={cn(
                    "min-w-[50px] text-center px-2 py-1 rounded-md font-semibold transition-all",
                    animateValue ? "scale-110" : "scale-100",
                    radius < 10 ? "bg-green-100 text-green-700" : 
                    radius < 25 ? "bg-blue-100 text-blue-700" : 
                    "bg-indigo-100 text-indigo-700"
                  )}
                >
                  {radius} <span className="text-[10px]">mile{radius !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-1">
            <span className="text-[10px] text-gray-500">Local</span>
            <Progress 
              value={getProgressPercentage()} 
              className={cn("h-1.5 flex-1 progress-lavender-gold-purple")} 
            />
            <span className="text-[10px] text-gray-500">Regional</span>
          </div>
          
          <div className="flex justify-between px-1 text-[10px] text-gray-500 -mt-1">
            <span>1mi</span>
            <span>25mi</span>
            <span>50mi</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadiusSelector;
