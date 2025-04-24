
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompensationDetailsProps {
  hoursPerWeek: number;
  payRateMin: number;
  payRateMax: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompensationDetails = ({
  hoursPerWeek,
  payRateMin,
  payRateMax,
  onChange
}: CompensationDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="hours_per_week">Hours per Week</Label>
        <Input 
          id="hours_per_week"
          name="hours_per_week"
          type="number"
          min="1"
          max="40"
          value={hoursPerWeek}
          onChange={onChange}
          required
        />
        <p className="text-xs text-muted-foreground">Maximum 40 hours per week for teen jobs</p>
      </div>

      <div className="space-y-2">
        <Label>Pay Rate (per hour)</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input 
              id="pay_rate_min"
              name="pay_rate_min"
              type="number"
              min="12"
              step="0.50"
              placeholder="Min"
              value={payRateMin}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Input 
              id="pay_rate_max"
              name="pay_rate_max"
              type="number"
              min="12"
              step="0.50"
              placeholder="Max"
              value={payRateMax}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Minimum wage must be at least $12/hour</p>
      </div>
    </div>
  );
};

export default CompensationDetails;
