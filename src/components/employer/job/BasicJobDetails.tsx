
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicJobDetailsProps {
  title: string;
  company: string;
  location: string;
  type: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const BasicJobDetails = ({
  title,
  company,
  location,
  type,
  onInputChange,
  onSelectChange
}: BasicJobDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="title">Job Title</Label>
        <Input 
          id="title" 
          name="title"
          placeholder="e.g. Retail Associate at Target"
          value={title}
          onChange={onInputChange}
          required
        />
        <p className="text-xs text-muted-foreground">
          Be specific - include role and company name
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company">Company Name</Label>
        <Input 
          id="company" 
          name="company"
          value={company}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location" 
          name="location"
          placeholder="e.g. Jacksonville, FL"
          value={location}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Job Type</Label>
        <Select 
          value={type || "part-time"}
          onValueChange={(value) => onSelectChange('type', value)}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="part-time">Part-Time</SelectItem>
            <SelectItem value="full-time">Full-Time</SelectItem>
            <SelectItem value="temporary">Temporary</SelectItem>
            <SelectItem value="summer">Summer</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BasicJobDetails;
