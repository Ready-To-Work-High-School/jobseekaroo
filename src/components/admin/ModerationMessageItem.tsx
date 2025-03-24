
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckIcon, XIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ModerationMessage } from '@/lib/supabase/messaging/types';

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
          <Badge>Needs Moderation</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-wrap">{message.content}</p>
        <div className="flex justify-end space-x-2">
          <Button 
            onClick={() => onReject(message.id)} 
            variant="outline"
            size="sm"
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <XIcon className="h-4 w-4 mr-1" />
            Reject
          </Button>
          <Button 
            onClick={() => onApprove(message.id)}
            variant="default"
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckIcon className="h-4 w-4 mr-1" />
            Approve
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
