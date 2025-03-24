
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '@/types/message';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

export const MessageItem = ({ message, isCurrentUser }: MessageItemProps) => {
  return (
    <div className={cn("flex w-full mb-4", isCurrentUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[80%]", isCurrentUser ? "flex-row-reverse" : "flex-row")}>
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={message.sender_avatar || ''} alt={message.sender_name} />
          <AvatarFallback>
            {message.sender_name?.charAt(0).toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <Card className={cn(
            "inline-block",
            isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
          )}>
            <CardContent className="p-3">
              {message.needs_moderation && !message.is_approved && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 mb-1">
                  Awaiting Moderation
                </Badge>
              )}
              {message.is_approved === false && (
                <Badge variant="destructive" className="mb-1">
                  Rejected by moderator
                </Badge>
              )}
              <p className="text-sm">{message.content}</p>
            </CardContent>
          </Card>
          <div className={cn(
            "text-xs text-muted-foreground mt-1", 
            isCurrentUser ? "text-right" : "text-left"
          )}>
            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
};
