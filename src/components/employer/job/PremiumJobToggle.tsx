
import { Sparkles } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PremiumJobToggleProps {
  isPremium: boolean;
  onToggle: () => void;
}

const PremiumJobToggle = ({ isPremium, onToggle }: PremiumJobToggleProps) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-md p-4">
      <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Premium Job Posting</h4>
              <p className="text-sm text-amber-800">Free 30-day trial available</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Switch
                      id="premium"
                      checked={isPremium}
                      onCheckedChange={onToggle}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Feature your job posting for greater visibility</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ul className="text-sm text-amber-800 list-disc pl-5 space-y-1">
            <li>Featured placement on job listings</li>
            <li>Higher visibility to candidates</li>
            <li>Detailed analytics on applicant engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PremiumJobToggle;
