
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  className?: string;
}

const ShareButton = ({ jobId, jobTitle, companyName, className }: ShareButtonProps) => {
  const { toast } = useToast();
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = `${window.location.origin}/jobs/${jobId}`;
    const title = `${jobTitle} at ${companyName}`;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this job opportunity: ${title}`,
        url: url,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(url).then(() => {
        toast({
          title: "Link copied to clipboard",
          description: "You can now paste the job listing URL anywhere",
        });
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={className}
      onClick={handleShare}
      title="Share job listing"
      aria-label="Share job listing"
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
};

export default ShareButton;
