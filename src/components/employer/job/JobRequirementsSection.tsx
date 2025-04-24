
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JobRequirementsSectionProps {
  requirements: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const JobRequirementsSection = ({ requirements, onChange }: JobRequirementsSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="requirements">Requirements/Qualifications</Label>
      <Textarea 
        id="requirements" 
        name="requirements" 
        placeholder="List required skills, experience, or credentials (one per line)"
        value={requirements}
        onChange={onChange}
        rows={3}
        required
      />
      <p className="text-xs text-muted-foreground">Enter each requirement on a new line</p>
    </div>
  );
};

export default JobRequirementsSection;
