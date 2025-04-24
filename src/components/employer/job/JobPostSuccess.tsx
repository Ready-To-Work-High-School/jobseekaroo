
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FreemiumFeatures from '../FreemiumFeatures';

interface JobPostSuccessProps {
  jobId: string;
  onContinue: () => void;
}

const JobPostSuccess = ({ jobId, onContinue }: JobPostSuccessProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Posted Successfully!</CardTitle>
          <CardDescription>
            Your job has been posted. Now choose how to promote it:
          </CardDescription>
        </CardHeader>
      </Card>
      
      <FreemiumFeatures jobId={jobId} />
      
      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={onContinue}
        >
          Continue to Job Listings
        </Button>
      </div>
    </div>
  );
};

export default JobPostSuccess;
