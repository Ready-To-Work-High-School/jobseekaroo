
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionSectionProps {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const JobDescriptionSection = ({ description, onChange }: JobDescriptionSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Job Description</Label>
      <Textarea 
        id="description" 
        name="description" 
        placeholder="Describe the role, responsibilities, and work environment"
        value={description}
        onChange={onChange}
        rows={5}
        required
      />
    </div>
  );
};

export default JobDescriptionSection;
