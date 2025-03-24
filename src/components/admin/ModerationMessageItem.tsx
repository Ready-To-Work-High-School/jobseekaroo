
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckIcon, XIcon, Loader2, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ModerationMessage } from '@/lib/supabase/messaging/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface ModerationMessageItemProps {
  message: ModerationMessage;
  onApprove: (messageId: string) => Promise<void>;
  onReject: (messageId: string) => Promise<void>;
}

export const ModerationMessageItem = ({ 
  message, 
  onApprove, 
  onReject 
}: ModerationMessageItemProps) => {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = async () => {
    try {
      setIsApproving(true);
      await onApprove(message.id);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsRejecting(true);
      await onReject(message.id);
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <Card key={message.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={message.sender_avatar || ''} alt={message.sender_name} />
              <AvatarFallback>
                {message.sender_name?.charAt(0).toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{message.sender_name}</CardTitle>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>To: {message.receiver_name}</span>
                <span className="mx-2">•</span>
                <span>{formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge>
                <AlertCircle className="h-3 w-3 mr-1" />
                Needs Moderation
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="text-xs w-60">
              <p>This message has been flagged for moderation due to potential policy violations or sensitive content.</p>
              <p className="mt-1 text-muted-foreground">Review the content carefully before approving or rejecting.</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-wrap">{message.content}</p>
        <div className="flex justify-end space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleReject} 
                variant="outline"
                size="sm"
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                disabled={isRejecting || isApproving}
              >
                {isRejecting ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <XIcon className="h-4 w-4 mr-1" />
                )}
                Reject
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Reject this message. It will not be delivered to the recipient.</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleApprove}
                variant="default"
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                disabled={isApproving || isRejecting}
              >
                {isApproving ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <CheckIcon className="h-4 w-4 mr-1" />
                )}
                Approve
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Approve this message. It will be delivered to the recipient immediately.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};
