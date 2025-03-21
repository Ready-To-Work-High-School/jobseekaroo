
import { useState } from 'react';
import { Twitter, Facebook, Linkedin, Mail, Share2, Copy, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ShareJobButtonProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  className?: string;
}

const ShareJobButton = ({ jobId, jobTitle, companyName, className }: ShareJobButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  const url = `${window.location.origin}/jobs/${jobId}`;
  const title = `${jobTitle} at ${companyName}`;
  const hashtags = 'jobs,career,opportunity';
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      toast({
        title: "Link copied to clipboard",
        description: "You can now paste the job listing URL anywhere",
      });
      
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=550,height=450');
  };
  
  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
    openShareWindow(twitterShareUrl);
  };
  
  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    openShareWindow(facebookShareUrl);
  };
  
  const shareOnLinkedIn = () => {
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    openShareWindow(linkedinShareUrl);
  };
  
  const shareByEmail = () => {
    const subject = `Job Opportunity: ${title}`;
    const body = `I found this job opportunity that might interest you: ${title}. Check it out: ${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this job opportunity: ${title}`,
        url: url,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support native sharing. Try using the other share options.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn("gap-2", className)}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {isCopied ? (
            <Check className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer">
          <Twitter className="mr-2 h-4 w-4 text-blue-400" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnFacebook} className="cursor-pointer">
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnLinkedIn} className="cursor-pointer">
          <Linkedin className="mr-2 h-4 w-4 text-blue-700" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareByEmail} className="cursor-pointer">
          <Mail className="mr-2 h-4 w-4 text-gray-600" />
          Email
        </DropdownMenuItem>
        {navigator.share && (
          <DropdownMenuItem onClick={nativeShare} className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" />
            Share via...
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareJobButton;
