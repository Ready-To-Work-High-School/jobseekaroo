
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  return (
    <div className="mt-2 flex items-center">
      <button 
        type="button" 
        onClick={toggleRadius}
        className={cn(
          "text-xs bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full",
          "hover:bg-blue-200 transition-colors font-medium border border-blue-200"
        )}
      >
        {showRadius ? "Remove radius" : "Add radius filter"}
      </button>
      
      {showRadius && (
        <div className="flex-1 flex flex-col gap-1 px-2">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-xs flex items-center font-medium flex-1">
              <MapPin size={12} className="flex-shrink-0 mr-1.5" />
              <span className="mr-3">Search Radius:</span>
              <div className="flex-1 flex items-center gap-2">
                <Slider
                  value={[radius]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={(values) => setRadius(values[0])}
                  className="flex-1"
                />
                <span className="text-xs font-medium min-w-[45px] ml-2">
                  {radius} mile{radius !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
          <Progress value={(radius / 50) * 100} className="h-1" />
        </div>
      )}
    </div>
  );
};

export default RadiusSelector;
